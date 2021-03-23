import { model, Schema, PassportLocalDocument, PassportLocalModel } from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

export interface User extends PassportLocalDocument {
  name: string;
  email?: string;
  profilePicUrl?: string;
  verified?: boolean;
  status?: boolean;
}

// Need to use PassportLocalDocument and PassportLocalModel in order to obtain methods provided by passport-local-mongoose
// See also: https://medium.com/@agentwhs/complete-guide-for-typescript-for-mongoose-for-node-js-8cc0a7e470c1
interface UserModel extends PassportLocalModel<User> {
}

const userSchema = new Schema(
  {
    // username and password are provided by passport-local-mongoose
    name: {
      type: Schema.Types.String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    email: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      trim: true,
    },
    profilePicUrl: {
      type: Schema.Types.String,
      trim: true,
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.plugin(passportLocalMongoose);

export const UserModel = model<User, UserModel>('User', userSchema, 'users');
