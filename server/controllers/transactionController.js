import Account from "../models/Account.js";
import Transaction from "../models/Transaction.js";


export const depositFunds = async (req, res) => {
  const { accountId, amount, description } = req.body;

  if (!accountId || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid deposit details' });
  }

  try {
    const account = await Account.findOne({ _id: accountId, user: req.user.id });

    if (!account) {
      return res.status(403).json({ message: 'Unauthorized access to account' });
    }

    account.balance += amount;
    await account.save();

    await Transaction.create({
      account: account._id,
      type: 'deposit',
      amount,
      description: description || '',
      toAccount: account._id
    });

    res.status(200).json({ message: 'Deposit successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


export const withdrawFunds = async (req, res) => {
    const { accountId, amount, description } = req.body;
  
    if (!accountId || !amount || amount <= 0) {
      return res.status(400).json({ message: 'Invalid withdrawal details' });
    }
  
    try {
      const account = await Account.findOne({ _id: accountId, user: req.user.id });
  
      if (!account) {
        return res.status(403).json({ message: 'Unauthorized access to account' });
      }
  
      if (account.balance < amount) {
        return res.status(400).json({ message: 'Insufficient balance' });
      }
  
      account.balance -= amount;
      await account.save();
  
      await Transaction.create({
        account: account._id,
        type: 'withdrawal',
        amount,
        description: description || '',
        toAccount: null
      });
  
      res.status(200).json({ message: 'Withdrawal successful' });
    } catch (err) {
      res.status(500).json({ message: 'Server error', error: err.message });
    }
};

export const transferFunds = async (req, res) => {
  const { fromAccountId, toAccountNumber, amount, description } = req.body;

  if (!fromAccountId || !toAccountNumber || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid transfer details' });
  }

  try {
    // Fetch both accounts
    const fromAccount = await Account.findById(fromAccountId);
    const toAccount = await Account.findOne({ accountNumber: toAccountNumber });

    if (!fromAccount) {
      return res.status(404).json({ message: 'From account not found' });
    }

    if (!toAccount) {
      return res.status(404).json({ message: 'Recipient account not found' });
    }

    // Check ownership manually
    if (fromAccount.user.toString() !== req.user.id.toString()) {
      return res.status(403).json({ message: 'You do not own the source account' });
    }

    // Prevent self-transfer
    if (fromAccount.accountNumber === toAccount.accountNumber) {
      return res.status(400).json({ message: 'Cannot transfer to the same account' });
    }

    // Check balance
    if (fromAccount.balance < amount) {
      return res.status(400).json({ message: 'Insufficient balance' });
    }

    // Do the transfer
    fromAccount.balance -= amount;
    toAccount.balance += amount;

    await fromAccount.save(); // ✅ now guaranteed to be a Mongoose instance
    await toAccount.save();

    // Log transaction
    await Transaction.create({
      account: fromAccount._id,
      type: 'transfer',
      amount,
      description: description || '',
      toAccount: toAccount._id
    });

    res.status(200).json({ message: 'Transfer successful' });

  } catch (err) {
    console.error('[Transfer Error]', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const userAccounts = await Account.find({ user: req.user.id }).select('_id');
    const accountIds = userAccounts.map(a => a._id);
console.log(accountIds)
console.log("User ID:", req.user.id);
console.log("User's accounts:", accountIds);

    const transactions = await Transaction.find({ account: { $in: accountIds } })
      .sort({ createdAt: -1 });
console.log(transactions)
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};
 
export const getAccountTransactions = async (req,res)=>{
  const {accountId} = req.params;
  try{
    const account = await Account.findOne({_id:accountId,user:req.user.id})
    if(!account){
      res.status(403).json({message:"Unauthorized access to account"})
    }
    const transactions = await Transaction.find({account:accountId}).sort({createdAt:-1});
    res.json(transactions)
  }
  catch(err){
    res.status(500).json({message:"Server error",error:err.message})
  }
}