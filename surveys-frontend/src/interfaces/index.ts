export interface IItems {
    link?: string
    name: string
    icon: string
    isExpanded: boolean
    expanded?: boolean
    subLinks?: ISubItems[]
}

export interface ISubItems {
    link: string
    name: string
    icon: string
}