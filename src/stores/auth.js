import { defineStore } from 'pinia'
import * as authApi from '../api/auth.js'

const STORAGE_KEY = 'tf_auth_v1'

export const useAuthStore = defineStore('auth', {
    state: () => ({ token: null, user: null }),
    getters: {
        isAuthenticated: (s) => Boolean(s.token),
        currentUser: (s) => s.user,
    },
    actions: {
        loadFromStorage() {
            const raw = localStorage.getItem(STORAGE_KEY)
            if (!raw) return
            try {
                const data = JSON.parse(raw)
                this.token = data.token
                this.user = data.user
            } catch {
            }
        },
        persist() {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ token: this.token, user: this.user })
            )
        },
        async login(email, password) {
            const { token, user } = await authApi.login({ email, password })
            // user must include: id, email, name, plan, remainingCorrections, resetAt, (optional) isAdmin
            this.token = token
            this.user = user
            this.persist()
        },
        async socialLogin(provider) {
            return this.login(`${provider}_user@example.com`, 'oauth')
        },
        async register(email, _password, name) {
            const users = JSON.parse(localStorage.getItem('tf_users') || '[]')
            if (users.some((u) => u.email === email)) throw new Error('E-mail já cadastrado')
            const newUser = {
                id: crypto.randomUUID(),
                email,
                name,
                plan: 'free',
                remainingCorrections: 5,
                resetAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
            }
            users.push(newUser)
            localStorage.setItem('tf_users', JSON.stringify(users))
            await this.login(email, _password)
        },
        async logout() {
            this.token = null
            this.user = null
            localStorage.removeItem(STORAGE_KEY)
        },
        async requestPasswordReset(email) {
            console.log('Password reset link would be sent to', email)
        },
        setPlan(plan) {
            if (!this.user) return
            this.user.plan = plan
            this.persist()
        },
        decrementCorrection() {
            if (!this.user) return
            if (this.user.remainingCorrections > 0) {
                this.user.remainingCorrections -= 1
                this.persist()
            }
        },
    },
})
