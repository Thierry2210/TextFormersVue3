import { defineStore } from 'pinia'

export interface EssayItem {
    id: string
    userId: string
    title: string
    content: string
    createdAt: string
    feedback?: {
        summary: string
        errors: Array<{ start: number; end: number; message: string; type: string }>
        suggestions: string[]
        score: number
    }
}

const STORAGE = 'tf_essays_v1'

export const useEssaysStore = defineStore('essays', {
    state: () => ({ items: [] as EssayItem[] }),
    actions: {
        load() {
            const raw = localStorage.getItem(STORAGE)
            this.items = raw ? (JSON.parse(raw) as EssayItem[]) : []
        },
        persist() {
            localStorage.setItem(STORAGE, JSON.stringify(this.items))
        },
        listByUser(userId: string) {
            return this.items.filter((e) => e.userId === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        },
        add(item: Omit<EssayItem, 'id' | 'createdAt'>) {
            const essay: EssayItem = { id: crypto.randomUUID(), createdAt: new Date().toISOString(), ...item }
            this.items.unshift(essay)
            this.persist()
            return essay
        },
        updateFeedback(id: string, feedback: EssayItem['feedback']) {
            const idx = this.items.findIndex((e) => e.id === id)
            if (idx >= 0) {
                this.items[idx].feedback = feedback
                this.persist()
            }
        },
    },
})


