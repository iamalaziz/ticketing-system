import { Global, Module } from '@nestjs/common';
import { UniqueEmailValidator } from './unique-email.validator';
import { UserHttpModule } from '../users/user-http.module';

@Global()
@Module({
  imports: [UserHttpModule],
  providers: [UniqueEmailValidator],
  exports: [UniqueEmailValidator],
})
export class ValidatorModule {}
