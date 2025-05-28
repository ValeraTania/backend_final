interface IUser {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: Role;
}
export enum Role {
  ADMIN = 'admin',
  USER = 'user',
}

export default IUser;
