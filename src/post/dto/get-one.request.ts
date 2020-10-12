import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetOneRequest {
  @IsNotEmpty()
  @IsUUID()
  postId: string;
}
