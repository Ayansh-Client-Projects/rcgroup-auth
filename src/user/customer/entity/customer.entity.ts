import { Column, Entity } from 'typeorm';
import { UserEntity } from '../../entity/user.entity';
import { CompanyTypeEnum } from '../../enum/company-type.enum';

@Entity('customer')
export class CustomerEntity extends UserEntity {
  @Column({ name: 'company_name' })
  companyName: string;

  @Column({ name: 'company_type', type: 'varchar' })
  companyType: CompanyTypeEnum;

  @Column({ name: 'gst_number' })
  gstNumber: string;

  @Column({ name: 'aadhaar_number' })
  aadhaarNumber: string;
}
