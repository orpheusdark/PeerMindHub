const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000"

export const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("token")
  }
  return null
}

const headers = () => {
  const token = getAuthToken()
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export const api = {
  get: async (endpoint: string) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "GET",
      headers: headers(),
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
  post: async (endpoint: string, body: any) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
  put: async (endpoint: string, body: any) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "PUT",
      headers: headers(),
      body: JSON.stringify(body),
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
  delete: async (endpoint: string) => {
    const res = await fetch(`${API_URL}${endpoint}`, {
      method: "DELETE",
      headers: headers(),
    })
    if (!res.ok) throw new Error(await res.text())
    return res.json()
  },
}
