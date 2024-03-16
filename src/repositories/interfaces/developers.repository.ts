import { Developer } from 'src/models/developer';
import { IQuery } from '../types/iquery';

export abstract class DevelopersRepository {
  abstract create(dev: Developer): Promise<Developer>;
  abstract findById(id: string): Promise<Developer>;
  abstract findMany(query?: IQuery): Promise<Developer[]>;
  abstract update(devToUpdate: Developer): Promise<Developer>;
  abstract delete(id: string): Promise<Developer>;
}
