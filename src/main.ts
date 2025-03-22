import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    session({
      secret: "63dadae5120d7e86be3d8cf7b350e6b8763fe36c", //chave secreta para assinar a sessão
      resave: false, //Evita regravar a sessão se não houver alterações
      saveUninitialized: false, // Não salva sessões não inicializadas
      cookie: {
        maxAge: 1000 * 60 * 60 * 24, // 1 dia de duração do cookie
        httpOnly: true, // O cookie só é acessível via HTTP (não é acessível via JavaScript)
      }
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
