import { model, Schema, Document } from 'mongoose';
import { User } from './User';

export interface Portfolio extends Document {
  user: User;
  assets: Asset[];
}

export interface Asset extends Document {
  type: string;
  ticker: string;
  quantity: string;
}

export const assetSchema = new Schema(
  {
    type: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    ticker: {
      type: Schema.Types.String,
      required: true,
      trim: true,
    },
    quantity: {
      type: Schema.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: true },
)

const portfolioSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    assets: [
      {
        type: assetSchema
      },
    ],
  },
  { timestamps: true },
);

export const PortfolioModel = model<Portfolio>('Portfolio', portfolioSchema, 'portfolios');
