<template>
  <main class="wedding-page">
    <section class="hero">
      <p class="tagline">{{ config.tagline }}</p>
      <h1 class="names">{{ config.names }}</h1>
      <a href="#rsvp" class="cta">RSVP</a>
    </section>

    <section class="details">
      <h2>Save the date</h2>
      <p class="date">{{ config.date }}</p>
      <p class="time">{{ config.time }}</p>
      <p class="venue">{{ config.venue }}</p>
    </section>

    <section id="rsvp" class="rsvp-section">
      <h2>RSVP</h2>
      <form class="rsvp-form" @submit.prevent="onSubmit">
        <label for="name">Name</label>
        <input id="name" v-model="form.name" type="text" required placeholder="Your name(s)" />

        <label for="email">Email</label>
        <input id="email" v-model="form.email" type="email" required placeholder="your@email.com" />

        <label>Attending?</label>
        <div class="attending-options">
          <label class="radio-label">
            <input v-model="form.attending" type="radio" value="yes" />
            Yes
          </label>
          <label class="radio-label">
            <input v-model="form.attending" type="radio" value="no" />
            No
          </label>
        </div>

        <label for="note">Note (optional)</label>
        <textarea id="note" v-model="form.note" rows="3" placeholder="Dietary requirements, message..."></textarea>

        <button type="submit" class="submit-btn">Send RSVP</button>
      </form>
    </section>
  </main>
</template>

<script setup lang="ts">
useHead({
  title: "Wedding",
  link: [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500&display=swap",
    },
  ],
});

const config = useRuntimeConfig().public.wedding as {
  names: string;
  date: string;
  time: string;
  venue: string;
  tagline: string;
};
const rsvpFormUrl = useRuntimeConfig().public.rsvpFormUrl as string;

const form = reactive({
  name: "",
  email: "",
  attending: "yes" as "yes" | "no",
  note: "",
});

function onSubmit() {
  if (rsvpFormUrl) {
    window.open(rsvpFormUrl, "_blank");
    return;
  }
  const subject = encodeURIComponent("Wedding RSVP");
  const body = encodeURIComponent(
    `Name: ${form.name}\nEmail: ${form.email}\nAttending: ${form.attending}\nNote: ${form.note || "—"}`
  );
  window.location.href = `mailto:?subject=${subject}&body=${body}`;
}
</script>

<style lang="scss" scoped>
.wedding-page {
  min-height: 100vh;
  font-family: "Cormorant Garamond", "Georgia", serif;
  color: #2c2c2c;
  background: #faf9f7;
}

.hero {
  min-height: 70vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: linear-gradient(180deg, #f5f0eb 0%, #faf9f7 100%);
  text-align: center;

  .tagline {
    font-size: 1.125rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6b6b6b;
    margin-bottom: 0.5rem;
  }

  .names {
    font-size: clamp(2.5rem, 8vw, 4.5rem);
    font-weight: 400;
    letter-spacing: 0.02em;
    margin: 0 0 2rem;
    line-height: 1.2;
  }

  .cta {
    display: inline-block;
    padding: 0.875rem 2rem;
    font-family: inherit;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    text-decoration: none;
    color: #faf9f7;
    background: #2c2c2c;
    border: none;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;

    &:hover {
      background: #4a4a4a;
    }
  }
}

.details {
  padding: 4rem 2rem;
  text-align: center;
  max-width: 32rem;
  margin: 0 auto;

  h2 {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6b6b6b;
    margin-bottom: 1.5rem;
  }

  .date,
  .time,
  .venue {
    font-size: 1.25rem;
    margin: 0.5rem 0;
  }
}

.rsvp-section {
  padding: 4rem 2rem;
  background: #f0ebe5;

  h2 {
    font-size: 1rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: #6b6b6b;
    text-align: center;
    margin-bottom: 2rem;
  }
}

.rsvp-form {
  max-width: 24rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 0.875rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: #4a4a4a;
  }

  input[type="text"],
  input[type="email"],
  textarea {
    font-family: inherit;
    font-size: 1rem;
    padding: 0.75rem;
    border: 1px solid #c9c4be;
    background: #faf9f7;
    color: #2c2c2c;

    &::placeholder {
      color: #9a9a9a;
    }
  }

  .attending-options {
    display: flex;
    gap: 1.5rem;
  }

  .radio-label {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    text-transform: none;
    letter-spacing: 0;
    cursor: pointer;

    input {
      width: 1rem;
      height: 1rem;
    }
  }

  .submit-btn {
    margin-top: 0.5rem;
    padding: 0.875rem 2rem;
    font-family: inherit;
    font-size: 1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: #faf9f7;
    background: #2c2c2c;
    border: none;
    cursor: pointer;
    transition: background 0.2s;

    &:hover {
      background: #4a4a4a;
    }
  }
}
</style>
