import { UserType, CategoryType, DreamType, InterpretationType } from '../types/index';
import { Card } from 'react-bootstrap';
import DreamCard from '../components/DreamCard';
import {useEffect, useState} from 'react';


type ViewInterpretationProps = {
    currentUser: UserType|null,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void,
}
export default function ViewInterpretation({currentUser, flashMessage}: ViewInterpretationProps){
    const [dream] = useState<DreamType|null>(null);
    const [interpretation] = useState<InterpretationType|null>(null);
   useEffect(() => {
    const token = localStorage.getItem('token');
         if (!currentUser || !token){

              flashMessage('You must be logged in to view this page', 'danger');
              window.location.href = '/login';
         }
    }, [currentUser, flashMessage])
    
    
  
    return (
        <>
        {dream &&  <DreamCard key={dream.id} dream={dream} currentUser={currentUser}/>}
        <h1 className="text-center">Interpretation</h1>
        {interpretation && 
        <Card key={interpretation.id}>
        <Card.Body>
        <Card.Title>Interpretation</Card.Title>
        <Card.Text>yup</Card.Text>
        </Card.Body>
        </Card>}
        </>
    )
}