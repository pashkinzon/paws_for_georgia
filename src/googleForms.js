const formUrl = import.meta.env.VITE_GOOGLE_FORM_URL
const emailEntry = import.meta.env.VITE_GOOGLE_FORM_EMAIL_ENTRY
const messageEntry = import.meta.env.VITE_GOOGLE_FORM_MESSAGE_ENTRY

export const googleFormsConfigured = Boolean(formUrl && emailEntry)

export async function submitToGoogleForms({ email, message = '' }) {
  if (!googleFormsConfigured) {
    throw new Error('Google Form configuration is missing')
  }

  const body = new URLSearchParams({ [emailEntry]: email })
  if (messageEntry && message) body.set(messageEntry, message)

  await fetch(formUrl, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  })
}
