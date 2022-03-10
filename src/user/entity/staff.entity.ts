import { BankDetailsEntity } from './bank-details.entity';
import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { UserEntity } from './user.entity';

@Entity('staff')
export class StaffEntity extends UserEntity {
  @Column({ name: 'pan_number', unique: true })
  panNumber: string;

  @Column({ name: 'aadhaar_number', unique: true })
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
