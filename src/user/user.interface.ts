import { FindConditions } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { UserEntity } from './entity/user.entity';

export interface UserInterface<E extends UserEntity, U extends UserDto, C> {
  getUser(condition: FindConditions<E>): Promise<E>;
  getUserByAuthId(authId: string): Promise<U>;
  getUserById(id: string): Promise<U>;
  updateUser(user: U): Promise<U>;
  createUser(createUser: C): Promise<void>;
}
