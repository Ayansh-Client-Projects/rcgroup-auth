import { User } from './user.type';

export interface UserInterface {
  getUserByAuthId(authId: string): User;
  getUserById(id: string): User;
  updateUser(user: User): User;
}
