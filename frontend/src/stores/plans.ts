import { defineStore } from 'pinia'

export interface Plan {
    id: 'free' | 'student' | 'candidate' | 'teacher'
    name: string
    price: number
    period: 'mensal' | 'anual'
    limit: number
    benefits: string[]
}

export const defaultPlans: Plan[] = [
    { id: 'free', name: 'Gratuito', price: 0, period: 'mensal', limit: 5, benefits: ['5 correções/mês', 'Histórico básico'] },
    { id: 'student', name: 'Estudante', price: 19.9, period: 'mensal', limit: 30, benefits: ['30 correções/mês', 'Relatórios detalhados'] },
    { id: 'candidate', name: 'Vestibulando', price: 39.9, period: 'mensal', limit: 80, benefits: ['80 correções/mês', 'Insights avançados', 'Prioridade'] },
    { id: 'teacher', name: 'Professor', price: 59.9, period: 'mensal', limit: 200, benefits: ['200 correções/mês', 'Turmas', 'Exportação'] },
]

const STORAGE = 'tf_plans_v1'

export const usePlansStore = defineStore('plans', {
    state: () => ({ plans: defaultPlans as Plan[] }),
    actions: {
        load() {
            const raw = localStorage.getItem(STORAGE)
            this.plans = raw ? (JSON.parse(raw) as Plan[]) : defaultPlans
        },
        persist() {
            localStorage.setItem(STORAGE, JSON.stringify(this.plans))
        },
        upsert(plan: Plan) {
            const idx = this.plans.findIndex((p) => p.id === plan.id)
            if (idx >= 0) this.plans[idx] = plan
            else this.plans.push(plan)
            this.persist()
        },
        remove(id: Plan['id']) {
            this.plans = this.plans.filter((p) => p.id !== id)
            this.persist()
        },
    },
})


