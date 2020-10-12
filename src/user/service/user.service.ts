import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { DynamoDbService } from '../../shared/repository/dynamo-db.service';
import { LoginRequest, LoginResponse } from '../dto';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(private readonly dynamoDbService: DynamoDbService, private readonly jwtService: JwtService) {}

  public async login(dto: LoginRequest): Promise<LoginResponse> {
    const { Item } = await this.dynamoDbService.get({
      TableName: 'user',
      Key: {
        email: dto.email,
        password: dto.password,
      },
    });

    if (!Item) {
      throw new HttpException('유효하지 않은 사용자', HttpStatus.UNAUTHORIZED);
    }

    const payload = {
      email: Item.email,
      name: Item.name,
      role: Item.role,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
