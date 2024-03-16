import { Module } from '@nestjs/common';
import { DevelopersRepository } from './repositories/interfaces/developers.repository';
import { InMemoryDevelopersRepository } from './repositories/in-memory-developers.repository';
import { DevelopersController } from './controllers/developers.controller';
import { DevelopersService } from './services/developers.service';

@Module({
  imports: [],
  controllers: [DevelopersController],
  providers: [
    DevelopersService,
    { provide: DevelopersRepository, useClass: InMemoryDevelopersRepository },
  ],
})
export class AppModule {}
