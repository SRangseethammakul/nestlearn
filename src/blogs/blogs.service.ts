import { Injectable } from '@nestjs/common';

@Injectable()
export class BlogsService {
  getBlog() {
    return {
      message: 'blog services',
    };
  }
}
