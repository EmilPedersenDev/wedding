<template>
  <section id="osa" class="section section--tint">
    <div class="shell">
      <div v-reveal class="section__head measure">
        <p class="eyebrow">{{ r.eyebrow }}</p>
        <h2 class="section__title">{{ r.title }}</h2>
        <p class="section__lead">{{ r.body }}</p>
        <p class="rsvp__deadline">{{ r.deadlineLabel }} — {{ r.deadline }}</p>
      </div>

      <!-- Tack-state ersätter formuläret efter inskickat svar. -->
      <div v-if="submitted" v-reveal class="rsvp__thanks measure" role="status">
        <h3 class="rsvp__thanks-title">{{ r.thanksTitle }}</h3>
        <p>{{ r.thanksBody }}</p>
        <button class="btn btn--light rsvp__again" type="button" @click="reset">Skicka ett svar till</button>
      </div>

      <form v-else class="rsvp" novalidate @submit.prevent="onSubmit">
        <div class="field">
          <label for="rsvp-name">Namn</label>
          <input
            id="rsvp-name"
            v-model.trim="form.name"
            type="text"
            autocomplete="name"
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
          <div class="field">
            <label for="rsvp-guests">Antal gäster</label>
            <input
              id="rsvp-guests"
              v-model.number="form.guests"
              type="number"
              min="1"
              max="10"
              inputmode="numeric"
              :aria-invalid="!!errors.guests"
              :aria-describedby="errors.guests ? 'err-guests' : undefined"
              @blur="touch('guests')"
            />
            <p v-if="errors.guests" id="err-guests" class="field__error">{{ errors.guests }}</p>
          </div>

          <fieldset class="field">
            <legend>Sällskap eller barn?</legend>
            <div class="choices">
              <label class="choice">
                <input v-model="form.plusOne" type="radio" :value="true" />
                <span>Ja</span>
              </label>
              <label class="choice">
                <input v-model="form.plusOne" type="radio" :value="false" />
                <span>Nej</span>
              </label>
            </div>
          </fieldset>

          <div class="field field--wide">
            <label for="rsvp-diet">Matallergier eller specialkost</label>
            <textarea
              id="rsvp-diet"
              v-model.trim="form.diet"
              rows="2"
              placeholder="T.ex. glutenfritt, vegetariskt, nötallergi"
            ></textarea>
          </div>
        </template>

        <div class="field field--wide">
          <label for="rsvp-note">Övrigt (valfritt)</label>
          <textarea id="rsvp-note" v-model.trim="form.note" rows="4" placeholder="Hälsning, låtönskning, frågor..."></textarea>
        </div>

        <div class="field field--wide rsvp__actions">
          <p v-if="hasErrors" class="rsvp__summary" role="alert">
            Kontrollera de markerade fälten innan du skickar.
          </p>
          <button class="btn" type="submit">Skicka OSA</button>
        </div>
      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { wedding } from "~/content/wedding";

const r = wedding.rsvp;

type FieldName = "name" | "email" | "guests";

const emptyForm = () => ({
  name: "",
  email: "",
  attending: "yes" as "yes" | "no",
  guests: 1,
  plusOne: false,
  diet: "",
  note: "",
});

const form = reactive(emptyForm());
const touched = reactive<Record<FieldName, boolean>>({ name: false, email: false, guests: false });
const submitted = ref(false);
const attempted = ref(false);

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Alla valideringsfel, oavsett om fältet har rörts. */
const allErrors = computed<Partial<Record<FieldName, string>>>(() => {
  const e: Partial<Record<FieldName, string>> = {};

  if (!form.name) e.name = "Fyll i ditt namn.";
  if (!form.email) e.email = "Fyll i din e-postadress.";
  else if (!EMAIL_RE.test(form.email)) e.email = "Kontrollera e-postadressen.";
  if (form.attending === "yes" && (!Number.isFinite(form.guests) || form.guests < 1)) {
    e.guests = "Ange minst en gäst.";
  }

  return e;
});

/** Visa bara fel för fält som rörts, eller efter ett submit-försök. */
const errors = computed<Partial<Record<FieldName, string>>>(() => {
  if (attempted.value) return allErrors.value;

  const visible: Partial<Record<FieldName, string>> = {};
  for (const key of Object.keys(allErrors.value) as FieldName[]) {
    if (touched[key]) visible[key] = allErrors.value[key];
  }
  return visible;
});

const hasErrors = computed(() => Object.keys(errors.value).length > 0);

function touch(field: FieldName) {
  touched[field] = true;
}

function onSubmit() {
  attempted.value = true;
  if (Object.keys(allErrors.value).length > 0) {
    // Flytta fokus till det första fältet med fel.
    nextTick(() => {
      document.querySelector<HTMLElement>('.rsvp [aria-invalid="true"]')?.focus();
    });
    return;
  }

  // TODO: Supabase — ersätt loggningen med en insert när backend är på plats.
  console.log("OSA (mock, inget sparas):", { ...form });
  submitted.value = true;
}

function reset() {
  Object.assign(form, emptyForm());
  touched.name = touched.email = touched.guests = false;
  attempted.value = false;
  submitted.value = false;
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
    border-color: #a8574d;
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
  color: #a8574d;
}

.rsvp__actions {
  align-items: flex-start;
  gap: 1rem;
  margin-top: 0.5rem;
}

.rsvp__summary {
  font-size: 0.875rem;
  color: #a8574d;
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
