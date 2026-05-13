const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export async function submitContact(data) {
  const res = await fetch(`${BASE_URL}/api/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Failed to submit')
  return json
}

export async function submitHealthCheck(data) {
  const res = await fetch(`${BASE_URL}/api/hr-health-check`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Failed to submit')
  return json
}

export async function submitApplication(formData) {
  const res = await fetch(`${BASE_URL}/api/applications`, {
    method: 'POST',
    body: formData,
  })
  const json = await res.json()
  if (!res.ok) throw new Error(json.error || 'Failed to submit')
  return json
}
