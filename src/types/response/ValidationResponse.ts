import { ValidationError } from 'class-validator';
export class ValidationResponse {
  success: boolean;
  errors: ValidationError[];
}
