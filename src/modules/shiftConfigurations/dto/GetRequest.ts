import { IsUUID } from "class-validator";

export class GetByIdRequest {
    @IsUUID()
    id: string;
  }