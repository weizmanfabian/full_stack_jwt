import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthProvider';
import Swal from 'sweetalert2'

const Login = () => {
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const { login, setTimeIntervalRefreshToken } = useAuth();

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            username: username,
            password: password
        };
        fetch('http://localhost:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
            credentials: 'include' // Esto asegura que las cookies se envíen con la solicitud
        })
            .then(response => response.json())
            .then(result => {
                const { isLogged, timeRefreshToken, body } = result;
                if (isLogged) {
                    login();
                    setTimeIntervalRefreshToken(timeRefreshToken)
                    //Cookies.set('accessToken', result.accessToken); // Guardar el token en las cookies
                    navigate('/app/home');
                } else {
                    Swal.fire({
                        title: 'Error!',
                        text: body,
                        icon: 'error',
                        confirmButtonText: 'Ok'
                    })
                }
            })
            .catch(error => {
                console.error('Login fallido catch');

            });
    };

    return (
        <div className='container d-flex justify-content-center align-items-center min-vh-100'>
            <form className='w-100' onSubmit={handleLogin} style={{ maxWidth: '400px' }}>
                <div className="text-center">
                    <img className="mb-4" src="/login.png" alt="" width="72" />
                </div>
                <h1 className="h3 mb-3 fw-normal text-center">Inicia sesión para continuar</h1>
                <div className="form-floating mb-3">
                    <input onChange={(e) => setUsername(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" required />
                    <label htmlFor="floatingInput">Correo electrónico</label>
                </div>
                <div className="form-floating mb-3">
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" required />
                    <label htmlFor="floatingPassword">Contraseña</label>
                </div>
                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Recordarme
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Iniciar sesión</button>
                <p className="mt-5 mb-3 text-muted text-center">&copy; 2024</p>
            </form>
        </div>
    );
};

export default Login;
