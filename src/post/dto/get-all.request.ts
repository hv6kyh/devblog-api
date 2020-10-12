import { IsNotEmpty, IsString } from 'class-validator';

export class GetAllRequest {
  @IsNotEmpty()
  @IsString()
  category: string;
}
