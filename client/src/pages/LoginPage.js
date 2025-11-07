import React, { useState } from 'react'
import styles from '../css/LoginPage.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';


const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
          
            const res = await fetch ('http://localhost:8080/api/auth/login',{
                method:'POST',
                headers :{'Content-Type':'application/json'},
                body: JSON.stringify({email,password})
            })
            const data = await res.json();
            if(!res.ok) {
                throw new Error(data.message || 'Login failed');
            }
            login(data.token);
            navigate('/');
        }
        catch(err){
            setError(err.message)
        }
    }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        <button type="submit" className={styles.button}>Login</button>
      </form>
    </div>
  )
}

export default LoginPage
