import Account from '../models/Account.js';
import { nanoid } from 'nanoid';

export const createAccount = async (req, res) => {
    try {
        console.log(req.user)
      const account = new Account({
        user: req.user.id,
        accountNumber:  Math.floor(1000000000 + Math.random() * 9000000000), // or generate however you prefer
        accountType: req.body.accountType || 'checking',
        balance: req.body.balance
      });
  
      const newaccount = await account.save();
      res.status(201).json({account:newaccount});
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };

  export const getAccounts = async (req, res) => {
    try {
      const accounts = await Account.find({ user: req.user.id });
      res.json(accounts);
    } catch (error) {
      res.status(500).json({ message: 'Server Error', error });
    }
  };