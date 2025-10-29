export interface UserCreate {
    username: string,
    password: string,
    display_name: string,
}

export interface User {
    id: string,
    username: string,
    display_name: string,
    avatarUrl?: string
}

export interface UserProfile {
    username: string,
    display_name: string
}

export interface UserEffective {
    user_id: string,
    username: string,
    display_name: string,
    total_posts: number
}