export type UserType = {
    id:number,
    first_name:string,
    last_name:string,
    username:string,
    email:string,
    dateCreated:string
}
export type UserFormDataType = {
    first_name:string,
    last_name:string,
    email:string,
    username:string,
    password:string,
    confirmPassword:string
}
export type DreamType = {
    id:number,
    dream:string,
    sleepStart:string,
    sleepEnd:string,
    logDate:string,
    user_id:number,
    isPublic:string
    author:UserType,
    allowed_users?:number[],
    dream_date:string,
    keywords:string[]|undefined,
    likes:number|undefined
}
export type DreamFormDataType = {
    dream:string,
    sleepStart:string,
    sleepEnd:string,
    isPublic:string,
    keywords:string[],
    id:number
}
export type InterpretationType = {
    id:number,
    interpretation:string,
    dream_id:number,
    user_id:number

}
export type InterpretationFormDataType = {
    interpretation:string
    dreamId:number
}
export type MessageDataType = {
    message:string,
    sender_id:number,
    messageTo:number|undefined,
}
export type ReceivedMessageDataType = {
    id:number,
    message:string,
    sender_id:number,
    receiver_id:number,
    log_date:string
}
export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'

export type TokenType = {
    token:string,
    tokenExpiration:string
}