import { Entity } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('admin')
export class AdminEntity extends UserEntity {}
