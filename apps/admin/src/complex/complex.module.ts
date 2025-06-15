import { Global, Module } from '@nestjs/common';
import { ComplexService } from './complex.service';
import { ComplexResolver } from './complex.resolver';

@Global()
@Module({
  providers: [ComplexService, ComplexResolver],
  exports: [ComplexService],
})
export class ComplexModule {}
