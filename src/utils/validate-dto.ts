import { ValidationError } from '@nestjs/common';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

/**
 *
 * Validate the payload will be sending or receiving, make sure the data is suitable
 *
 * @param dto The DTO object to validate
 * @param obj The object recieved from response body
 *
 * @example
 * ```ts
 *  await validateDto(EmployeeDTO, response.data.employee);
 *
 * ```
 */
export const validateDto = async <T extends ClassConstructor<any>>(
  dto: T,
  obj: object,
): Promise<ValidationError[]> => {
  // tranform the literal object to class object
  const objInstance = plainToInstance(dto, obj);
  // validating and check the errors, throw the errors if exist
  return validate(objInstance);
};
