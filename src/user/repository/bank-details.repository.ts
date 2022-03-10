import { Repository, EntityRepository } from 'typeorm';
import { BankDetailsEntity } from '../entity/bank-details.entity';

@EntityRepository(BankDetailsEntity)
export class BankDetailsRepository extends Repository<BankDetailsEntity> {}
