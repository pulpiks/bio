export interface Category {
    readonly title: string
    readonly description: string
    readonly image: string
    readonly slug: string
    readonly posts: Post[]
}


export interface Post {
    readonly title: string
    readonly description: string
    readonly image: string
    readonly body: string
    readonly categories: Category[]
    readonly slug: string
    readonly publishDate: string
}