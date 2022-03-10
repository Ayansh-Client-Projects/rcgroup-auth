import { BankDetailsEntity } from './../../entity/bank-details.entity';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';

@Entity('salesman')
export class SalesmanEntity extends UserEntity {
  @Column({ name: 'pan_number' })
  panNumber: string;

  @Column({ name: 'aadhaar_number' })
  aadhaarNumber: string;

  @Column({ name: 'bank_details_id' })
  bankDetailsId: string;

  @OneToOne(() => BankDetailsEntity, {
    nullable: false,
    eager: true,
  })
  @JoinColumn({ name: 'bank_details_id' })
  bankDetails: BankDetailsEntity;
}
