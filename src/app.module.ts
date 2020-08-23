import "./boilerplate.polyfill";

import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { contextMiddleware } from "./middlewares";
import { AuthModule } from "./modules/auth/auth.module";
import { ClientModule } from "./modules/client/client.module";
import { FileModule } from "./modules/files/file.module";
import { StatsModule } from "./modules/stats/stats.module";
import { UserModule } from "./modules/user/user.module";
import { ConfigService } from "./shared/services/config.service";
import { SharedModule } from "./shared/shared.module";
import { SessionModule } from "modules/session/session.module";

@Module({
  imports: [
    AuthModule,
    UserModule,
    FileModule,
    StatsModule,
    ClientModule,
    SessionModule,

    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => configService.typeOrmConfig,
      inject: [ConfigService],
    }),
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(contextMiddleware).forRoutes("*");
  }
}
