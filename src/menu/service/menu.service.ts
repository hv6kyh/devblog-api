import { Injectable } from '@nestjs/common';
import { DynamoDbService } from '../../shared/repository/dynamo-db.service';

@Injectable()
export class MenuService {
  private readonly tableName = 'menu';

  constructor(private readonly dynamoDbService: DynamoDbService) {}

  public async getMenus() {
    const { Items } = await this.dynamoDbService.scan({
      TableName: this.tableName,
    });
    return Items.sort((a, b) => a.order - b.order);
  }
}
