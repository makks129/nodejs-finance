import { model, Schema, Document } from 'mongoose';
import { Asset, assetSchema } from './Portfolio';
import { User } from './User';

export interface Transaction extends Document {
  user: User;
  asset: Asset;
}

const transactionSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    asset: assetSchema,
  },
  { timestamps: true },
);

export const TransactionModel = model<Transaction>(
  'Transaction',
  transactionSchema,
  'transactions',
);
