import { Entity } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';

@Entity('admin')
export class AdminEntity extends UserEntity {}
