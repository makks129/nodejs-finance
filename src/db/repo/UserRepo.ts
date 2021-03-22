// import User, { UserModel } from '../model/User';
import { InternalError } from '../../core/api-errors';
import { Types } from 'mongoose';
import { User, UserModel } from '../model/User';
import { promisify } from 'util';

export default class UserRepo {
  // public static findById(id: Types.ObjectId): Promise<User | null> {
  //   return UserModel.findOne({ _id: id, status: true })
  //     .select('+email +password +roles')
  //     .populate({
  //       path: 'roles',
  //       match: { status: true },
  //     })
  //     .lean<User>()
  //     .exec();
  // }

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
    return UserModel.findOne({ _id: Types.ObjectId(id), status: true }).lean<User>().exec();
  }

  //   public static findProfileById(id: Types.ObjectId): Promise<User | null> {
  //     return UserModel.findOne({ _id: id, status: true })
  //       .select('+roles')
  //       .populate({
  //         path: 'roles',
  //         match: { status: true },
  //         select: { code: 1 },
  //       })
  //       .lean<User>()
  //       .exec();
  //   }

  //   public static findPublicProfileById(id: Types.ObjectId): Promise<User | null> {
  //     return UserModel.findOne({ _id: id, status: true }).lean<User>().exec();
  //   }

  //   public static async create(
  //     user: User,
  //     accessTokenKey: string,
  //     refreshTokenKey: string,
  //     roleCode: string,
  //   ): Promise<{ user: User; keystore: Keystore }> {
  //     const now = new Date();

  //     const role = await RoleModel.findOne({ code: roleCode })
  //       .select('+email +password')
  //       .lean<Role>()
  //       .exec();
  //     if (!role) throw new InternalError('Role must be defined');

  //     user.roles = [role._id];
  //     user.createdAt = user.updatedAt = now;
  //     const createdUser = await UserModel.create(user);
  //     const keystore = await KeystoreRepo.create(createdUser._id, accessTokenKey, refreshTokenKey);
  //     return { user: createdUser.toObject(), keystore: keystore };
  //   }

  //   public static async update(
  //     user: User,
  //     accessTokenKey: string,
  //     refreshTokenKey: string,
  //   ): Promise<{ user: User; keystore: Keystore }> {
  //     user.updatedAt = new Date();
  //     await UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
  //       .lean()
  //       .exec();
  //     const keystore = await KeystoreRepo.create(user._id, accessTokenKey, refreshTokenKey);
  //     return { user: user, keystore: keystore };
  //   }

  //   public static updateInfo(user: User): Promise<any> {
  //     user.updatedAt = new Date();
  //     return UserModel.updateOne({ _id: user._id }, { $set: { ...user } })
  //       .lean()
  //       .exec();
  //   }
}
