import React, { useState } from 'react'
import Home from './Home';

const Login = () => {

    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [loginSuccessful, setLoginSuccessful] = useState(false);



    const handleLogin = (e) =>{
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
            body: JSON.stringify(data)
        })
            .then(response=> response.json())
            .then(result => {
                console.log(result)
                if(result.token){
                    localStorage.setItem('token', result.token)
                    setLoginSuccessful(true);
                } else {
                    setLoginSuccessful(false);
                }
            })
            .catch(error =>{
                console.log(error)
            })
    }

    return (loginSuccessful ? <Home /> : 
    <>
        <div className='w-50 container'>
            <form className='container w-50' onSubmit={handleLogin}>
                <div className="row">
                    <img className="mb-4 m-auto " src="/login.png" alt="" width="72" />
                </div>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>

                <div className="form-floating">
                    <input onChange={(e) => setUsername(e.target.value)} type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input onChange={(e) => setPassword(e.target.value)} type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="checkbox mb-3">
                    <label>
                        <input type="checkbox" value="remember-me" /> Recordarme
                    </label>
                </div>
                <button className="w-100 btn btn-lg btn-primary" type="submit">Iniciar sesión</button>
                <p className="mt-5 mb-3 text-muted">&copy; 2024</p>
            </form>
        </div>
    </>
    )
}

export default Login
