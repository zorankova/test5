import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const appPrefix = "api/v1";
  const swaggerUrl = `${appPrefix}/docs`;
  app.setGlobalPrefix(appPrefix);

  const config = new DocumentBuilder()
    .setTitle("Example App")
    .setDescription("The Example App")
    .addBearerAuth()
    .setVersion("1.0")
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(swaggerUrl, app, document);
  await app.listen(3000);
}
bootstrap();
