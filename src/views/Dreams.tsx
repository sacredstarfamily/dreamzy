import { useEffect, useState } from 'react';
import DreamCard from '../components/DreamCard';
import { getUserDreams } from '../lib/apiWrapper';

import { UserType, DreamType, CategoryType } from '../types/index';

type DreamsProps = {
    currentUser: UserType|null,
    flashMessage: (newMessage:string, newCategory:CategoryType) => void,
   
}
export default function Dreams({currentUser, flashMessage}: DreamsProps) { 
    
    const [dreams, setDreams] = useState<DreamType[]>([]);
    const [fetchDreamData] = useState(true);
    useEffect(() => {
        async function fetchData(){
            const token = localStorage.getItem('token');
            if(token){
            const response = await getUserDreams(token);
            if (response.data){
                const dream = response.data;
                console.log(dream)
                setDreams(dream)
            }
        }else {
            flashMessage('No token found', 'danger')
        }
        }
        fetchData();
    }, [fetchDreamData, flashMessage]);

    return (
        <>
        <h1 className="text-center">Your Dreams</h1>
        {dreams.map((dream) => <DreamCard key={dream.id} dream={dream} currentUser={currentUser}/>)}
        </>
    )
}