export interface PersonalChat {
    [key: string]: Message
}

export interface PersonalChats {
    [key: string]: PersonalChat[]
}
export interface Message {
    body: string,
    datetime: string,
    fromMe: boolean
}