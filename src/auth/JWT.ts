import path from 'path';
import { readFile } from 'fs';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';
import { InternalError } from '../core/api-errors';
// import Logger from './Logger';

export default class JWT {
  static getPublicKey(): Promise<string> {
    return promisify(readFile)(path.join(__dirname, '../../keys/public.pem'), 'utf8');
  }

  private static readPrivateKey(): Promise<string> {
    return promisify(readFile)(path.join(__dirname, '../../keys/private.pem'), 'utf8');
  }

  public static async createToken(payload: any): Promise<string> {
    const cert = await this.readPrivateKey();
    if (!cert) throw new InternalError('Token generation failure');
    // @ts-ignore
    return promisify(sign)({ ...payload }, cert, {
      algorithm: 'RS256',
      expiresIn: 10 * 24 * 60 * 60 /*10 days*/,
    });
  }
}
