import { ValidationPipe } from "@nestjs/common";

export const CommonValidationPipe = new ValidationPipe({
  transform: true,
  skipMissingProperties: true,
  whitelist: true,
  forbidUnknownValues: true,
  forbidNonWhitelisted: true,
  disableErrorMessages: true,
});
