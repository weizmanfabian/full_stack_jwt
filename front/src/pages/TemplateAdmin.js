import React from 'react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import './Home.css';

const TemplateAdmin = ({ children }) => (
  <>
    <Navbar />
    <div className="main container-fluid" style={{ marginTop: '68px' }}>
      <div className="row">
        <Sidebar />
        <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
          {children}
        </main>
      </div>
    </div>
  </>
);

export default TemplateAdmin;
