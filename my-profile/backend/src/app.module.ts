import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GuestbookController } from './guestbook.controller';
import { GuestbookService } from './guestbook.service';
import { GuestbookModule } from './guestbook/guestbook.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    GuestbookModule, // ✅ loads .env automatically
  ],
  controllers: [AppController, GuestbookController],
  providers: [AppService, GuestbookService],
})
export class AppModule {}