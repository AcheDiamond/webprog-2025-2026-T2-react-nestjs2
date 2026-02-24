import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  console.log("SUPABASE_URL:", process.env.SUPABASE_URL);
  console.log("SUPABASE_ANON_KEY loaded?:", !!process.env.SUPABASE_ANON_KEY);
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: true,
  credentials: true,
});
  app.setGlobalPrefix('api'); // so /api/guestbook works locally

  const port = Number(process.env.PORT) || 3000;
  await app.listen(port);

  console.log(`✅ Backend running at http://localhost:${port}/api`);
}

// Only start a local HTTP server when NOT running on Vercel
if (!process.env.VERCEL) {
  bootstrap();
}