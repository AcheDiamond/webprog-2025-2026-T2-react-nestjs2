import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { GuestbookService } from './guestbook.service';

@Controller('guestbook')
export class GuestbookController {
  constructor(private readonly service: GuestbookService) {}

  @Get()
  getAll() {
    return this.service.list();
  }

  @Post()
  create(@Body() dto: { name: string; message: string }) {
    return this.service.create(dto.name, dto.message);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() dto: { name: string; message: string },
  ) {
    return this.service.update(id, dto.name, dto.message);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}