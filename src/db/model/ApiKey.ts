import { Schema, model, Document } from 'mongoose';

export default interface ApiKey extends Document {
  key: string;
  version: number;
  metadata: string;
  status?: boolean;
}

const schema = new Schema(
  {
    key: {
      type: Schema.Types.String,
      required: true,
      unique: true,
      maxlength: 1024,
    },
    version: {
      type: Schema.Types.Number,
      required: true,
      min: 1,
      max: 100,
    },
    metadata: {
      type: Schema.Types.String,
      required: true,
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

export const ApiKeyModel = model<ApiKey>('ApiKey', schema, 'api_keys');
