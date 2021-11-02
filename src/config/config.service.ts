import { plainToClass, Transform } from "class-transformer";
import { IsBoolean, IsDefined, IsString, validateSync } from "class-validator";

export class ConfigService {
  private static instance: ConfigService;

  public static getInstance(): ConfigService {
    if (!ConfigService.instance) {
      ConfigService.instance = ConfigService.buildConfig(process.env);
    }
    return ConfigService.instance;
  }

  static buildConfig(source: any): ConfigService {
    const configEnv: ConfigService = plainToClass(ConfigService, source);
    const errors = validateSync(configEnv, {
      whitelist: true,
      forbidUnknownValues: false,
    });
    if (errors.length) {
      throw new Error(`Config validation errors: ${errors}`);
    }
    return configEnv;
  }

  @IsDefined()
  @IsString()
  readonly TYPEORM_HOST: string;

  @IsDefined()
  @Transform(({value}) => parseInt(value, 10))
  readonly TYPEORM_PORT: number;

  @IsDefined()
  @IsString()
  readonly TYPEORM_USERNAME: string;

  @IsDefined()
  @IsString()
  readonly TYPEORM_PASSWORD: string;

  @IsDefined()
  @IsString()
  readonly TYPEORM_DATABASE: string;

  @IsDefined()
  @IsString()
  readonly TYPEORM_ENTITIES: string;

  @IsDefined()
  @Transform(({value}) => value === "true")
  @IsBoolean()
  readonly TYPEORM_SYNCHRONIZE: boolean;

  @IsDefined()
  @Transform(({value}) => value === "true")
  @IsBoolean()
  readonly TYPEORM_DROP_SCHEMA: boolean;

  @IsDefined()
  @Transform(({value}) => parseInt(value, 10))
  readonly PORT: number;

  @IsDefined()
  @IsString()
  readonly JWT_KEY: string;
}
