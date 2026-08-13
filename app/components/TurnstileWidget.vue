<template>
  <div ref="containerRef" class="turnstile"></div>
</template>

<script setup lang="ts">
/**
 * Cloudflare Turnstile-widget, uttryckligen renderad (inte implicit) så vi får
 * ett widget-id att nollställa mot — en Turnstile-token är engångs, så varje
 * misslyckat OSA-försök måste rendera om widgeten innan nästa försök kan lyckas.
 *
 * Ska alltid monteras inifrån <ClientOnly> (se RsvpSection.vue) eftersom sajten
 * är statiskt genererad. Skriptet injiceras en gång via en modul-singleton,
 * eftersom formuläret monteras om varje gång man går från tack-läge tillbaka
 * till formuläret ("Skicka ett svar till").
 */

const props = defineProps<{ siteKey: string }>();
const emit = defineEmits<{ "update:token": [token: string] }>();

type TurnstileRenderOptions = {
  sitekey: string;
  callback: (token: string) => void;
  "error-callback"?: () => void;
  "expired-callback"?: () => void;
  "timeout-callback"?: () => void;
  theme?: "light" | "dark" | "auto";
  language?: string;
  appearance?: "always" | "execute" | "interaction-only";
};

type TurnstileApi = {
  render: (container: HTMLElement, options: TurnstileRenderOptions) => string;
  reset: (widgetId: string) => void;
  remove: (widgetId: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
    __turnstileReady?: () => void;
  }
}

const SCRIPT_URL = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit&onload=__turnstileReady";

let scriptLoader: Promise<void> | null = null;

function loadTurnstileScript(): Promise<void> {
  if (window.turnstile) return Promise.resolve();
  if (scriptLoader) return scriptLoader;

  scriptLoader = new Promise<void>((resolve, reject) => {
    window.__turnstileReady = () => resolve();
    const script = document.createElement("script");
    script.src = SCRIPT_URL;
    script.async = true;
    script.defer = true;
    script.onerror = () => reject(new Error("Turnstile-skriptet kunde inte laddas."));
    document.head.appendChild(script);
  });

  return scriptLoader;
}

const containerRef = ref<HTMLElement | null>(null);
const token = ref("");
const widgetId = ref<string | null>(null);
let tokenResolvers: Array<(token: string | null) => void> = [];

function handleToken(next: string) {
  token.value = next;
  emit("update:token", next);
  for (const resolve of tokenResolvers.splice(0)) resolve(next);
}

/** Fel, timeout eller utgången token: nollställ så nästa getToken()-anrop väntar in en ny. */
function handleTokenLost() {
  token.value = "";
  emit("update:token", "");
}

async function render() {
  if (!containerRef.value || !window.turnstile) return;
  widgetId.value = window.turnstile.render(containerRef.value, {
    sitekey: props.siteKey,
    callback: handleToken,
    "error-callback": handleTokenLost,
    "expired-callback": handleTokenLost,
    "timeout-callback": handleTokenLost,
    theme: "light",
    language: "sv",
    // Osynlig tills en utmaning faktiskt krävs — en 300×65 Cloudflare-box hade
    // varit det mest "webbapp"-aktiga elementet på sidan, se wedding-site-design.
    appearance: "interaction-only",
  });
}

onMounted(async () => {
  if (!props.siteKey) return;
  try {
    await loadTurnstileScript();
    await nextTick();
    await render();
  } catch (err) {
    console.error("Turnstile kunde inte initieras:", err);
  }
});

onBeforeUnmount(() => {
  if (widgetId.value && window.turnstile) {
    window.turnstile.remove(widgetId.value);
  }
  widgetId.value = null;
  // Resolve med null i stället för att bara tömma listan — annars hänger varje
  // väntande getToken() för evigt, eftersom dess timeout letar upp sin resolve
  // via indexOf i den nya (tomma) arrayen och aldrig hittar den.
  for (const resolve of tokenResolvers.splice(0)) resolve(null);
});

/** Nollställ widgeten. Måste anropas efter varje icke-lyckat inskick — tokens är engångs. */
function reset() {
  token.value = "";
  if (widgetId.value && window.turnstile) {
    window.turnstile.reset(widgetId.value);
  }
}

/**
 * Väntar in en token om den inte redan finns. `interaction-only` gör att en
 * token oftast finns inom någon sekund, men en snabb inskickning kan hinna
 * före — då väntar vi i stället för att visa en förklaringslös inaktiv knapp.
 * Returnerar null om ingen token kommer inom timeoutMs, eller om ingen site
 * key är konfigurerad (lokal utveckling utan Turnstile).
 */
function getToken(timeoutMs = 10_000): Promise<string | null> {
  if (token.value) return Promise.resolve(token.value);
  if (!props.siteKey) return Promise.resolve(null);

  return new Promise((resolve) => {
    tokenResolvers.push(resolve);
    setTimeout(() => {
      const idx = tokenResolvers.indexOf(resolve);
      if (idx !== -1) {
        tokenResolvers.splice(idx, 1);
        resolve(null);
      }
    }, timeoutMs);
  });
}

defineExpose({ reset, getToken });
</script>

<style lang="scss" scoped>
.turnstile {
  min-height: 0;
}
</style>
