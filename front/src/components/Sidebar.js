import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faPlusCircle, faFileAlt } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav id="sidebarMenu" className="navbar col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
            <div className="position-sticky pt-3">
                <ul className="nav flex-column">
                    <li className="nav-item">
                        <Link className="nav-link active text-dark" to={'/app/home'}>
                            <FontAwesomeIcon icon={faHome} className="me-2" />
                            Dashboard
                        </Link>
                    </li>
                    
                </ul>

                <h6 className="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted">
                    <span>Reportes</span>
                    <Link className="link-secondary" to={'#'} aria-label="Add a new report">
                        <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
                    </Link>
                </h6>
                <ul className="nav flex-column mb-2">
                    <li className="nav-item">
                        <Link className="nav-link text-dark"  to="/app/uploadImage">
                            <FontAwesomeIcon icon={faFileAlt} className="me-2" />
                            Cargar Imagen
                        </Link>
                    </li>

                </ul>
            </div>
        </nav>
    );
};

export default Sidebar;
