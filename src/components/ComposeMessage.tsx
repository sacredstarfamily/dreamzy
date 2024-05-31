import React from 'react';
import {  useState } from 'react';
import { UserType } from '../types';
import {  sendMessage } from '../lib/apiWrapper';
import { MessageDataType } from '../types';
import { Button, Form } from 'react-bootstrap';
type ComposeMessage = {
    currentUser: UserType|null

}
export default function ComposeMessage({currentUser}: ComposeMessage){
    const [messageData, setMessageData] = useState<MessageDataType>({messageTo: undefined, message: '', sender_id: currentUser?.id || 0});
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessageData({...messageData, [event.target.name]:event.target.value })
        console.log(messageData)
    }
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || '';
        if(currentUser){
        const response = await sendMessage(token,currentUser.id, messageData);
        if (response.error){
            console.error(response.error)
            window.location.reload()
        } else {
            console.log(response.data)
            window.location.reload()
        }
    }
    }
    return (
        <div>
            <h1>Compose Message</h1>
            <Form onSubmit={handleFormSubmit}>
                <Form.Group>
                    <Form.Label>Recipient</Form.Label>
                    <Form.Control type="text"name='messageTo' placeholder="Enter Recipient" value={messageData?.messageTo} onChange={handleInputChange} />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Message</Form.Label>
                    <Form.Control as="textarea"name="message"value={messageData?.message} rows={3} onChange={handleInputChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Send
                </Button>
            </Form>
        </div>
    )
}