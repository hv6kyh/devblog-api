import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class UpdateRequest {
  @IsNotEmpty()
  @IsUUID()
  post_id: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
