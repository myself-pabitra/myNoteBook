import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
    const [credencials, setcredencials] = useState({ name: "", username: "", email: "", password: "", cpassword: "" })
    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault()
        const{name,username,email,password} = credencials;
        const response = await fetch('http://localhost:5000/api/auth/createuser', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: JSON.stringify({ name,username,email,password})
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            console.log(localStorage.getItem('token', json.authToken));
            props.showAlert("Account created Successfully","success")
            navigate('/')

        } else {
            props.showAlert("Please enter valid details","danger")

        }
    }
    const onchange = (e) => {
        setcredencials({ ...credencials, [e.target.name]: e.target.value })
    }

    return (
        <div className='container shadow-lg mt-4' style={{ maxWidth: "550px" }}>
            <form onSubmit={handleSubmit}>
                <h3 className='text-warning text-center p-2'>Create a new Account Here !</h3>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" id="name" name='name' aria-describedby="emailHelp" onChange={onchange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="username" className="form-control" id="username" name='username' aria-describedby="emailHelp" onChange={onchange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" id="email" name='email' aria-describedby="emailHelp" onChange={onchange} />

                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                    <input type="password" className="form-control" id="password" name='password' onChange={onchange} minLength={8} required/>
                </div >
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" id="cpassword" name='cpassword' onChange={onchange} minLength={8} required/>
                </div >
                <div className="d-grid gap-2 col-6 mx-auto p-3">
                    <button type="submit" className="btn btn-warning p-2" >Create Account</button>
                </div>
            </form>
        </div>
    )
}

export default Signup
