import { Controller, Get } from '@nestjs/common';
import { BlogsService } from './blogs.service';

@Controller({ version: '1', path: 'blogs' })
export class BlogsController {
  constructor(private readonly blogsService: BlogsService) {}

  @Get()
  findAll() {
    return this.blogsService.getBlog();
  }
}
