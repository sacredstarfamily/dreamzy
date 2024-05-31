import { useEffect, useState } from 'react';
import { UserType } from '../types';
import { getMessages } from '../lib/apiWrapper';

import ComposeMessage from '../components/ComposeMessage';
import { ReceivedMessageDataType } from '../types/index';




type MessagesProps = {
    currentUser: UserType|null
}
export default function Messages({currentUser}: MessagesProps) {
    const [messages, setMessages] = useState<ReceivedMessageDataType[] | null>(null);
    useEffect(() => {   
        async function fetchMessages(){
            const token = localStorage.getItem('token');
            if(token && currentUser){
                
                const response = await getMessages(token, currentUser.id);
                
                if (response.data){
                    const message = response.data;
                    console.log(message)
                    setMessages(message)
                }
                
            }
        }
        fetchMessages();
    }
    , [currentUser])
    return (
        <div>
            <h1>Messages</h1>
           {messages? messages.map((m)=>{return <div key={m.id}><h3>Message From: <br/>{m.sender.first_name} {m.sender.last_name}</h3><p>{m.message}</p></div>}): <p>No messages</p>}
            <ComposeMessage currentUser={currentUser}/>
           
        </div>
    )
}