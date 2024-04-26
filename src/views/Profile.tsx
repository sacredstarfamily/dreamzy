import React, {useEffect, useState} from 'react';
import { UserType, CategoryType, UserFormDataType } from '../types/index';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import {useNavigate} from 'react-router-dom';
import { updateUserData, deleteUserData } from '../lib/apiWrapper';


type ProfileProps = {
    currentUser: UserType|null,
    flashMessage: (newMessage:string|undefined, newCategory:CategoryType|undefined) => void,
    isLoggedIn: boolean,
}
export default function Profile({currentUser, flashMessage}: ProfileProps){
    const [showModal, setShowModal] = useState(false);
    const [newUserData, setNewUserData] = useState<UserType>({username:'' , email: '', first_name: '', last_name: '', id: 0, dateCreated: ''});
    const openModal = () => setShowModal(true);
    const closeModal = () => setShowModal(false);
    const navigate = useNavigate();
    useEffect(() => {
        {currentUser && setNewUserData({username: currentUser.username, email: currentUser.email, first_name: currentUser.first_name, last_name: currentUser.last_name, id: currentUser.id, dateCreated: currentUser.dateCreated})}
    }, [currentUser])
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewUserData({...newUserData, [event.target.name]:event.target.value })
    }
    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        const token = localStorage.getItem('token');
        const updatedUserData:UserFormDataType = {
            username: newUserData.username,
            email: newUserData.email,
            first_name: newUserData.first_name,
            last_name: newUserData.last_name,
            password: '',
            confirmPassword:''
        }
        const response = await updateUserData(token!, updatedUserData);
        if (response.error){
            flashMessage(response.error, 'danger')
        } else {
            flashMessage(`${response.data?.first_name} has been updated`, 'success');
            navigate('/')
        }
    }
    const handleDeleteClick = async () => {
        const token = localStorage.getItem('token');
        const response = await deleteUserData(token!);
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
        <h1>Profile</h1>
        <Form onSubmit={handleFormSubmit}>
            <Form.Group>
                <Form.Label>Username</Form.Label>
                <Form.Control type='text'name='username' value={newUserData?.username} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type='email' name='email'value={newUserData?.email} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>First Name</Form.Label>
                <Form.Control type='text' name='firstName' value={newUserData?.first_name} onChange={handleInputChange} />
            </Form.Group>
            <Form.Group>
                <Form.Label>Last Name</Form.Label>
                <Form.Control type='text' name='lastName' value={newUserData?.last_name} onChange={handleInputChange} />
            </Form.Group>
            <Button variant='primary' type='submit'>Update</Button>
            <Button variant='danger' onClick={openModal}>Delete</Button>
        </Form>
        </Card.Body>
        </Card>
        <Modal show={showModal} onHide={closeModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {newUserData?.first_name}?</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Are you sure you want to delete {newUserData?.username}? This action cannot be undone.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary' onClick={closeModal}>Close</Button>
                    <Button variant='danger' onClick={handleDeleteClick}>Delete Account</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}