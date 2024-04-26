import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUserDreams, deleteDreamById, editDreamById } from '../lib/apiWrapper';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { UserType } from '../types';
import { DreamFormDataType } from '../types';

type EditDreamProps = {
    flashMessage: (message:string, category:CategoryType) => void
    currentUser: UserType|null
   
}

export default function EditDream({ flashMessage, currentUser }: EditDreamProps) {
    const { dreamId } = useParams();
    const navigate = useNavigate();

    const [dreamToEditData, setDreamToEditData] = useState<DreamFormDataType>({dream: '', isPublic: ''})
    const [showModal, setShowModal] = useState(false);

    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    
    useEffect( () => {
        async function getDreams(){
            const token = localStorage.getItem('token') || '';
            const response = await getUserDreams(token);
            if (response.data){
                const dreams = response.data
                const dream = dreams.find((q) => q.id === parseInt(dreamId));
                const currentUser = JSON.parse(localStorage.getItem('currentUser')|| '{}')
                console.log(dream);
                    setDreamToEditData({dream: dream.dream,  isPublic: dream.isPublic})
                
            } else if(response.error){
                flashMessage(response.error, 'danger');
                navigate('/')
            } else {
                flashMessage("Something went wrong", 'warning')
                navigate('/')
            }
        }

        getDreams()
    }, [dreamId, currentUser, flashMessage, navigate] )

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDreamToEditData({...dreamToEditData, [event.target.name]:event.target.value })
    }

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token') || ''
        const response = await editDreamById(token,dreamId, dreamToEditData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.dream} has been updated`, 'success');
            navigate('/')
        }
    }

    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token') || '';
        const response = await deleteDreamById( token,dreamId!);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data}`, 'primary')
            navigate('/')
        }
    }

    return (
        <>
            <Card className='my-3'>
                <Card.Body>
                    <h3 className="text-center">Edit Dream</h3>
                    <Form onSubmit={handleFormSubmit}>
                        <Form.Label>Dream</Form.Label>
                        <Form.Control name='dream' placeholder='Edit Dream' value={dreamToEditData.dream} onChange={handleInputChange} />
                        <Form.Label>What time you went to sleep</Form.Label>
                        <Form.Control as='textarea' name='sleepStart' placeholder='Edit Question Answer' value={dreamToEditData.sleepStart} onChange={handleInputChange} />
                        <Form.Control as='select' name='isPublic' value={dreamToEditData.isPublic} onChange={handleInputChange}>
                        <option value='PRIVATE'>Private</option>
                        <option value='EXCLUSIVE'>Exclusive</option>
                        <option value='PUBLIC'>Public</option>
                        </Form.Control>
                        <Button className='mt-3 w-50' variant='info' type='submit'>Edit Dream</Button>
                        <Button className='mt-3 w-50' variant='danger' onClick={openModal}>Delete Dream</Button>
                    </Form>
                </Card.Body>
            </Card>
            <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {dreamToEditData.dream}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {dreamToEditData.id}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Post</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}