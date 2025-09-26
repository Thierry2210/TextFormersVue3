import { defineStore } from 'pinia'

export interface UserProfile {
    id: string
    email: string
    name: string
    plan: 'free' | 'student' | 'candidate' | 'teacher'
    isAdmin?: boolean
    remainingCorrections: number
    resetAt: string
}

interface AuthState {
    token: string | null
    user: UserProfile | null
}

const STORAGE_KEY = 'tf_auth_v1'

export const useAuthStore = defineStore('auth', {
    state: (): AuthState => ({ token: null, user: null }),
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
            } catch { }
        },
        persist() {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify({ token: this.token, user: this.user })
            )
        },
        async login(email: string, _password: string) {
            const fakeToken = 'token_' + Math.random().toString(36).slice(2)
            const existing = JSON.parse(localStorage.getItem('tf_users') || '[]') as UserProfile[]
            let user = existing.find((u) => u.email === email)
            if (!user) {
                user = {
                    id: crypto.randomUUID(),
                    email,
                    name: email.split('@')[0],
                    plan: 'free',
                    remainingCorrections: 5,
                    resetAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
                }
                existing.push(user)
                localStorage.setItem('tf_users', JSON.stringify(existing))
            }
            this.token = fakeToken
            this.user = user
            this.persist()
        },
        async socialLogin(provider: 'google' | 'facebook') {
            return this.login(`${provider}_user@example.com`, 'oauth')
        },
        async register(email: string, _password: string, name: string) {
            const users = JSON.parse(localStorage.getItem('tf_users') || '[]') as UserProfile[]
            if (users.some((u) => u.email === email)) throw new Error('E-mail já cadastrado')
            const newUser: UserProfile = {
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
        async requestPasswordReset(email: string) {
            console.log('Password reset link would be sent to', email)
        },
        setPlan(plan: UserProfile['plan']) {
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


