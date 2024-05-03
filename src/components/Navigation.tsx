import { useState } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';

type NavigationProps = {
    isLoggedIn: boolean
    logUserOut: () => void
}

export default function Navigation({ isLoggedIn, logUserOut }: NavigationProps){

    const [backgroundTheme] = useState('light');
    
    return (
        <Navbar expand='lg' data-bs-theme={backgroundTheme} bg={backgroundTheme}>
            <Container fluid>
                <Navbar.Brand as={Link} to='/'>Dreamzy</Navbar.Brand>
                <Navbar.Toggle aria-controls='nav-collapse' />
                <Navbar.Collapse id='nav-collapse'>
                    <Nav className='me-auto'>
                        {isLoggedIn ? (
                            <>
                                <Nav.Link href='/dreams'>See Your Dreams</Nav.Link>
                                <Nav.Link href='/profile'>Edit Profile</Nav.Link>
                                <WalletMultiButton />
                                <WalletDisconnectButton />
                                <Nav.Link href='/' onClick={logUserOut}>Log Out</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={Link} to='/signup'>Sign Up</Nav.Link>
                                <Nav.Link href='/login'>Log In</Nav.Link>
                            </>
                        )}
                    </Nav>
                    <Nav>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}