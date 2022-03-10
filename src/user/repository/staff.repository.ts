import { Repository, EntityRepository } from 'typeorm';
import { StaffEntity } from '../entity/staff.entity';

@EntityRepository(StaffEntity)
export class StaffRepository extends Repository<StaffEntity> {}
