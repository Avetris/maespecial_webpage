export class ResourceInfo {
    id!: number
    type!: string
    name!: string
    instagram!: string
    web!: string
    showDate!: Date
    isEdit!: boolean
    isSelected!: boolean
}

export class PostInfo {
    id!: number
    title!: string
    description!: string
    image!: string
    content!: string
    publishDate!: Date
}


export class PostInfoList {
    data: PostInfo[]
    meta!: PostMeta
}

export class PostMeta {
    page!: number
    pageSize!: number
    length!: number
}


export class General {
    status!: number
}