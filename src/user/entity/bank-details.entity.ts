import { Column, Entity } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('bank_details')
export class BankDetailsEntity extends BaseEntity {
  @Column({ name: 'account_holder_name' })
  accountHolderName: string;

  @Column({ name: 'ifsc_code' })
  ifscCode: string;

  @Column({ name: 'account_number', unique: true })
  accountNumber: number;
}
