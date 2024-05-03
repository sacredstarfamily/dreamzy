import { UserType, CategoryType, InterpretationType, DreamType } from '../types/index';
import { Card } from 'react-bootstrap';
import DreamCard from '../components/DreamCard';


type ViewInterpretationProps = {
    currentUser: UserType|null,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void,
    interpretation: InterpretationType,
    dream: DreamType
}
export default function ViewInterpretation({currentUser, flashMessage, interpretation, dream}: ViewInterpretationProps){
    const token = localStorage.getItem('token');
    if(!token){
        flashMessage('No token found', 'danger')
    }
    return (
        <>
        {dream &&  <DreamCard key={dream.id} dream={dream} currentUser={currentUser}/>}
        <h1 className="text-center">Interpretation</h1>
        {interpretation && 
        <Card key={interpretation.id}>
        <Card.Body>
        <Card.Title>Interpretation</Card.Title>
        <Card.Text>{interpretation.interpretation}</Card.Text>
        </Card.Body>
        </Card>}
        </>
    )
}