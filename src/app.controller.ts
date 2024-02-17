import { Controller, Get } from '@nestjs/common';
import { prisma } from './Utils/DbService';
import { AppService } from './app.service';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @Get()
  async getHello() {
    console.log('getHello')
    await prisma.traceSpan.deleteMany()
    return this.appService.getHello();
  }
}
