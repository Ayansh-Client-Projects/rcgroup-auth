import { SalesmanEntity } from './../entity/salesman.entity';
import { Repository, EntityRepository } from 'typeorm';

@EntityRepository(SalesmanEntity)
export class SalesmanRepository extends Repository<SalesmanEntity> {}
