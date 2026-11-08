/** Lets any part of the page open an email in the email section's lightbox. */
export const OPEN_EMAIL_EVENT = "open-email";

export function openEmail(slug: string) {
  window.dispatchEvent(new CustomEvent<string>(OPEN_EMAIL_EVENT, { detail: slug }));
}
