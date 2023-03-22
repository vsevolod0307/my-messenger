export interface Message {
    body: string,
    datetime: string,
    fromMe: boolean
}

export interface PersonalChats {
    [key: string]: [key: []]
};