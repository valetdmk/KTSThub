export type UserRole = 'admin' | 'organizer' | 'participant'

export interface User {
    id: number;
    name: string;
    role: UserRole
}

let accessToken: string | null = null
let currentUser: User | null = null

export const authStore = {
    setToken(token: string) {
        accessToken = token
    },

    getToken() {
        return accessToken
    },

    setUser(user: User) {
        currentUser = user
    },

    getUser() {
        return currentUser
    },

    logout() {
        accessToken = null
        currentUser = null
    }
}