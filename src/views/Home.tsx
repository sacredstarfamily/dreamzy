import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import {UserType, DreamType, DreamFormDataType, CategoryType} from '../types';
import DreamCard from '../components/DreamCard';
import DreamForm from '../components/DreamForm';
import { getAllDreams, createDream } from '../lib/apiWrapper';


type HomeProps = {
    isLoggedIn: boolean,
    currentUser: UserType|null,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void
}
type Sorting = {
    idAsc: (a: DreamType, b:DreamType) => number,
    idDesc: (a: DreamType, b:DreamType) => number,
    titleAsc: (a: DreamType, b:DreamType) => number,
    titleDesc: (a: DreamType, b:DreamType) => number,
}
export default function Home({currentUser, isLoggedIn, flashMessage}:HomeProps) {
    const [showForm, setShowForm] = useState(false);
    const [dreams, setDreams] = useState<DreamType[]>([]);
    const [fetchDreams, setFetchDreams] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    useEffect(() => {
        async function getDreams(){
            const token = localStorage.getItem('token');
            if(token){
            const response = await getAllDreams(token);
            if (response.data){
                setDreams(response.data);
                console.log(response.data);
            } else {
                console.log(response.error)
            }
        } else {
            console.log('no token found')
        }
    }
        getDreams();
    }, [fetchDreams])
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {

        const sortFunctions:Sorting = {
            idAsc: (a:DreamType, b:DreamType) => a.id - b.id,
            idDesc: (a:DreamType, b:DreamType) => b.id - a.id,
            titleAsc: (a:DreamType, b:DreamType) => a.dream > b.dream ? 1 : -1,
            titleDesc: (a:DreamType, b:DreamType) => b.dream > a.dream ? 1 : -1
        }
        const func = sortFunctions[e.target.value as keyof Sorting];
        const newSortedArr = [...dreams].sort(func);
        setDreams(newSortedArr);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value);
    }
    const addNewDream = async (newDreamData:DreamFormDataType) => {
        const token = localStorage.getItem('token');
        const response = await createDream(token!, newDreamData);
        if(response.error){
         flashMessage(response.error, 'danger')
        } else {
         console.log(response);
         flashMessage(`${response.data!.dream_date} has been added`, 'success');
         setShowForm(false);
         setFetchDreams(!fetchDreams);
        }
     }
    return (
        <>
      <div className="logo-container">
      <div className="cloud">
        <div className="cloudContainer">
        <img id="sheep"src="./sheep.gif"alt="Jumping Sheep" width="40%" />
        <img id="personSleeping"src="./sleepingperson.png" alt="sleepingPerson" width="60%"  />
        </div>
      </div>
      </div>
      {!isLoggedIn &&
      <>
       <h1 className="text-center">Welcome to Dreamzy</h1>
       <h3>Your map to better understanding and sharing your dreams</h3>
       <h2 className="text-center">Please Sign Up or Log In to Continue</h2>
       </>
       }
      {isLoggedIn && <Row>
      <Col xs={12} md={6}>
                <Form.Control value={searchTerm} placeholder='Search Dreams' onChange={handleInputChange} />
            </Col>
           
            <Col>
                <Form.Select onChange={handleSelectChange}>
                    <option>Choose Sorting Option</option>
                    <option value="idAsc">Sort By ID ASC</option>
                    <option value="idDesc">Sort By ID DESC</option>
                    <option value="titleAsc">Sort By Title ASC</option>
                    <option value="titleDesc">Sort By Title DESC</option>
                </Form.Select>
            </Col>
        </Row>}
      {isLoggedIn && <Button onClick={()=>{setShowForm(!showForm)}}>Create Task</Button>}
      {showForm && <DreamForm addNewDream={addNewDream} />}
      {dreams.filter(dream => dream.dream.toLowerCase().includes(searchTerm.toLowerCase())).map( p => <DreamCard key={p.id} dream={p} currentUser={currentUser} /> )}
        </>
    )
    
}