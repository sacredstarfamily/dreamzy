import { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import { UserType, CategoryType } from './types'
import { getMe } from './lib/apiWrapper.ts'
import AlertMessage from './components/AlertMessage'
import Navigation from './components/Navigation'
import Home from './views/Home'
import SignUp from './views/SignUp'
import Login from './views/Login'
import Dreams from './views/Dreams';
import EditDream from './views/EditDream';
import Profile from './views/Profile';
import AddInterpretation from './views/AddInterpretation';
function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [message, setMessage] = useState<string|undefined>(undefined);
  const [currentUser, setCurrentUser] = useState<UserType|null>(null);
  const [category, setCategory] = useState<CategoryType|undefined>(undefined);
  useEffect(() => {
    async function getLoggedInUser(){
            const token = localStorage.getItem('token');
            if (token){
                const response = await getMe(token);
                if (response.data){
                    setCurrentUser(response.data)
                    localStorage.setItem('currentUser', JSON.stringify(response.data))
                    setIsLoggedIn(true);
                    console.log(response.data);
                } else {
                    setIsLoggedIn(false);
                    console.warn(response.data);
                }
            }
    }
    getLoggedInUser();
  }, [isLoggedIn])
  const logUserIn = () => {
    setIsLoggedIn(true);
}
const flashMessage = (newMessage:string|undefined, newCategory:CategoryType|undefined) => {
  setMessage(newMessage);
  setCategory(newCategory);
}
const logUserOut = () => {
  setIsLoggedIn(false);
  setCurrentUser(null);
  localStorage.removeItem('token');
  localStorage.removeItem('tokenExp');
  localStorage.removeItem('currentUser');
  flashMessage('You have successfully logged out', 'success');
}
  return (
    <>
     <Navigation isLoggedIn={isLoggedIn} logUserOut={logUserOut}/>
            <Container>
            {message && <AlertMessage message={message} category={category} flashMessage={flashMessage}/>}
                <Routes>
                    <Route path='/' element={<Home isLoggedIn={isLoggedIn} currentUser={currentUser} flashMessage={flashMessage}/> } />
                    <Route path='/signup' element={<SignUp logUserIn={logUserIn} flashMessage={flashMessage}/> } />
                    <Route path='/login' element={<Login flashMessage={flashMessage} logUserIn={logUserIn}/> } />
                    <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn} currentUser={currentUser} flashMessage={flashMessage} />} />
                    <Route path='/dreams' element={<Dreams currentUser={currentUser} flashMessage={flashMessage} /> } />
                    <Route path='/dreams/:dreamId' element={<EditDream flashMessage={flashMessage} currentUser={currentUser} />} /> 
                    <Route path='/interpret/:dreamId' element={<AddInterpretation flashMessage={flashMessage} currentUser={currentUser} />} />
                </Routes>
            </Container>
    </>
  )
}

export default App
