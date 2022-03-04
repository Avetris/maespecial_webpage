export class ResourceTypeInfo {
    name!: string
    description!: string
    image!: string
    route!: string
    data!: ResourceInfo[]
}

export class ResourceInfo {
    name!: string
    instagram!: string
    web!: string
    showDate!: Date
}