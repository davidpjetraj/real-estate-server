import { Global, Module } from '@nestjs/common';
import { BuilderService } from './builder.service';
import { BuilderResolver } from './builder.resolver';

@Global()
@Module({
  controllers: [],
  providers: [BuilderService, BuilderResolver],
  exports: [BuilderService],
})
export class BuilderModule {}
