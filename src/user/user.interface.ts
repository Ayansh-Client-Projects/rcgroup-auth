import { FindConditions } from 'typeorm';
import { UserDto, UserEntity } from './user.type';

export interface UserInterface<E extends UserEntity, U extends UserDto> {
  getUser(condition: FindConditions<E>): Promise<E>;
  getUserByAuthId(authId: string): Promise<U>;
  getUserById(id: string): Promise<U>;
  updateUser(user: U): Promise<U>;
}
