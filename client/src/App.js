import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";
import { useSelector } from "react-redux";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import PostDetails from "./components/PostDetails/PostDetails";

const App = () => {
  const user = useSelector((state) => state?.auth?.authData);

  return (
    <GoogleOAuthProvider clientId="692557213644-uhk5ngnfppk49jgl9oraarmdqdk3g9fk.apps.googleusercontent.com"> 
    <BrowserRouter>
      <Container maxWidth="xl">
        <Navbar />
        <Routes >
          <Route path='/' exact element={<Navigate to="/posts" />} />
          <Route path="/posts" exact element={<Home/>}/>
          <Route path="/posts/search" exact element={<Home/>}/>
          <Route path="/posts/:id"  element={<PostDetails/>}/>
          <Route path='/auth' exact element={(!user ? <Auth/> : <Navigate to="/posts" />)}/>
        </Routes>
      </Container>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
  
  };

export default App;
