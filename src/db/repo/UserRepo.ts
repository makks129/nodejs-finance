import { Types } from 'mongoose';
import { User, UserModel } from '../model/User';

export default class UserRepo {
  public static create(
    email: string,
    password: string,
    name: string,
    profilePicUrl?: string,
  ): Promise<User> {
    const user = new UserModel({
      username: email,
      email: email,
      name: name,
      profilePicUrl: profilePicUrl,
    });
    return new Promise((resolve, reject) => {
      UserModel.register(user, password, (err, user) => {
        if (err) reject(err);
        else resolve(user);
      });
    });
  }

  public static findByEmail(email: string): Promise<User | null> {
    return UserModel.findOne({ email: email, status: true }).lean<User>().exec();
  }

  public static findById(id: string): Promise<User | null> {
    return UserModel.findOne({ _id: Types.ObjectId(id), status: true })
      .lean<User>()
      .exec();
  }
}
