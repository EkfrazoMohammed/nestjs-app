import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { status: string; message: string; data: string[] } {
    return {
      status: 'success',
      message: 'Hello Tayib!',
      data: ['Item 1', 'Item 2', 'Item 3']
    };
  }

  getHello1(): { status: string; message: string; data: Array<{ status: string; message: string; data: string[] }> } {
    return {
      status: 'success',
      message: 'Hello Tayib1!',
      data: [
        {
          status: 'success',
          message: 'Hello Tayib1!',
          data: ['Item A', 'Item B', 'Item C']
        },
        {
          status: 'success',
          message: 'Hello Tayib1!',
          data: ['Item D', 'Item E', 'Item F']
        }
      ]
    };
  }
}
