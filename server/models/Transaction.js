import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true,
  },
  type: {
    type: String,
    enum: ['deposit', 'withdrawal', 'transfer'],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    default: '',
  },
  // For transfers
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
  },
}, {
  timestamps: true,
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
