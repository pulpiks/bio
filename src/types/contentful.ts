interface ContentfulCategoty {
    readonly sys: {
        readonly space: object,
        readonly id: string
        readonly type: string
        readonly createdAt: string
        readonly updatedAt: string
    }
    readonly fields: {
        readonly title: string
        readonly description: string
        readonly slug: string
        readonly image: any
    }
}


type ContentfulPostSysType = "Array"

export type ContentfulPostFields = {
    readonly title: string
    readonly description: string
    readonly slug: string
    readonly image: any
    readonly body: string
    readonly categories: {
        readonly sys: {
            readonly id: string
            readonly linkType: string
            readonly type: string
        }
    }[]
}

export interface ContentfulPost {
    readonly sys: {
        type: ContentfulPostSysType
    }
    items: {
        readonly fields: ContentfulPostFields[]
    }[]
    limit: number
    skip: number
}

export interface ContentfulPostItems{
    readonly fields: ContentfulPostFields[]
}