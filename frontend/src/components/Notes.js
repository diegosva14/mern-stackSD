import React from 'react'
import Header from './notes/Nav'
import Home from './notes/Home'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'

import Profile from './Profile';

import {BrowserRouter as Router, Route} from 'react-router-dom'

export default function Notes({setIsLogin,userInfo}) {
    return (
        <Router>
        <div className="notes-page">
            <Header setIsLogin={setIsLogin} userInfo={userInfo} />
            <section>
                <Route path="/" component={Home} exact />
                <Route path="/create" component={CreateNote} exact />
                <Route path="/edit/:id" component={EditNote} exact />
                <Route path="/profile" component={Profile} />
                
            </section>
            
        </div>
        </Router>
    )
}
