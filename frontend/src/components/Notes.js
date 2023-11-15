import React from 'react'
import Header from './Nav'
import Home from './Home'
import CreateNote from './CreateNote'
import EditNote from './EditNote'
import {BrowserRouter as Router, Route} from 'react-router-dom'

export default function Notes({setIsLogin}) {
    return (
        <Router>
        <div className="notes-page">
            <Header setIsLogin={setIsLogin} />
            <section>
                <Route path="/" component={Home} exact />
                <Route path="/create" component={CreateNote} exact />
                <Route path="/edit/:id" component={EditNote} exact />
            </section>
            
        </div>
        </Router>
    )
}