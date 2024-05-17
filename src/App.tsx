import { useState, useEffect, useMemo } from 'react'
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
import ShopPage from './views/Shop';
import AddInterpretation from './views/AddInterpretation';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';
import { Buffer as BufferPolyfill } from 'buffer'

globalThis.Buffer = BufferPolyfill



import '@solana/wallet-adapter-react-ui/styles.css';
import ViewInterpretation from './views/ViewInterpretaion';
import Messages from './views/Messages';
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
const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [
          
            
            new PhantomWalletAdapter({ network }),
        ],
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [network]
    );
  return (
    <>
    <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
            <WalletModalProvider>
               
            
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
                    <Route path='/interpretations/:dreamId' element={<ViewInterpretation currentUser={currentUser} flashMessage={flashMessage} />} />
                    <Route path='/messages' element={<Messages currentUser={currentUser}/>} />
                    <Route path='/shop' element={<ShopPage/>} />
                </Routes>
                
            </Container>
            </WalletModalProvider>
            </WalletProvider>
    </ConnectionProvider>
    </>
  )
}

export default App
