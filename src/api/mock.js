const USERS_KEY = 'tf_users'

function readUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY) || '[]')
}

function writeUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

export async function login({ email, password }) {
    await delay(200)
    const users = readUsers()
    const user = users.find(u => u.email === email)
    if (!user) throw new Error('Usuário não encontrado')
    // very simple password mock: store alongside user.email for demo only
    if (user.__password && user.__password !== password) throw new Error('Credenciais inválidas')
    const token = 'mock_' + Math.random().toString(36).slice(2)
    return { token, user }
}

export async function register({ name, email, password }) {
    await delay(200)
    const users = readUsers()
    if (users.some(u => u.email === email)) throw new Error('E-mail já cadastrado')
    const newUser = {
        id: crypto.randomUUID(),
        email,
        name,
        plan: 'free',
        remainingCorrections: 5,
        resetAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
        __password: password,
    }
    users.push(newUser)
    writeUsers(users)
    const token = 'mock_' + Math.random().toString(36).slice(2)
    return { token, user: newUser }
}

export async function me({ token }) {
    await delay(150)
    // naive token usage, just return first user for demo
    const users = readUsers()
    return users[0] || null
}

function delay(ms) { return new Promise(r => setTimeout(r, ms)) }
