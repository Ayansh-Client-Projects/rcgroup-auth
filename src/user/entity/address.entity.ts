import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('address')
export class AddressEntity extends BaseEntity {
  @Column({ name: 'line_1' })
  line1: string;

  @Column({ name: 'line_2' })
  line2: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column()
  country: string;

  @Column()
  pincode: number;

  @Column({ nullable: true })
  landmark?: string;
}
