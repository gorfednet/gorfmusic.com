/** Web3Forms — inbox (e.g. mike@gorfed.net) is configured only in the Web3Forms dashboard, not in this bundle. */

const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export function getWeb3FormsAccessKey(): string | undefined {
  const k = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
  return typeof k === "string" && k.trim().length > 0 ? k.trim() : undefined;
}

export function isContactFormConfigured(): boolean {
  const k = getWeb3FormsAccessKey();
  return typeof k === "string" && k.length >= 20;
}

export type ContactSubmitPayload = {
  name: string;
  email: string;
  subjectKey: string;
  subjectLabel: string;
  message: string;
  /** Web3Forms botcheck: must stay false for humans (checkbox unchecked). */
  botcheck: boolean;
};

export async function submitToWeb3Forms(payload: ContactSubmitPayload): Promise<{ ok: true } | { ok: false; error: string }> {
  const access_key = getWeb3FormsAccessKey();
  if (!access_key) {
    return { ok: false, error: "The contact form is not configured yet." };
  }

  if (payload.botcheck) {
    return { ok: false, error: "Unable to send. Please try again." };
  }

  const subject = `[gorfmusic.com] ${payload.subjectLabel} / ${payload.name.trim()}`;
  const message = [
    `Topic: ${payload.subjectLabel} (${payload.subjectKey})`,
    "",
    payload.message.trim(),
  ].join("\n");

  const body = new FormData();
  body.append("access_key", access_key);
  body.append("name", payload.name.trim());
  body.append("email", payload.email.trim());
  body.append("subject", subject);
  body.append("message", message);
  body.append("botcheck", payload.botcheck ? "true" : "false");

  const res = await fetch(WEB3FORMS_URL, {
    method: "POST",
    body,
  });

  let data: { success?: boolean; message?: string } = {};
  try {
    data = await res.json();
  } catch {
    return { ok: false, error: "Invalid response from mail service. Please try again later." };
  }

  if (res.ok && data.success === true) {
    return { ok: true };
  }

  const msg =
    typeof data.message === "string" && data.message.length > 0
      ? data.message
      : "Could not send your message. Please try again in a few minutes.";
  return { ok: false, error: msg };
}
