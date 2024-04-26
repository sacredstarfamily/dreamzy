import {useState, useEffect} from 'react';
import { DreamType, UserType } from '../types';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
type DreamCardProps = {
    dream: DreamType
    currentUser: UserType
}

export default function DreamCard({ dream, currentUser }: DreamCardProps) {
    const [interpretable, setInterpretable] = useState<boolean>(false);
    useEffect(() => {
        if(dream.author.id === currentUser?.id && dream.isPublic === 'PUBLIC'){
            setInterpretable(true);
        } else if(dream.isPublic === 'EXCLUSIVE' && dream.allowed_users.includes(currentUser?.id)){
            setInterpretable(true);
        }
    }, [dream, currentUser])
    return (
        <Card className='my-3 bg-custom' text='black'>
            <Card.Header>{ dream.dream_date }</Card.Header>
            <Card.Body>
                <Card.Title>{ dream.sleepStart }</Card.Title>
                <Card.Text>{ dream.dream }</Card.Text>
                <Card.Text>{ dream.sleepEnd }</Card.Text>
                <Card.Text>{ dream.isPublic }</Card.Text>
                <Card.Text>{ dream.keywords }</Card.Text>
                <Card.Text>{dream.sleepStart}</Card.Text>
                {dream.author.id === currentUser?.id && <Link to={`/dreams/${dream.id}`}><Button variant='primary'>Edit Dream</Button></Link>}
                {interpretable && <Link to={`/interpret/${dream.id}`}><Button variant='success'>Interpret Dream</Button></Link>}
                <Card.Subtitle>Created By: { dream.author.username }</Card.Subtitle>
            </Card.Body>
        </Card>
    )
}