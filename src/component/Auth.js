import React, { useState } from 'react'
import { auth, googleProivder } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

const Auth = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

 console.log(auth?.currentUser?.photoURL);

    const signIn = async () => {
        try {

            await createUserWithEmailAndPassword(auth, email, password)
        } catch (error) {
            console.log(error);
        }
    }

    const signInWithGoggle = async () => {
        try {

            await signInWithPopup(auth , googleProivder)
        } catch (error) {
            console.log(error);
        }
    }
 
     const logout = ()=>{
        signOut(auth)
     }

    return (
        <div>
            <input placeholder='Email...' value={email} onChange={(e) => setEmail(e.target.value)} />
            <input placeholder='Password' type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={signIn}>Sign In</button>
            <button onClick={signInWithGoggle}>Sign In With Goggle</button>
              <button onClick={logout}>Logout</button>
        </div>
    )
}

export default Auth
