import { Injectable } from '@nestjs/common';
import { Developer } from 'src/models/developer';
import { DevelopersRepository } from './interfaces/developers.repository';
import { IQuery } from './types/iquery';
import { InMemoryDb } from 'src/db/in-memory-db.provider';

@Injectable()
export class InMemoryDevelopersRepository implements DevelopersRepository {
  constructor(private dbProvider: InMemoryDb) {}

  create(dev: Developer): Promise<Developer> {
    this.dbProvider.getDb().push(dev);
    return Promise.resolve(dev);
  }

  findById(id: string): Promise<Developer> {
    const dev = this.dbProvider.getDb().find((dev) => dev.id === id);
    if (!dev) return Promise.reject(new Error('Dev not found'));
    return Promise.resolve(dev);
  }

  findMany(query?: IQuery): Promise<Developer[]> {
    let result = this.dbProvider.getDb();

    if (query && (query.role || query.tech)) {
      result = this.dbProvider.getDb().filter((dev) => {
        if (query.role && query.tech) {
          return dev.role === query.role && dev.techs.includes(query.tech);
        }

        return dev.role === query.role || dev.techs.includes(query.tech);
      });
    }

    return Promise.resolve(result);
  }

  update(devToUpdate: Developer): Promise<Developer> {
    const db = this.dbProvider.getDb();
    let index = -1;
    db.map((dev, idx) => {
      if (dev.id === devToUpdate.id) index = idx;
    });
    if (index < 0) return Promise.reject(new Error('Dev not found'));

    db[index] = devToUpdate;
    return Promise.resolve(devToUpdate);
  }

  delete(id: string): Promise<Developer> {
    const db = this.dbProvider.getDb();
    let index = -1;
    db.map((dev, idx) => {
      if (dev.id === id) index = idx;
    });
    if (index < 0) return Promise.reject(new Error('Dev not found'));

    const dev = db[index];

    db.splice(index, 1);
    return Promise.resolve(dev);
  }
}
