import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { DynamoDB } from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { DynamoConfig } from '../config';

/**
 * dynamoDB CRUD 콜백에서 프로미스로 재정의
 */
@Injectable()
export class DynamoDbService {
  private readonly logger: Logger = new Logger(DynamoDbService.name);
  private readonly dynamoDb: DocumentClient;

  constructor() {
    const config = new DynamoConfig().build();
    this.dynamoDb = new DynamoDB.DocumentClient(config);
  }

  public put(params: DocumentClient.PutItemInput): Promise<DocumentClient.PutItemOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.put(params, (err, data) => {
        if (err) {
          this.logger.log(JSON.stringify(err));
          reject(new HttpException('DB에러', HttpStatus.INTERNAL_SERVER_ERROR));
        }
        resolve(data);
      });
    });
  }

  public scan(params: DynamoDB.DocumentClient.ScanInput): Promise<DocumentClient.ScanOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.scan(params, (err, data) => {
        if (err) {
          this.logger.log(JSON.stringify(err));
          reject(new HttpException('DB에러', HttpStatus.INTERNAL_SERVER_ERROR));
        }
        resolve(data);
      });
    });
  }

  public query(params: DynamoDB.DocumentClient.QueryInput): Promise<DocumentClient.QueryOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.query(params, (err, data) => {
        if (err) {
          this.logger.log(JSON.stringify(err));
          reject(new HttpException('DB에러', HttpStatus.INTERNAL_SERVER_ERROR));
        }
        resolve(data);
      });
    });
  }

  public get(params: DocumentClient.GetItemInput): Promise<DocumentClient.GetItemOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.get(params, (err, data) => {
        if (err) {
          this.logger.log(JSON.stringify(err));
          reject(new HttpException('DB에러', HttpStatus.INTERNAL_SERVER_ERROR));
        }
        resolve(data);
      });
    });
  }

  public update(params: DynamoDB.DocumentClient.UpdateItemInput): Promise<DocumentClient.UpdateItemOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.update(params, (err, data) => {
        if (err) {
          this.logger.log(JSON.stringify(err));
          reject(new HttpException('DB에러', HttpStatus.INTERNAL_SERVER_ERROR));
        }
        resolve(data);
      });
    });
  }

  public delete(params: DynamoDB.DocumentClient.DeleteItemInput): Promise<DocumentClient.DeleteItemOutput> {
    return new Promise((resolve, reject) => {
      this.dynamoDb.delete(params, (err, data) => {
        if (err) {
          this.logger.log(JSON.stringify(err));
          reject(new HttpException('DB에러', HttpStatus.INTERNAL_SERVER_ERROR));
        }
        resolve(data);
      });
    });
  }
}
