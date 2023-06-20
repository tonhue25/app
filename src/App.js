import Layout from './layouts/Layout';
import VerificationPage from './screens/VerificationPage';
import Login from './screens/Login';
import { Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import React from 'react';
import Home from './screens/Home';
import { account, home, verification } from './constant';

function App() {
    const [access, setAccess] = useState(sessionStorage.getItem(account));
    if (!access || access == null) {
        return <Login setAccess={setAccess} />;
    }
    return (
        <Routes>
            <Route path={'/'}>
                <Route path={''} element={<Login />}></Route>
                <Route path={'*'} element={<Login />}></Route>
            </Route>
            <Route path={'/'} element={<Layout />}>
                <Route path={verification} element={<VerificationPage />}></Route>
                <Route path={home} element={<Home />}></Route>
            </Route>
        </Routes>
    );
}

export default App;
