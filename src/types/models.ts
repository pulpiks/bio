import { RouteComponentProps } from "react-router";

export interface Category {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly image: string
    readonly slug: string
    readonly posts: Post[]
}


export interface Post {
    readonly id: string
    readonly title: string
    readonly description: string
    readonly image: string
    readonly body: string
    readonly categories: Category[]
    readonly slug: string
    readonly publishDate: string
}
