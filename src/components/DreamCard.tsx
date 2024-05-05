import {useState, useEffect} from 'react';
import { DreamType, UserType } from '../types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import thumbsup from '../assets/thumbs-up.png';
import aOk from '../assets/OK.png';
import likeDream from '../lib/apiWrapper';
type DreamCardProps = {
    dream: DreamType
    currentUser: UserType|null
}

export default function DreamCard({ dream, currentUser }: DreamCardProps) {
    const [interpretable, setInterpretable] = useState<boolean>(false);
    useEffect(() => {
        if(dream.author.id === currentUser?.id && dream.isPublic === 'PUBLIC'){
            setInterpretable(true);
        } else if(dream.isPublic === 'EXCLUSIVE' && dream.allowed_users?.includes(currentUser!.id)){
            setInterpretable(true);
        }
    }, [dream, currentUser])
    return (
        <>
        <Card className='my-3 bg-custom' text='black'>
            <Card.Header className="text-center">Posted on:{ dream.dream_date }</Card.Header>
            <Card.Body>
                <Card.Title className="text-center">slept from:{ dream.sleepStart } - {dream.sleepEnd}</Card.Title>
                <label htmlFor="dream" className="text-center">The Dream:</label>
                <Card.Text id ="dream" className="border-bottom p-2">{ dream.dream }</Card.Text>
                <Card.Text className="text-center">This dream is { dream.isPublic }</Card.Text>
                <Card.Text className="text-center">Keywords: { dream.keywords }</Card.Text>
               <Row className="mx-5 justify-content-center align-items-center align-self-center">
                <Col className="justify-content-center align-items-center align-self-center" >
                {dream.author.id === currentUser?.id && <Link to={`/dreams/${dream.id}`}><Button variant='primary'>Edit Dream</Button></Link>}
                </Col>
                <Col className="justify-content-center align-items-center align-self-center">
                {interpretable && <Link to={`/interpret/${dream.id}`}><Button variant='success'>Interpret Dream</Button></Link>}
                </Col>
                </Row>
               
                <Card.Subtitle className="text-center mt-2">Created By: { dream.author.username }</Card.Subtitle>
                <div className="buttonContainer">
        <div className="likeBtnContainer">
        <button onClick={likeDream}><img src={thumbsup} alt="thumbs up" className="likebtn" /></button>
        <p className="liketext">{ dream.likes } Likes</p>
        </div>
        <div className="addInterpretationBtnContainer">
            <img src={aOk} alt="add interpretation" className="addInterpretationBtn" />
            <p className="addInterpretationText">Interpretations</p>
        </div>
        </div>
            </Card.Body>
            
        </Card>
       
        </>
    )
}