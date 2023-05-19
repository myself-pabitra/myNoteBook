import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const [credencials, setcredencials] = useState({ email: "", password: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        // fetch()
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ email:credencials.email, password:credencials.password })
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the auth token and redirect
           localStorage.setItem('token',json.authToken);
        //    console.log("login page" + localStorage.getItem('token',json.authToken));
            props.showAlert("Logged in to your account Successfully.","success")
            navigate('/')

        }else{
            props.showAlert("Invalid login credencials","danger")
        }
    }
    const onchange = (e) => {
        setcredencials({ ...credencials, [e.target.name]: e.target.value })
    }
    return (
        <div className='container shadow-lg mt-5' style={{ maxWidth: "550px" }}>
            <form onSubmit={handleSubmit}>
                <h3 className='text-warning text-center p-2'>Login to your account</h3>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" value={credencials.email} onChange={onchange}/>
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' value={credencials.password} onChange={onchange}/>
                </div >
                <div className="d-grid gap-2 col-6 mx-auto p-3">
                    <button type="submit" className="btn btn-warning p-2" >Login to your Account</button>
                </div>
            </form>
        </div>
    )
}

export default Login
