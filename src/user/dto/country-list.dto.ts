import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class CountryListDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  countries: Array<string>;
}
