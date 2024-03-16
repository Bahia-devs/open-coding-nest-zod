import { randomUUID } from 'node:crypto';
import { ICreateDeveloperDTO } from 'src/dtos/icreate-developer-dto';

export class Developer {
  id: string;
  name: string;
  role: string;
  age: number;
  email: string;
  techs: string[];
  created_at: Date;
  updated_at: Date;

  constructor(params: ICreateDeveloperDTO, id?: string) {
    this.name = params.name;
    this.role = params.role;
    this.age = params.age;
    this.email = params.email;
    this.techs = params.techs;

    this.id = id ?? randomUUID();
    this.created_at = params.created_at || new Date();
    this.updated_at = params.updated_at || new Date();
  }

  toJSON() {
    const developerToReturn = {
      ...this,
      created_at: undefined,
      updated_at: undefined,
    };
    return developerToReturn;
  }
}
