import CardListAssembler from "../dinamic_modules/CardListAssembler";
import { useState } from 'react'
import './decks.css'
import Navbar from '../modules/Navbar'
import DeckSearchModule from '../assembled_modules/DeckSearchModule';
import ColorFilterModule from '../assembled_modules/ColorFilterModule';
import Divider from '../assembled_modules/Divider';
import DeckListAssembler from '../dinamic_modules/DeckListAssembler';
import { useUserAuth } from '../context/UserAuthContext';
import { Button } from 'react-bootstrap';

function Cards(){
    const {user, logOut} = useUserAuth();
    console.log(user);
    const handleLogout = async () => {
        try {
        await logOut();
        }catch (err) {
        console.log(err.message);
        }
    }

    return (
        <div className="Decks">
        <Navbar />
        <h1>Hello <br/> { user && user.email }</h1>
        <div>
            <Button className="gap-2" variant="primary" onClick={handleLogout}>Log Out</Button>
        </div>
        <DeckSearchModule />
        <ColorFilterModule radius={"2.2rem"}/>
        <Divider />
        <CardListAssembler />
        </div>
    )
}

export default Cards