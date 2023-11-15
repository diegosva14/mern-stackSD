import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Navigation from './components/Navigation';
import NotesList from './components/NotesList';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import SignUp from './components/SignUp';
import Login from './components/Login';


function App() {
  return (
    
    <Router>
    

    
    <Route path="/" exact component={SignUp} />
    <Route path="/login" component={Login} />
    
    <div className="container p-4">
    
      <Navigation/>
      <Route path={"/edit/:id"} component={CreateNote} />
      <Route path="/create" component={CreateNote} />
      <Route path="/notes" component={NotesList} />
      <Route path="/user" component={CreateUser} />
      
      
      </div>
    </Router>
  );
}
export default App;
