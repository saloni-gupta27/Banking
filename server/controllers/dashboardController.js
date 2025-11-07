import Account from "../models/Account.js"
import Transaction from "../models/Transaction.js";

export const getDashboardSummary = async (req,res)=>{
    try{
        const accounts = await Account.find({user:req.user.id})
        const totalAccounts = accounts.length;
        const totalBalance = accounts.reduce((sum,acc)=> sum +acc.balance,0);
        const accountIds = accounts.map(acc => acc._id)

        const recentTransactions = await Transaction.find({
            account: {$in:accountIds}
        }).sort({createdAt: -1}) .limit(5);
        res.json({
            totalAccounts,totalBalance,recentTransactions
        })
    }
    catch(err){
        res.status(500).json({message:"Server error",error:err.message})
    }
}