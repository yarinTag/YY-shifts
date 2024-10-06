import { IsNumber, IsOptional, IsUUID } from 'class-validator';

export class FindBy {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsOptional()
  @IsNumber()
  workCycleNumber?: number;
}
