import React, { useState } from 'react'
import styles from '../css/LoginPage.module.css'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const RegisterPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try{
            console.log(fullName)
            const res = await axios.post
            ('http://localhost:8080/api/auth/register',{fullName,email,password});
            login(res.data.token)
            navigate('/');
        }
        catch(err){
            setError(err.response?.data?.message||'Registration Failed');
        }
    }
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Register</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          className={styles.input}
        />
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
        <button type="submit" className={styles.button}>Register</button>
      </form>
    </div>
  )
}

export default RegisterPage
