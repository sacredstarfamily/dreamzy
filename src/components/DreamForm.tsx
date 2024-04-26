import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { DreamFormDataType } from '../types/index.ts';

type DreamFormProps = {
    addNewDream: (data: DreamFormDataType) => void
}

export default function DreamForm({ addNewDream }: DreamFormProps) {
    const [newDream, setNewDream] = useState<DreamFormDataType>({id: 0,dream: '', sleepStart: '', sleepEnd: '', isPublic: '', keywords: []});

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.name, event.target.value);
        setNewDream({...newDream, [event.target.name]:event.target.value })
    }
    const handleKeywordsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const keywords = event.target.value.split(',').map((k) => k.trim())
        setNewDream({...newDream, keywords })
    }
    const handleFormSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        addNewDream(newDream)
    }

    return (
        <Card className='my-3'>
            <Card.Body>
                <h3 className="text-center">Create New Task</h3>
                <Form onSubmit={handleFormSubmit}>
                    <Form.Label>Dream Description</Form.Label>
                    <Form.Control name='dream' placeholder='Write about your dream' value={newDream.dream} onChange={handleInputChange} />
                    <Form.Label>When did you fall asleep?</Form.Label>
                    <Form.Control name='sleepStart' placeholder='Enter Time you fell asleep' value={newDream.sleepStart} onChange={handleInputChange} />
                    <Form.Label>When did you wake up?</Form.Label>
                    <Form.Control name='sleepEnd' placeholder='Enter Time you woke up' value={newDream.sleepEnd} onChange={handleInputChange} />
                    <Form.Label>Exclusivity</Form.Label>
                    <Form.Control as='select' name='isPublic' value={newDream.isPublic} onChange={handleInputChange}>
                        <option value='PRIVATE'>Private</option>
                        <option value='EXCLUSIVE'>Exclusive</option>
                        <option value='PUBLIC'>Public</option>
                    </Form.Control>
                    <Form.Label>Keywords</Form.Label>
                    <Form.Control name='keywords' placeholder='Enter keywords' value={newDream.keywords} onChange={handleKeywordsChange} />
                    <Button className='mt-3 w-100' variant='success' type='submit'>Create Dream</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}