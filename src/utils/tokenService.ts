import jwt, { Secret } from 'jsonwebtoken';
import IUser from '../interfaces/userInterface.js';
import dotenv from 'dotenv';
dotenv.config();

class TokenService {
  private readonly secretKey: Secret = process.env.SECRET_ACCESS_TOKEN || '';
  generateAccessToken(user: IUser): string {
    const payload = {
      id: user._id,
      email: user.email,
      name: user.username,
      roles: user.role,
    };

    const accessToken = jwt.sign(payload, this.secretKey, { expiresIn: '1d' });
    return accessToken;
  }

  validateAccessToken(token: string): any {
    try {
      const userPayload = jwt.verify(token, this.secretKey);
      return userPayload;
    } catch (error) {
      return null;
    }
  }
}

export default new TokenService();
