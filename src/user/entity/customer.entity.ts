import { Column, Entity } from 'typeorm';
import { UserEntity } from './user.entity';
import { CompanyTypeEnum } from '../enum/company-type.enum';

@Entity('customer')
export class CustomerEntity extends UserEntity {
  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'company_type', type: 'varchar' })
  companyType: CompanyTypeEnum;

  @Column({ name: 'gst_number', unique: true })
  gstNumber: string;

  @Column({ name: 'aadhaar_number', unique: true })
  aadhaarNumber: string;
}
