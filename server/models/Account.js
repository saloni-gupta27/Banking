import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  accountNumber: {
    type: String,
    unique: true,
    required: true,
  },
  accountType: {
    type: String,
    enum: ['checking', 'savings'],
    default: 'checking',
  },
  balance: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Account = mongoose.model('Account', accountSchema);

export default Account;
