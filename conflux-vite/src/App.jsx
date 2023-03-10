import { useState } from 'react'
import './App.css'
import Navbar from './modules/Navbar'
import DeckSearchModule from './assembled_modules/DeckSearchModule';
import ColorFilterModule from './assembled_modules/ColorFilterModule';
import Divider from './assembled_modules/Divider';
import DeckListAssembler from './dinamic_modules/DeckListAssembler';
import Decks from './pages/Decks';
import StartPage from './pages/StartPage';
import { Routes, Route } from "react-router-dom";
import { Container, Row, Col } from 'react-bootstrap';
import LoginWindow from './modules/LoginWindow';
import SignupWindow from './modules/SignupWindow';
import { UserAuthContextProvider } from './context/UserAuthContext';
import ProtectedRoute from './modules/ProtectedRoute';
import RedirectIfAuth from './modules/RedirectIfAuth';
import ForgotPasswordForm from './modules/ForgotPasswordForm';
import CardAdderTest from './modules/CardAdderTest';
import MultipleCardTest from './pages/MultipleCardTest';
import BulkDataTest from './pages/BulkDataTest'
import Cards from './pages/Cards';
import QueryServerTest from './pages/QueryServerTest';



function App() {

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <UserAuthContextProvider>
              <Routes>
                <Route path="/bulkdatatest" element={<BulkDataTest />} />
                <Route path="/querytest" element={<QueryServerTest />} />
                <Route path="/multicardtest" element={<MultipleCardTest />} />
                <Route path="/apicalltest" element={<CardAdderTest />} />
                <Route path="/" element={<StartPage />} />
                <Route path="/decks" element={ 
                    <ProtectedRoute>
                      <Decks />
                    </ProtectedRoute>} />
                <Route path="/cards" element={ 
                  <ProtectedRoute>
                    <Cards />
                  </ProtectedRoute>} />
                <Route path="/login" element={
                    <RedirectIfAuth>
                      <LoginWindow />
                    </RedirectIfAuth> }/>
                <Route path="/signup" element={<SignupWindow />} />
                <Route path="/forgotpassword" element={<ForgotPasswordForm />} />
              </Routes>
            </UserAuthContextProvider>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default App
