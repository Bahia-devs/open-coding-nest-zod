import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Developer } from 'src/models/developer';

@Injectable()
export class InMemoryDb implements OnModuleInit, OnModuleDestroy {
  private db: Developer[];

  async onModuleInit() {
    console.log('Connecting to db...');

    await this.connect();

    console.log('Connected!');
  }

  async onModuleDestroy() {
    console.log('Disconnecting from db...');
    await this.disconnect();
    console.log('Disconnected!');
  }

  getDb() {
    return this.db;
  }

  async connect() {
    return new Promise((resolve) => {
      this.db = [];
      resolve(this.db);
    });
  }

  async disconnect() {
    this.db = undefined;
  }
}
