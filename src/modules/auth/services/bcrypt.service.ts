import { Injectable } from '@nestjs/common';
import { HashingService } from '@modules/auth/services/hashing.abstract.service';
import { genSalt, compare, hash } from 'bcrypt';

@Injectable()
export class BcryptService implements HashingService {
  async hash(data: string | Buffer) {
    try {
      const salt = await genSalt(12);
      return hash(data, salt);
    } catch (error) {
      throw new Error(error);
    }
  }

  async compare(data: string | Buffer, encrypted: string): Promise<boolean> {
    return compare(data, encrypted);
  }
}
