import { type FormEvent, type ReactNode, useEffect, useId, useRef, useState } from "react";
import { motion } from "motion/react";
import { Send, AlertCircle, Loader2 } from "lucide-react";
import { isContactFormConfigured, submitToWeb3Forms } from "@/config/contactForm";
import { PageIntro } from "../components/PageIntro";
import { contentShellInnerClass, siteFonts } from "../styles/typography";
import { sectionGutterX, sectionPaddingY } from "../styles/layoutSections";
import { easeOutExpo } from "../motionPresets";
import { marketingCtaOnImage, marketingIconGlyphOnImageCta, marketingIconGlyphStaticSolo } from "../styles/uiPatterns";
import { useRevealMotion } from "../useRevealMotion";

const MAX_NAME = 120;
const MAX_EMAIL = 254;
const MAX_MESSAGE = 8000;
const MIN_MESSAGE = 30;
const MIN_NAME = 2;
/** Ignore instant submissions (typical of bots). */
const MIN_MS_BEFORE_SUBMIT = 2800;
/** Client-side throttle between sends (session). */
const SUBMIT_COOLDOWN_MS = 90_000;
const COOLDOWN_STORAGE_KEY = "gorfmusic-contact-last-send";

const SUBJECT_OPTIONS = [
  { value: "licensing", label: "Licensing" },
  { value: "booking", label: "Live performance / DJ set booking" },
  { value: "collab", label: "Collaboration" },
  { value: "commission", label: "Commission / hire" },
  { value: "press", label: "Press / media" },
  { value: "general", label: "General inquiry" },
] as const;
const fieldLabelClass = "block text-[#c3c3d2] text-[0.85rem] mb-2";
const fieldInputClass =
  "w-full px-4 py-3 bg-[#0a0a16] border border-[rgba(255,0,102,0.14)] rounded-xl text-white placeholder-[#73738a] focus:outline-none focus:border-[#ff0066] focus:ring-1 focus:ring-[#ff0066] transition-colors";
const fieldSelectClass =
  "w-full h-12 px-4 bg-[#0a0a16] border border-[rgba(255,0,102,0.14)] rounded-xl text-white leading-normal focus:outline-none focus:border-[#ff0066] focus:ring-1 focus:ring-[#ff0066] transition-colors cursor-pointer";

function FormAlert(props: { tone: "warning" | "error"; children: ReactNode }) {
  const { tone, children } = props;
  const isWarning = tone === "warning";
  return (
    <div
      className={`mb-6 flex gap-3 rounded-xl px-4 py-3 text-[0.9rem] ${isWarning ? "border border-amber-500/30 bg-amber-500/10 text-amber-100/95" : "border border-red-500/35 bg-red-500/10 text-red-100/95"}`}
      role={isWarning ? "status" : "alert"}
    >
      <AlertCircle className={`h-5 w-5 flex-shrink-0 ${isWarning ? "text-amber-400" : "text-red-400"}`} aria-hidden="true" />
      <p>{children}</p>
    </div>
  );
}

function getSubjectLabel(key: string): string {
  const row = SUBJECT_OPTIONS.find((o) => o.value === key);
  return row?.label ?? key;
}

export function ContactPage() {
  const { reduced } = useRevealMotion();
  const formId = useId();
  const formMountedAt = useRef<number>(Date.now());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState<string>("");
  const [message, setMessage] = useState("");
  const [honeypot, setHoneypot] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<"name" | "email" | "subject" | "message", string>>>({});

  const configured = isContactFormConfigured();

  useEffect(() => {
    formMountedAt.current = Date.now();
  }, []);

  const validate = (): boolean => {
    const next: Partial<Record<"name" | "email" | "subject" | "message", string>> = {};
    const nt = name.trim();
    const et = email.trim();
    const mt = message.trim();

    if (nt.length < MIN_NAME) next.name = `Please enter at least ${MIN_NAME} characters.`;
    if (nt.length > MAX_NAME) next.name = `Name is too long (max ${MAX_NAME}).`;

    if (!et) next.email = "Email is required.";
    else if (et.length > MAX_EMAIL) next.email = "Email is too long.";
    else {
      const el = document.getElementById(`${formId}-email`) as HTMLInputElement | null;
      if (el && typeof el.checkValidity === "function" && !el.checkValidity()) {
        next.email = "Please enter a valid email address.";
      }
    }

    if (!subject) next.subject = "Please choose a topic.";

    if (mt.length < MIN_MESSAGE) next.message = `Please enter at least ${MIN_MESSAGE} characters (helps filter junk).`;
    if (mt.length > MAX_MESSAGE) next.message = `Message is too long (max ${MAX_MESSAGE} characters).`;

    setFieldErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError(null);

    if (honeypot.trim() !== "") {
      setSubmitted(true);
      return;
    }

    if (!configured) {
      setFormError("This form is not connected yet. Add VITE_WEB3FORMS_ACCESS_KEY to your environment and rebuild.");
      return;
    }

    const elapsed = Date.now() - formMountedAt.current;
    if (elapsed < MIN_MS_BEFORE_SUBMIT) {
      setFormError("Please wait a moment before sending. That step cuts most bot traffic.");
      return;
    }

    const last = Number(sessionStorage.getItem(COOLDOWN_STORAGE_KEY) || "0");
    if (Date.now() - last < SUBMIT_COOLDOWN_MS) {
      setFormError("You recently sent a message. Please wait before sending another.");
      return;
    }

    if (!validate()) return;

    setSubmitting(true);
    const result = await submitToWeb3Forms({
      name: name.trim(),
      email: email.trim(),
      subjectKey: subject,
      subjectLabel: getSubjectLabel(subject),
      message: message.trim(),
      botcheck: false,
    });
    setSubmitting(false);

    if (result.ok) {
      sessionStorage.setItem(COOLDOWN_STORAGE_KEY, String(Date.now()));
      setSubmitted(true);
      return;
    }
    setFormError(result.error);
  };

  return (
    <div className="min-h-screen">
      <PageIntro
        eyebrow="Get in Touch"
        title="Contact"
        titleId="contact-page-title"
        lead="Use the form for licensing, live holds, booking inquiries, scoring, remixes, press, or studio work. Always open to new opportunities and would love to connect."
      />

      <section className={`${sectionGutterX} ${sectionPaddingY}`} aria-labelledby="contact-heading">
        <div className={contentShellInnerClass}>
          <h2 id="contact-heading" className="sr-only">
            Contact form and information
          </h2>
          <motion.div
            className="w-full"
            initial={reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduced ? 0 : 0.12, duration: reduced ? 0 : 0.55, ease: easeOutExpo }}
          >
              {!configured && (
                <FormAlert tone="warning">
                  Contact form delivery is not configured. Add <code className="rounded bg-black/30 px-1 py-0.5 text-[0.8rem]">VITE_WEB3FORMS_ACCESS_KEY</code>{" "}
                  (see <code className="rounded bg-black/30 px-1 py-0.5 text-[0.8rem]">.env.example</code>) and choose the notification inbox in the Web3Forms dashboard (not in this codebase).
                </FormAlert>
              )}

              {submitted ? (
                <div className="mx-auto max-w-md bg-[#0a0a16] border border-[rgba(255,0,102,0.14)] rounded-2xl p-10 text-center" role="status" aria-live="polite">
                  <div className="w-16 h-16 bg-[#00e5ff]/10 rounded-full flex items-center justify-center mx-auto mb-5">
                    <Send size={24} className={marketingIconGlyphStaticSolo} aria-hidden="true" />
                  </div>
                  <h3 className="text-white text-xl mb-2" style={siteFonts.subsectionTitle}>
                    Message sent
                  </h3>
                  <p className="text-[#a9a9be]">
                    Message received. Replies usually arrive within a few business days at the submitted email address.
                  </p>
                </div>
              ) : (
                <form id={formId} onSubmit={handleSubmit} className="relative" noValidate>
                  <div className="absolute left-0 top-0 -z-10 h-0 w-0 overflow-hidden opacity-0" aria-hidden="true">
                    <label htmlFor={`${formId}-company`}>Company website</label>
                    <input
                      id={`${formId}-company`}
                      type="text"
                      name="company_website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypot}
                      onChange={(e) => setHoneypot(e.target.value)}
                    />
                  </div>

                  {formError && <FormAlert tone="error">{formError}</FormAlert>}

                  <div className="space-y-5 md:space-y-6">
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      <div className="min-w-0">
                        <label htmlFor={`${formId}-name`} className={fieldLabelClass}>
                          Name <span className="text-[#ff0066]">*</span>
                        </label>
                        <input
                          id={`${formId}-name`}
                          name="name"
                          type="text"
                          required
                          minLength={MIN_NAME}
                          maxLength={MAX_NAME}
                          autoComplete="name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          aria-invalid={fieldErrors.name ? true : undefined}
                          aria-describedby={fieldErrors.name ? `${formId}-name-err` : undefined}
                          className={fieldInputClass}
                          placeholder="Your name"
                        />
                        {fieldErrors.name && (
                          <p id={`${formId}-name-err`} className="mt-1.5 text-[0.8rem] text-red-400">
                            {fieldErrors.name}
                          </p>
                        )}
                      </div>
                      <div className="min-w-0">
                        <label htmlFor={`${formId}-email`} className={fieldLabelClass}>
                          Email <span className="text-[#ff0066]">*</span>
                        </label>
                        <input
                          id={`${formId}-email`}
                          name="email"
                          type="email"
                          required
                          maxLength={MAX_EMAIL}
                          autoComplete="email"
                          inputMode="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          aria-invalid={fieldErrors.email ? true : undefined}
                          aria-describedby={fieldErrors.email ? `${formId}-email-err` : undefined}
                          className={fieldInputClass}
                          placeholder="you@example.com"
                        />
                        {fieldErrors.email && (
                          <p id={`${formId}-email-err`} className="mt-1.5 text-[0.8rem] text-red-400">
                            {fieldErrors.email}
                          </p>
                        )}
                      </div>
                      <div className="min-w-0 sm:col-span-2 lg:col-span-1">
                        <label htmlFor={`${formId}-subject`} className={fieldLabelClass}>
                          What&apos;s this about? <span className="text-[#ff0066]">*</span>
                        </label>
                        <select
                          id={`${formId}-subject`}
                          name="subject"
                          required
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          aria-invalid={fieldErrors.subject ? true : undefined}
                          aria-describedby={fieldErrors.subject ? `${formId}-subject-err` : undefined}
                          className={fieldSelectClass}
                        >
                          <option value="" disabled>
                            Select a topic…
                          </option>
                          {SUBJECT_OPTIONS.map((o) => (
                            <option key={o.value} value={o.value}>
                              {o.label}
                            </option>
                          ))}
                        </select>
                        {fieldErrors.subject && (
                          <p id={`${formId}-subject-err`} className="mt-1.5 text-[0.8rem] text-red-400">
                            {fieldErrors.subject}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="min-w-0">
                      <label htmlFor={`${formId}-message`} className={fieldLabelClass}>
                        Message <span className="text-[#ff0066]">*</span>
                      </label>
                      <textarea
                        id={`${formId}-message`}
                        name="message"
                        required
                        minLength={MIN_MESSAGE}
                        rows={12}
                        maxLength={MAX_MESSAGE}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        aria-invalid={fieldErrors.message ? true : undefined}
                        aria-describedby={fieldErrors.message ? `${formId}-message-err` : undefined}
                        className={`${fieldInputClass} min-h-[15rem] resize-y`}
                        placeholder="Tell us about the project…"
                      />
                      <div className="mt-2 flex flex-row flex-wrap items-start justify-between gap-x-4 gap-y-3">
                        <div className="min-w-0 flex-1">
                          <p className="text-[0.75rem] text-[#8e8ea3] leading-snug">
                            {message.length} / {MAX_MESSAGE} · min {MIN_MESSAGE} characters
                          </p>
                          {fieldErrors.message && (
                            <p id={`${formId}-message-err`} className="mt-1.5 text-[0.8rem] text-red-400">
                              {fieldErrors.message}
                            </p>
                          )}
                        </div>
                        <button
                          type="submit"
                          disabled={submitting || !configured}
                          aria-busy={submitting}
                          className={`${marketingCtaOnImage} shrink-0 px-8 py-3`}
                        >
                          {submitting ? (
                            <Loader2 size={16} className={`animate-spin ${marketingIconGlyphOnImageCta}`} aria-hidden="true" />
                          ) : (
                            <Send size={16} className={marketingIconGlyphOnImageCta} aria-hidden="true" />
                          )}
                          {submitting ? "Sending…" : "Send message"}
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              )}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
