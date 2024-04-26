import React, {useState, useEffect} from 'react';
import { DreamType, UserType, CategoryType, InterpretationFormDataType } from '../types/index';
import { useNavigate, useParams } from 'react-router-dom';
import DreamCard from '../components/DreamCard';
import {addInterpretation} from '../lib/apiWrapper';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { getAllDreams } from '../lib/apiWrapper';
type InterpretationProps = {
    currentUser: UserType|null,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void,
    handleClick: () => void
}
export default function AddInterpretation({currentUser, flashMessage}: InterpretationProps){
    const { dreamId } = useParams();
    const navigate = useNavigate();
    const [interpretationData, setInterpretationData] = useState<InterpretationFormDataType>({interpretation: '', dreamId: dreamId})
    const [dreamToAddIData, setDreamToAddIData] = useState<DreamType|null>(null)
    
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setInterpretationData({...interpretationData, [event.target.name]:event.target.value })
        console.log(interpretationData)
    }
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || '';
        const response = await addInterpretation(token, interpretationData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.interpretation} has been added`, 'success');
           navigate('/')
        }
    }
    useEffect( () => {
        async function getDreams(){
            const token = localStorage.getItem('token') || '';
            if(token){
            const response = await getAllDreams(token);
            if (response.data){
                const dreams = response.data
                const dream = dreams.find((q) => q.id === parseInt(dreamId));
                
                console.log(dream);
                    setDreamToAddIData(dream)
                
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else {
                flashMessage("Something went wrong", 'warning')
                navigate('/')
            }
        } else { 
            flashMessage('No token found', 'danger')
        }
        
        }

        getDreams()
    }, [dreamId, currentUser, flashMessage, navigate] )
    return (
        <>
        <h1 className="text-center">Add Interpretation</h1>
        {dreamToAddIData && <DreamCard dream={dreamToAddIData} currentUser={currentUser}/> }
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Label>Interpretation</Form.Label>
                <Form.Control as='textarea' rows={3} name='interpretation' value={interpretationData.interpretation} onChange={handleInputChange} />
            </Form.Group>
            <Button variant='primary' type='submit'>Submit Interpretation</Button>
        </Form>
        </>
    )
}