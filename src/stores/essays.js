import { defineStore } from 'pinia'

const STORAGE = 'tf_essays_v1'

export const useEssaysStore = defineStore('essays', {
    state: () => ({ items: [] }),
    actions: {
        load() {
            const raw = localStorage.getItem(STORAGE)
            this.items = raw ? JSON.parse(raw) : []
        },
        persist() {
            localStorage.setItem(STORAGE, JSON.stringify(this.items))
        },
        listByUser(userId) {
            return this.items.filter((e) => e.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        },
        add(item) {
            const essay = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...item }
            this.items.unshift(essay)
            this.persist()
            return essay
        },
        updateFeedback(id, feedback) {
            const idx = this.items.findIndex((e) => e.id === id)
            if (idx >= 0) {
                this.items[idx].feedback = feedback
                this.persist()
            }
        },
    },
})
