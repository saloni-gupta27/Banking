import React, { useEffect, useState } from 'react'
import styles from '../css/DashboardPage.module.css';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

const DashboardPage = () => {
    const {user} = useAuth();
    const [accounts, setAccounts] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const fetchDashboardData = async () =>{
    const [accountsRes,transactionRes] = await Promise.all([

    ])
    axios.get('http://localhost:8080/api/accounts',)

  }

  useEffect(()=>{

  },[])

  return (
    <div className={styles.container}>
    <h1 className={styles.heading}>Welcome, {user?.email || 'User'}!</h1>

    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Your Accounts</h2>
      <div className={styles.card}>
        <p>Account Number: 123456789</p>
        <p>Balance: €5000</p>
      </div>
    </div>

    <div className={styles.section}>
      <h2 className={styles.sectionTitle}>Recent Transactions</h2>
      <ul className={styles.transactionList}>
        <li>Deposit - €1000</li>
        <li>Withdrawal - €200</li>
        <li>Transfer - €300</li>
      </ul>
    </div>
  </div>
  )
}

export default DashboardPage
