import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Admin from './components/Admin';
import User from './components/User';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/admin" element={<Admin />} />
                <Route path="/user" element={<User />} />
            </Routes>
        </Router>
    );
};

export default App;
