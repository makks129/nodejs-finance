import { Asset } from '../model/Portfolio';
import { Transaction, TransactionModel } from '../model/Transaction';
import { User } from '../model/User';

export default class TransactionRepo {
  public static async getAll(user: User): Promise<Transaction[]> {
    return TransactionModel.find({ user: user }).sort('-createdAt');
  }

  public static async add(user: User, asset: Asset): Promise<Transaction> {
    const transaction = {
      user: user,
      asset: asset,
    } as Transaction;
    return TransactionModel.create(transaction);
  }
}
