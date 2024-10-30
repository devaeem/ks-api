import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): { id: number; name: string }[] {
    const res = [
      {
        id: 1,
        name: '2',
      },
    ];
    return res;
  }
}
