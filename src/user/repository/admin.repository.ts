import { AdminEntity } from '../entity/admin.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {}
