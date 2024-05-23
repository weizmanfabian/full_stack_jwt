import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import UploadImage from '../pages/UploadImage';

const AplicationRoute = () => {
    return (
        <Routes>
            <Route path="home" element={<Home />} />
            <Route path='uploadImage' element={<UploadImage />} />
        </Routes>
    );
}

export default AplicationRoute;
