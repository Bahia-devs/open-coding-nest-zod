import { Global, Module } from '@nestjs/common';
import { InMemoryDb } from './in-memory-db.provider';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [InMemoryDb],
  exports: [InMemoryDb],
})
export class DbModule {}
