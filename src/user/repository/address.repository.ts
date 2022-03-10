import { AddressEntity } from './../entity/address.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(AddressEntity)
export class AddressRepository extends Repository<AddressEntity> {}
