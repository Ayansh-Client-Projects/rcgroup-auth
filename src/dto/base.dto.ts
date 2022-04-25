import { IsDate, IsUUID } from 'class-validator';
export class BaseDto {
  @IsUUID()
  id: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
