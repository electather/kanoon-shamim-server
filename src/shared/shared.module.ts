import { Global, HttpModule, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';

import { ConfigService } from './services/config.service';
import { FileWriteService } from './services/files.service';
import { GeneratorService } from './services/generator.service';
import { SmsService } from './services/sms.service';
import { ValidatorService } from './services/validator.service';

const providers = [
  ConfigService,
  ValidatorService,
  FileWriteService,
  GeneratorService,
  SmsService,
];

@Global()
@Module({
  providers,
  imports: [
    HttpModule,
    JwtModule.registerAsync({
      imports: [SharedModule],
      useFactory: (configService: ConfigService) => ({
        secretOrPrivateKey: configService.get('JWT_SECRET_KEY'),
        // if you want to use token with expiration date
        // signOptions: {
        //     expiresIn: configService.getNumber('JWT_EXPIRATION_TIME'),
        // },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [...providers, HttpModule, JwtModule],
})
export class SharedModule {}
