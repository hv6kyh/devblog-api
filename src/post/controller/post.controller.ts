import { Body, Controller, Get, Param, Post, Query, Put, Logger } from '@nestjs/common';
import { Auth } from '../../shared/decorators/auth.decorator';
import { CreateRequest } from '../dto';
import { GetAllRequest } from '../dto/get-all.request';
import { PostService } from '../service/post.service';

@Controller('post')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(private readonly postService: PostService) {}

  @Auth()
  @Post()
  public createPost(@Body() dto: CreateRequest) {
    return this.postService.createPost(dto);
  }

  @Get()
  public getPosts(@Query() dto: GetAllRequest) {
    return this.postService.getPosts(dto);
  }

  @Get(':post_id')
  public getPost(@Param('post_id') postId: string) {
    return this.postService.getPost({ postId });
  }

  @Auth()
  @Put(':post_id')
  public updatePost(@Param('post_id') postId: string, @Body() body: { title: string; content: string }) {
    return this.postService.updatePost({
      post_id: postId,
      ...body,
    });
  }
}
