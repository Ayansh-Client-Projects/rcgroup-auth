import { CustomerEntity } from './../entity/customer.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(CustomerEntity)
export class CustomerRepository extends Repository<CustomerEntity> {}
