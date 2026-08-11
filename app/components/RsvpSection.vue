<template>
  <section id="osa" class="section section--tint">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <p class="eyebrow">{{ r.eyebrow }}</p>
        <h2 class="section__title">{{ r.title }}</h2>
        <p class="section__lead">{{ r.body }}</p>
        <p class="rsvp__deadline">{{ r.deadlineLabel }} — {{ r.deadline }}</p>
      </div>

      <!-- Ersätter formuläret med ett slutläge (lyckat, dubblett eller fel) efter ett inskick. -->
      <div v-if="resultView" v-reveal class="rsvp__thanks measure" :role="resultView.role">
        <h3 class="rsvp__thanks-title">{{ resultView.title }}</h3>
        <p>{{ resultView.body }}</p>
        <button class="btn btn--light rsvp__again" type="button" @click="resultView.retry ? retry() : reset()">
          {{ resultView.retry ? r.retryLabel : r.againLabel }}
        </button>
      </div>

      <form v-else class="rsvp" novalidate @submit.prevent="onSubmit">
        <!-- Honeypot: osynlig för människor, men en riktig, fokuserbar input — bottar hoppar
             oftare över den om den bara döljs visuellt, snarare än via type="hidden". -->
        <div class="rsvp__hp" aria-hidden="true">
          <label for="rsvp-website">{{ r.honeypotLabel }}</label>
          <input id="rsvp-website" v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" />
        </div>

        <div class="field">
          <label for="rsvp-name">Namn</label>
          <input
            id="rsvp-name"
            v-model.trim="form.name"
            type="text"
            autocomplete="name"
            :maxlength="RSVP_LIMITS.name"
            :aria-invalid="!!errors.name"
            :aria-describedby="errors.name ? 'err-name' : undefined"
            @blur="touch('name')"
          />
          <p v-if="errors.name" id="err-name" class="field__error">{{ errors.name }}</p>
        </div>

        <div class="field">
          <label for="rsvp-email">E-post</label>
          <input
            id="rsvp-email"
            v-model.trim="form.email"
            type="email"
            autocomplete="email"
            :maxlength="RSVP_LIMITS.email"
            :aria-invalid="!!errors.email"
            :aria-describedby="errors.email ? 'err-email' : undefined"
            @blur="touch('email')"
          />
          <p v-if="errors.email" id="err-email" class="field__error">{{ errors.email }}</p>
        </div>

        <fieldset class="field field--wide">
          <legend>Kommer du?</legend>
          <div class="choices">
            <label class="choice">
              <input v-model="form.attending" type="radio" value="yes" />
              <span>Ja, jag kommer</span>
            </label>
            <label class="choice">
              <input v-model="form.attending" type="radio" value="no" />
              <span>Nej, jag kan tyvärr inte</span>
            </label>
          </div>
        </fieldset>

        <template v-if="form.attending === 'yes'">
          <div class="field field--wide">
            <label for="rsvp-guests">{{ r.guestsLabel }}</label>
            <input
              id="rsvp-guests"
              v-model.number="form.guests"
              type="number"
              :min="RSVP_LIMITS.guestsMin"
              :max="RSVP_LIMITS.guestsMax"
              inputmode="numeric"
              :aria-invalid="!!errors.guests"
              :aria-describedby="errors.guests ? 'err-guests' : undefined"
              @blur="touch('guests')"
            />
            <p v-if="errors.guests" id="err-guests" class="field__error">{{ errors.guests }}</p>
          </div>

          <div class="field field--wide">
            <label for="rsvp-diet">Matallergier eller specialkost</label>
            <textarea
              id="rsvp-diet"
              v-model.trim="form.diet"
              rows="2"
              placeholder="T.ex. glutenfritt, vegetariskt, nötallergi"
              :maxlength="RSVP_LIMITS.diet"
              :aria-invalid="!!errors.diet"
              :aria-describedby="errors.diet ? 'err-diet' : undefined"
              @blur="touch('diet')"
            ></textarea>
            <p v-if="errors.diet" id="err-diet" class="field__error">{{ errors.diet }}</p>
          </div>
        </template>

        <div class="field field--wide">
          <label for="rsvp-note">Övrigt (valfritt)</label>
          <textarea
            id="rsvp-note"
            v-model.trim="form.note"
            rows="4"
            placeholder="Hälsning, låtönskning, frågor..."
            :maxlength="RSVP_LIMITS.note"
            :aria-invalid="!!errors.note"
            :aria-describedby="errors.note ? 'err-note' : undefined"
            @blur="touch('note')"
          ></textarea>
          <p v-if="errors.note" id="err-note" class="field__error">{{ errors.note }}</p>
        </div>

        <div class="field field--wide rsvp__turnstile">
          <ClientOnly>
            <TurnstileWidget v-if="siteKey" ref="turnstileRef" :site-key="siteKey" />
          </ClientOnly>
        </div>

        <div class="field field--wide rsvp__actions">
          <p v-if="hasErrors" class="rsvp__summary" role="alert">
            {{ r.summaryError }}
          </p>
          <button class="btn" type="submit" :disabled="pending">
            {{ pending ? r.submittingLabel : r.submitLabel }}
          </button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";
import { RSVP_LIMITS } from "~/utils/rsvpLimits";

const r = wedding.rsvp;

type FieldName = "name" | "email" | "guests" | "diet" | "note";
type ResultState = "success" | "duplicate" | "rate_limited" | "captcha" | "error" | null;

const emptyForm = () => ({
  name: "",
  email: "",
  attending: "yes" as "yes" | "no",
  guests: 1,
  diet: "",
  note: "",
  website: "", // honeypot — riktiga besökare lämnar den alltid tom
});

const config = useRuntimeConfig();
const siteKey = config.public.turnstileSiteKey;

const form = reactive(emptyForm());
const touched = reactive<Record<FieldName, boolean>>({ name: false, email: false, guests: false, diet: false, note: false });
const attempted = ref(false);
const pending = ref(false);
const result = ref<ResultState>(null);
const serverErrors = reactive<Partial<Record<FieldName, string>>>({});
const turnstileRef = ref<{ reset: () => void; getToken: (timeoutMs?: number) => Promise<string | null> } | null>(null);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Alla valideringsfel, oavsett om fältet har rörts. Speglar app/utils/rsvpLimits.ts. */
const allErrors = computed<Partial<Record<FieldName, string>>>(() => {
  const e: Partial<Record<FieldName, string>> = {};

  if (!form.name) e.name = r.fieldErrors.nameRequired;
  else if (form.name.length > RSVP_LIMITS.name) e.name = r.fieldErrors.nameTooLong;

  if (!form.email) e.email = r.fieldErrors.emailRequired;
  else if (form.email.length > RSVP_LIMITS.email) e.email = r.fieldErrors.emailTooLong;
  else if (!EMAIL_RE.test(form.email)) e.email = r.fieldErrors.emailInvalid;

  if (form.attending === "yes") {
    if (!Number.isFinite(form.guests) || form.guests < RSVP_LIMITS.guestsMin) e.guests = r.fieldErrors.guestsRequired;
    else if (form.guests > RSVP_LIMITS.guestsMax) e.guests = r.fieldErrors.guestsRange;

    if (form.diet.length > RSVP_LIMITS.diet) e.diet = r.fieldErrors.dietTooLong;
  }

  if (form.note.length > RSVP_LIMITS.note) e.note = r.fieldErrors.noteTooLong;

  return e;
});

/** Fel för fält som rörts, eller efter ett submit-försök — med ev. fel från servern överst. */
const errors = computed<Partial<Record<FieldName, string>>>(() => {
  const clientErrors = attempted.value
    ? allErrors.value
    : (() => {
        const visible: Partial<Record<FieldName, string>> = {};
        for (const key of Object.keys(allErrors.value) as FieldName[]) {
          if (touched[key]) visible[key] = allErrors.value[key];
        }
        return visible;
      })();

  return { ...clientErrors, ...serverErrors };
});

const hasErrors = computed(() => Object.keys(errors.value).length > 0);

/** Vy-data för de fyra terminal-lägena. null = visa formuläret. */
const resultView = computed(() => {
  switch (result.value) {
    case "success":
      return { title: r.thanksTitle, body: r.thanksBody, role: "status" as const, retry: false };
    case "duplicate":
      return { title: r.duplicateTitle, body: r.duplicateBody, role: "status" as const, retry: false };
    case "rate_limited":
      return { title: r.errorTitle, body: r.rateLimitBody, role: "alert" as const, retry: true };
    case "captcha":
      return { title: r.errorTitle, body: r.captchaBody, role: "alert" as const, retry: true };
    case "error":
      return { title: r.errorTitle, body: r.errorBody, role: "alert" as const, retry: true };
    default:
      return null;
  }
});

function touch(field: FieldName) {
  touched[field] = true;
}

function clearServerErrors() {
  for (const key of Object.keys(serverErrors)) delete serverErrors[key as FieldName];
}

// Payload-nyckel → formulärfält, för att kunna rita ut serverns fältfel på rätt plats.
const SERVER_FIELD_MAP: Record<string, FieldName> = {
  name: "name",
  email: "email",
  num_of_guests: "guests",
  allergies_and_special_food: "diet",
  other_information: "note",
};

// Maskinkod (satt av supabase/functions/rsvp/schema.ts) → samma svenska text som klienten
// själv skulle visat för samma fel.
const FIELD_ERROR_MESSAGES: Record<FieldName, Partial<Record<string, string>>> = {
  name: { required: r.fieldErrors.nameRequired, too_long: r.fieldErrors.nameTooLong },
  email: { required: r.fieldErrors.emailRequired, invalid_email: r.fieldErrors.emailInvalid, too_long: r.fieldErrors.emailTooLong },
  guests: { out_of_range: r.fieldErrors.guestsRange, invalid_type: r.fieldErrors.guestsRequired },
  diet: { too_long: r.fieldErrors.dietTooLong },
  note: { too_long: r.fieldErrors.noteTooLong },
};

function applyServerFieldErrors(fields: Record<string, string>) {
  clearServerErrors();
  for (const [serverField, code] of Object.entries(fields)) {
    const key = SERVER_FIELD_MAP[serverField];
    if (!key) continue;
    serverErrors[key] = FIELD_ERROR_MESSAGES[key]?.[code] ?? r.fieldErrors.generic;
  }
}

function buildPayload(token: string) {
  return {
    name: form.name.trim(),
    email: form.email.trim().toLowerCase(),
    attending: form.attending === "yes",
    num_of_guests: form.attending === "yes" ? form.guests : 0,
    allergies_and_special_food: form.attending === "yes" ? form.diet.trim() : "",
    other_information: form.note.trim(),
    website: form.website,
    turnstile_token: token,
  };
}

async function onSubmit() {
  attempted.value = true;
  clearServerErrors();

  if (Object.keys(allErrors.value).length > 0) {
    // Flytta fokus till det första fältet med fel.
    nextTick(() => {
      document.querySelector<HTMLElement>('.rsvp [aria-invalid="true"]')?.focus();
    });
    return;
  }

  if (!config.public.rsvpEndpoint) {
    // Ingen backend konfigurerad (t.ex. npm run dev utan .env) — behåll mock-vägen
    // så sajten går att utveckla lokalt utan Supabase.
    console.log("OSA (mock, inget sparas):", buildPayload(""));
    result.value = "success";
    return;
  }

  pending.value = true;
  try {
    const token = (await turnstileRef.value?.getToken()) ?? "";
    await $fetch(config.public.rsvpEndpoint, {
      method: "POST",
      body: buildPayload(token),
      retry: 0, // token är engångs — en retry skulle alltid nekas och dölja ett dubbelinskick
      timeout: 15_000,
    });
    result.value = "success";
  } catch (err: any) {
    const status: number | undefined = err?.response?.status ?? err?.statusCode;
    const code: string | undefined = err?.data?.code;

    if (status === 409 || code === "duplicate") {
      result.value = "duplicate";
    } else if (status === 429 || code === "rate_limited") {
      result.value = "rate_limited";
    } else if (status === 403 || code === "captcha") {
      result.value = "captcha";
    } else if (status === 400 && err?.data?.fields) {
      // Bör i praktiken vara onåbart eftersom klienten speglar servervalideringen —
      // men om det ändå händer, visa felet på rätt fält i stället för ett terminal-läge.
      applyServerFieldErrors(err.data.fields);
    } else {
      result.value = "error";
    }
  } finally {
    pending.value = false;
    if (result.value !== "success") turnstileRef.value?.reset();
  }
}

function reset() {
  Object.assign(form, emptyForm());
  touched.name = touched.email = touched.guests = touched.diet = touched.note = false;
  attempted.value = false;
  clearServerErrors();
  result.value = null;
}

/** Tillbaka till formuläret efter ett fel, utan att tappa det ifyllda. */
function retry() {
  result.value = null;
}
</script>

<style lang="scss" scoped>
.rsvp__deadline {
  margin-top: 1.5rem;
  font-size: 0.75rem;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: var(--ink-mute);
}

.rsvp {
  display: grid;
  gap: 1.75rem;
  max-width: 40rem;
  margin-inline: auto;

  @media (min-width: 40rem) {
    grid-template-columns: 1fr 1fr;
  }
}

// Osynlig för människor: förskjuten utanför synligt område, inte display:none eller
// type="hidden" — båda ignoreras oftare av enklare formulärbottar.
.rsvp__hp {
  position: absolute;
  left: -9999px;
  top: auto;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.rsvp__turnstile {
  min-height: 0;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0;
  border: 0;
  padding: 0;
  margin: 0;

  &--wide {
    @media (min-width: 40rem) {
      grid-column: 1 / -1;
    }
  }
}

label,
legend {
  font-size: 0.6875rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: var(--ink-soft);
  padding: 0;
}

input[type="text"],
input[type="email"],
input[type="number"],
textarea {
  font-family: var(--sans);
  font-weight: 300;
  font-size: 1rem;
  padding: 0.75rem 0.875rem;
  border: 1px solid var(--line);
  border-radius: 0;
  background: var(--bg);
  color: var(--ink);
  width: 100%;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: var(--ink-mute);
  }

  &:focus {
    border-color: var(--ink);
  }

  &[aria-invalid="true"] {
    border-color: var(--danger);
  }
}

textarea {
  resize: vertical;
}

.choices {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 1.5rem;
  padding-top: 0.25rem;
}

.choice {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  font-size: 0.9375rem;
  letter-spacing: 0;
  text-transform: none;
  color: var(--ink);

  input {
    width: 0.9rem;
    height: 0.9rem;
    accent-color: var(--accent);
  }
}

.field__error {
  font-size: 0.8125rem;
  color: var(--danger);
}

.rsvp__actions {
  align-items: flex-start;
  gap: 1rem;
  margin-top: 0.5rem;
}

.rsvp__summary {
  font-size: 0.875rem;
  color: var(--danger);
}

.rsvp__thanks {
  text-align: center;
  padding: clamp(2.5rem, 6vw, 3.5rem) var(--gutter);
  border: 1px solid var(--line);
  color: var(--ink-soft);
}

.rsvp__thanks-title {
  font-size: 1.75rem;
  color: var(--ink);
  margin-bottom: 0.75rem;
}

.rsvp__again {
  margin-top: 2rem;
}
</style>
