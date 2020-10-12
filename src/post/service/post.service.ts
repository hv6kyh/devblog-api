/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable, Logger } from '@nestjs/common';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { v4 as uuidv4 } from 'uuid';
import { DynamoDbService } from '../../shared/repository/dynamo-db.service';
import { CreateRequest, UpdateRequest, GetAllRequest, GetOneRequest } from '../dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  private readonly tableName = 'post';

  constructor(private readonly dynamoDbService: DynamoDbService) {}

  public async createPost(dto: CreateRequest): Promise<DocumentClient.AttributeMap> {
    const { Attributes } = await this.dynamoDbService.put({
      TableName: this.tableName,
      Item: {
        post_id: uuidv4(),
        category: dto.category,
        title: dto.title,
        author: dto.author,
        content: dto.content,
        reg_dt: new Date().getTime(),
      },
    });
    return Attributes;
  }

  public async updatePost(dto: UpdateRequest) {
    const { Attributes } = await this.dynamoDbService.update({
      TableName: this.tableName,
      Key: {
        post_id: dto.post_id,
      },
      UpdateExpression: 'set title = :t, content = :c',
      ExpressionAttributeValues: {
        ':t': dto.title,
        ':c': dto.content,
      },
      ReturnValues: 'UPDATED_NEW',
    });
    return Attributes;
  }

  public async getPosts(dto: GetAllRequest) {
    // 스캔 어케 하는겨..
    const { Items, Count } = await this.dynamoDbService.scan({
      TableName: this.tableName,
      FilterExpression: 'category = :ctg',
      ExpressionAttributeValues: {
        ':ctg': dto.category,
      },
      ProjectionExpression: 'title, post_id, reg_dt',
    });
    return Items.sort((a, b) => b.reg_dt - a.reg_dt);
  }

  public async getPost(dto: GetOneRequest) {
    const { Item } = await this.dynamoDbService.get({
      TableName: this.tableName,
      Key: {
        post_id: dto.postId,
      },
    });
    return Item;
  }
}
