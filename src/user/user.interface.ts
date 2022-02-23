import { User } from './user.type';

export interface UserInterface {
  getUser(): User;
  getUserById(id: string): User;
}
