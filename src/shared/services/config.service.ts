import { Logger } from "@nestjs/common";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import * as dotenv from "dotenv";
import { homedir } from "os";
import { join } from "path";

import { IAwsConfig } from "../../interfaces/IAwsConfig";
import { SnakeNamingStrategy } from "../../snake-naming.strategy";

export class ConfigService {
  readonly #logger = new Logger(ConfigService.name);

  constructor() {
    const nodeEnv = this.nodeEnv;
    dotenv.config({
      path: `.${nodeEnv}.env`,
    });

    // Replace \\n with \n to support multiline strings in AWS
    for (const envName of Object.keys(process.env)) {
      process.env[envName] = process.env[envName]?.replace(/\\n/g, "\n");
    }
  }

  get getHomeDir(): string {
    return join(homedir(), this.get("APP_NAME"));
  }

  public get(key: string, defaultValue = ""): string {
    if (!process.env[key]) {
      this.#logger.log(
        `environment variable ${key} was not found. using default value : '${defaultValue}'`
      );
      return defaultValue;
    }
    return process.env[key] + "";
  }

  public getNumber(key: string, defaultValue = 0): number {
    return Number(this.get(key, String(defaultValue)));
  }

  get nodeEnv(): string {
    return this.get("NODE_ENV", "development");
  }

  get typeOrmConfig(): TypeOrmModuleOptions {
    let entities = [__dirname + "/../../modules/**/*.entity{.ts,.js}"];
    let migrations = [__dirname + "/../../migrations/*{.ts,.js}"];

    if ((<any>module).hot) {
      const entityContext = (<any>require).context(
        "./../../modules",
        true,
        /\.entity\.ts$/
      );
      entities = entityContext.keys().map((id: string) => {
        const entityModule = entityContext(id);
        const [entity] = Object.values(entityModule);
        return entity;
      });
      const migrationContext = (<any>require).context(
        "./../../migrations",
        false,
        /\.ts$/
      );
      migrations = migrationContext.keys().map((id: string) => {
        const migrationModule = migrationContext(id);
        const [migration] = Object.values(migrationModule);
        return migration;
      });
    }
    return {
      entities,
      migrations,
      keepConnectionAlive: true,
      type: "postgres",
      host: this.get("POSTGRES_HOST"),
      port: this.getNumber("POSTGRES_PORT"),
      username: this.get("POSTGRES_USERNAME"),
      password: this.get("POSTGRES_PASSWORD"),
      database: this.get("POSTGRES_DATABASE"),
      migrationsRun: true,
      logging: this.nodeEnv === "development",
      namingStrategy: new SnakeNamingStrategy(),
    };
  }

  get awsS3Config(): IAwsConfig {
    return {
      accessKeyId: this.get("AWS_S3_ACCESS_KEY_ID"),
      secretAccessKey: this.get("AWS_S3_SECRET_ACCESS_KEY"),
      bucketName: this.get("S3_BUCKET_NAME"),
    };
  }
}
