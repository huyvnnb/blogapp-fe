export interface Author {
    id: string;
    username: string;
}

export interface Post {
    id: string;
    title: string;
    content: string;
    summary: string;
    created_at?: string;
    is_public?: boolean;
    published?: boolean;
    author?: Author
}

export interface PublicPost {
    id: string;
    title: string;
    content: string;
    summary?: string;
    created_at: string;
    author: Author
}

export const PostStatus = {
    PENDING: 'pending',
    APPROVE: 'approve',
    REJECT: 'reject'
} as const;

export type PostStatus = typeof PostStatus[keyof typeof PostStatus];


export interface PrivatePost {
    id: string;
    title: string;
    summary?: string;
    content: string;
    published: boolean;
    is_public: boolean;
    status: PostStatus;
    created_at: string;
}

export interface PublicArticle {
    id: string;
    title: string;
    summary?: string;
    created_at: string;
    author: Author
}


export interface PrivateArticle {
    id: string;
    title: string;
    summary?: string;
    published: boolean;
    is_public: boolean;
    status: PostStatus;
    created_at: string;
}

export interface PostCreate {
    title: string;
    content: string;
    summary?: string;
    published?: boolean;
    is_public?: boolean;
}

export interface PostUpdate {
    title: string;
    content: string;
    summary?: string;
    published?: boolean;
    is_public?: boolean
}

export interface Cursor {
    last_rank?: number;
    last_id?: number;
}

export interface PostSearch {
    id: number,
    title: string,
    summary?: string,
    created_at: string,
    user_id: string,
    username: string
}