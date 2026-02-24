import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('api/guestbook')
export class GuestbookController {
  constructor(private readonly svc: GuestbookService) {}

  @Get()
  list() {
    return this.svc.list();
  }

  @Post()
  create(@Body() body: { name: string; message: string }) {
    return this.svc.create(body.name, body.message);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string; message: string }) {
    return this.svc.update(id, body.name, body.message);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.svc.remove(id);
  }
}