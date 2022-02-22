import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class StateListDto {
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  states: Array<string>;
}
