import { useState } from "react"

export default function SignupPage(){
    const[username,setUsername]= useState('');
    const[password,setPassword]= useState('');
    async function signup(ev){
        ev.preventDefault();
       
       const response = await fetch('http://localhost:4000/signup',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type':'application/json'},
        });
       if (response.status ===200){
        alert('Sign Up successfull');   
       }else {
        alert('Sign Up failed. Try again after a few minutes!');
       }
        
     }
    return(
        <form action="" className="signup" onSubmit={signup}>
            <h1>Sign up to get started</h1>
            <input type="text" placeholder="username" 
            value={username}
            onChange={ev=>setUsername(ev.target.value)} />
            <input type="password" placeholder="password" 
            value={password} 
            onChange={ev=>setPassword(ev.target.value)} />
            <button class="button-48" role="button-48"><span class="text">Sign Up</span></button>
        </form>
    )
}