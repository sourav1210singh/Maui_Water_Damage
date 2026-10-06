"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";
import { serviceAreas } from "@/lib/site";

type Errors = Partial<Record<"name" | "phone" | "town" | "detail", string>>;

/**
 * Callback request form.
 *
 * NOT WIRED TO A BACKEND. On submit it validates and shows a confirmation
 * state so the flow can be reviewed, but nothing is sent anywhere. Before
 * launch this needs a real handler — a route handler posting to the client's
 * email or CRM — plus spam protection.
 */
export function ContactForm() {
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const next: Errors = {};

    const name = String(form.get("name") ?? "").trim();
    const phone = String(form.get("phone") ?? "").trim();
    const town = String(form.get("town") ?? "").trim();
    const detail = String(form.get("detail") ?? "").trim();

    if (!name) next.name = "Please tell us your name.";
    // Deliberately loose: people type numbers every which way under stress.
    if (!phone) next.phone = "We need a number to call you back on.";
    else if (phone.replace(/\D/g, "").length < 7)
      next.phone = "That does not look like a complete phone number.";
    if (!town) next.town = "Pick the closest town so we can judge drive time.";
    if (!detail) next.detail = "A sentence about what happened is enough.";

    setErrors(next);
    if (Object.keys(next).length === 0) setSent(true);
  }

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-card border border-surf-500/40 bg-white p-8 text-center"
      >
        <CheckCircle2 className="mx-auto size-10 text-surf-600" aria-hidden="true" />
        <h3 className="mt-4 font-display text-xl font-bold text-ocean-900">
          Got it — we will call you straight back
        </h3>
        <p className="mt-2.5 text-[15px] leading-relaxed text-ink-700">
          If water is actively coming in, please call rather than wait for us to
          ring you.
        </p>
      </div>
    );
  }

  const field =
    "mt-1.5 w-full rounded-lg border border-sand-300 bg-white px-3.5 py-2.5 text-[15px] text-ink-900 placeholder:text-ink-500/60 focus:border-ocean-600";
  const label = "block font-display text-[14px] font-semibold text-ocean-900";
  const errCls = "mt-1.5 text-[13px] text-alert-600";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <div>
        <label htmlFor="name" className={label}>
          Your name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          className={field}
          placeholder="Jane Kealoha"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-err" : undefined}
        />
        {errors.name && (
          <p id="name-err" className={errCls}>
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className={label}>
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          className={field}
          placeholder="(808) 000-0000"
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-err" : undefined}
        />
        {errors.phone && (
          <p id="phone-err" className={errCls}>
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="town" className={label}>
          Closest town
        </label>
        <select
          id="town"
          name="town"
          defaultValue=""
          className={field}
          aria-invalid={!!errors.town}
          aria-describedby={errors.town ? "town-err" : undefined}
        >
          <option value="" disabled>
            Choose one
          </option>
          {serviceAreas.map((a) => (
            <option key={a.slug} value={a.name}>
              {a.name} — {a.region}
            </option>
          ))}
          <option value="Other">Somewhere else on Maui</option>
        </select>
        {errors.town && (
          <p id="town-err" className={errCls}>
            {errors.town}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="detail" className={label}>
          What has happened?
        </label>
        <textarea
          id="detail"
          name="detail"
          rows={4}
          className={field}
          placeholder="Water heater let go in the garage, about an inch across the floor."
          aria-invalid={!!errors.detail}
          aria-describedby={errors.detail ? "detail-err" : undefined}
        />
        {errors.detail && (
          <p id="detail-err" className={errCls}>
            {errors.detail}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-ocean-800 px-6 py-3.5 font-display text-[15px] font-semibold text-sand-50 transition-colors hover:bg-ocean-900 sm:w-auto"
      >
        <Send className="size-4" aria-hidden="true" />
        Request a callback
      </button>

      <p className="text-[13px] leading-relaxed text-ink-500">
        If water is actively coming in, call instead. A form is slower than a
        phone at two in the morning.
      </p>
    </form>
  );
}
