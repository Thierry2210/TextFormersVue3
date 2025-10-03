import { api } from './client.js'
import * as mock from './mock.js'

// Expected backend response:
// { token: string, user: { id, email, name, plan, remainingCorrections, resetAt, isAdmin? } }
export async function login({ email, password }) {
  const base = import.meta.env.VITE_API_BASE
  if (!base) {
    return await mock.login({ email, password })
  }
  try {
    return await api.post('/auth/login', { email, password })
  } catch (e) {
    // fallback to mock while backend não está pronto
    return await mock.login({ email, password })
  }
}
