import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const App = () => (
  <GoogleOAuthProvider clientId="692557213644-uhk5ngnfppk49jgl9oraarmdqdk3g9fk.apps.googleusercontent.com"> 
  <BrowserRouter>
    <Container maxWidth="lg">
      <Navbar />
      <Routes >
        <Route path='/' exact element={<Home/>} />
        <Route path='/auth' exact element={<Auth/>}/>
      </Routes>
    </Container>
  </BrowserRouter>
  </GoogleOAuthProvider>
);

export default App;
