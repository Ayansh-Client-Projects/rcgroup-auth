import { AddressEntity } from './address.entity';
import { Column, JoinColumn, OneToOne } from 'typeorm';
import { BaseEntity } from './base.entity';

export abstract class UserEntity extends BaseEntity {
  @Column({ name: 'auth_id' })
  authId: string;

  @Column({ name: 'full_name' })
  fullName: string;

  // @Column({ name: 'email' })
  // email: string;

  @Column({ name: 'address_id' })
  addressId: string;

  @OneToOne(() => AddressEntity, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'address_id' })
  address: AddressEntity;
}
