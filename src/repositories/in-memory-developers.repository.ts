import { Injectable } from '@nestjs/common';
import { Developer } from 'src/models/developer';
import { DevelopersRepository } from './interfaces/developers.repository';
import { IQuery } from './types/iquery';

@Injectable()
export class InMemoryDevelopersRepository implements DevelopersRepository {
  private db: Developer[];

  constructor() {
    this.db = [];
  }

  create(dev: Developer): Promise<Developer> {
    this.db.push(dev);
    return Promise.resolve(dev);
  }

  findById(id: string): Promise<Developer> {
    const dev = this.db.find((dev) => dev.id === id);
    if (!dev) return Promise.reject(new Error('Dev not found'));
    return Promise.resolve(dev);
  }

  findMany(query?: IQuery): Promise<Developer[]> {
    let result = this.db;

    if (query && (query.role || query.tech)) {
      result = this.db.filter((dev) => {
        if (query.role && query.tech) {
          return dev.role === query.role && dev.techs.includes(query.tech);
        }

        return dev.role === query.role || dev.techs.includes(query.tech);
      });
    }

    return Promise.resolve(result);
  }

  update(devToUpdate: Developer): Promise<Developer> {
    let index = -1;
    this.db.map((_, idx) => (index = idx));
    if (index < 0) return Promise.reject(new Error('Dev not found'));

    this.db[index] = devToUpdate;
    return Promise.resolve(devToUpdate);
  }

  delete(id: string): Promise<Developer> {
    const dev = this.db.find((dev) => dev.id === id);
    if (!dev) return Promise.reject(new Error('Dev not found'));

    this.db = this.db.filter((dev) => dev.id !== id);
    return Promise.resolve(dev);
  }
}
