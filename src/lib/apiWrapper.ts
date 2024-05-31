import axios from 'axios';
import { MessageDataType, ReceivedMessageDataType } from '../types/index';
import { 
    DreamFormDataType,
    DreamType,
    UserFormDataType,
    InterpretationFormDataType,
    InterpretationType,
    UserType,
    TokenType,
 } from '../types/index';

//const baseURL:string = 'http://127.0.0.1:5000';
const baseURL:string = 'https://dreamzyapi.onrender.com'
const userEndpoint:string = '/users'
const tokenEndpoint:string = '/token'
const userDreamsEndpoint:string = '/mydreamz'
const publicDreamsEndpoint:string = '/getdreamz'
const interpretationEndpoint:string = '/interpretations'

const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})
const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})
const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})
type APIResponse<T> = {
    data?: T,
    error?: string
}

async function register(newUserData:UserFormDataType): Promise<APIResponse<UserType>> {
    let data;
    let error;
    const registerData = {
        "firstName": newUserData.first_name,
        "lastName": newUserData.last_name,
        "email": newUserData.email,
        "username": newUserData.username,
        "password": newUserData.password,
    }
    try{
        const response = await apiClientNoAuth().post(userEndpoint, registerData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}
async function login(username: string, password: string): Promise<APIResponse<TokenType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(username, password).get(tokenEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getMe(token: string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/me');
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}  

async function getAllDreams(token: string): Promise<APIResponse<DreamType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(publicDreamsEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getUserDreams(token:string): Promise<APIResponse<DreamType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(userDreamsEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function editDreamById(token:string,dreamId:number, dream:DreamFormDataType): Promise<APIResponse<DreamType>> {
    let data;
    let error;
    const dreamData = {
        "dream": dream.dream,
        "sleepStart": dream.sleepStart,
        "sleepEnd": dream.sleepEnd,
        "exclusivity": dream.isPublic,
        "keywords": dream.keywords
    }
    try{
        const response = await apiClientTokenAuth(token).put(userDreamsEndpoint + '/' + dreamId, dreamData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}
async function getDreamById(token:string, dreamId:number): Promise<APIResponse<DreamType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(userDreamsEndpoint + '/' + dreamId);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }

}
async function createDream(token:string, dream:DreamFormDataType): Promise<APIResponse<DreamType>> {
    let data;
    let error;
    const dreamData = {
        "dream": dream.dream,
        "sleepStart": dream.sleepStart,
        "sleepEnd": dream.sleepEnd,
        "exclusivity": dream.isPublic,
        "keywords": dream.keywords
    }
    try{
        const response = await apiClientTokenAuth(token).post(userDreamsEndpoint, dreamData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }

}
async function likeDream(token: string, dreamId:number):Promise<APIResponse<DreamType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(publicDreamsEndpoint + '/' + dreamId + '/sendlike');
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function deleteDreamById(token:string, dreamId:number): Promise<APIResponse<DreamType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(userDreamsEndpoint + '/' + dreamId);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}
async function addInterpretation(token:string,  interpretation:InterpretationFormDataType): Promise<APIResponse<InterpretationType>> {
    let data;
    let error;
   const interpData = {
    dreamId: interpretation.dreamId,
    interpretation: interpretation.interpretation
   }
    try{
        const response = await apiClientTokenAuth(token).post(interpretationEndpoint,interpData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.message
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}
async function updateUserData(token: string, updatedUserData:Partial<UserFormDataType>): Promise<APIResponse<UserType>> {
    let data;
    let error;
    const convertUserData = {
        "first_name": updatedUserData.first_name,
        "last_name": updatedUserData.last_name,
        "email": updatedUserData.email,
        "username": updatedUserData.username,
        
    }
    try{
        const response = await apiClientTokenAuth(token).put(userEndpoint, convertUserData);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}
async function updateInterpretation(token: string, interpretationId:number, interpretation:InterpretationFormDataType): Promise<APIResponse<InterpretationType>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).put(interpretationEndpoint + '/' + interpretationId, interpretation);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function deleteUserData(token: string): Promise<APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).delete(userEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}
async function addFriend(token: string, userId:number, friendId:number): Promise<APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(userEndpoint + '/' + userId + '/friends/' + friendId);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function sendMessage(token: string,userId:number, message:MessageDataType): Promise<APIResponse<string>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).post(userEndpoint + '/messages/' + userId, message);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function getMessages(token: string, userId: number): Promise<APIResponse<ReceivedMessageDataType[]>> {
    let data;
    let error;
    try{
        const response = await apiClientTokenAuth(token).get(userEndpoint + '/messages/' + userId);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}
export {
    register,
    login,
    getMe,
    getAllDreams,
    getUserDreams,
    createDream,
    getDreamById,
    editDreamById,
    deleteDreamById,
    addInterpretation,
    updateInterpretation,
    updateUserData,
    likeDream,
    deleteUserData,
    addFriend,
    sendMessage,
    getMessages
}
