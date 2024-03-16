import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ICreateDeveloperDTO } from '../dtos/icreate-developer-dto';
import { Developer } from '../models/developer';
import { DevelopersRepository } from '../repositories/interfaces/developers.repository';
import { IUpdateDeveloperDTO } from '../dtos/iupdate-developer-dto';
import { IFindManyDeveloperDTO } from '../dtos/ifind-many-developer-dto';

@Injectable()
export class DevelopersService {
  constructor(private readonly developersRepository: DevelopersRepository) {}

  async create(params: ICreateDeveloperDTO) {
    try {
      const developer = new Developer(params);

      const createdDev = await this.developersRepository.create(developer);

      return { data: createdDev.toJSON() };
    } catch (err) {
      throw new HttpException(
        { status: 'error', data: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async update(id: string, params: IUpdateDeveloperDTO) {
    try {
      const developer = await this.developersRepository.findById(id);

      params.name ? (developer.name = params.name) : null;
      params.age ? (developer.age = params.age) : null;
      params.role ? (developer.role = params.role) : null;
      params.techs ? (developer.techs = params.techs) : null;

      const updatedDev = await this.developersRepository.update(developer);

      return { data: updatedDev.toJSON() };
    } catch (err) {
      throw new HttpException(
        { status: 'error', data: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async find(id: string) {
    try {
      const developer = await this.developersRepository.findById(id);

      return { data: developer.toJSON() };
    } catch (err) {
      throw new HttpException(
        { status: 'error', data: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findMany(params?: IFindManyDeveloperDTO) {
    try {
      const developers = await this.developersRepository.findMany(params);

      const developersToReturn = developers.map((dev) => {
        return dev.toJSON();
      });

      return { data: developersToReturn };
    } catch (err) {
      throw new HttpException(
        { status: 'error', data: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async delete(id: string) {
    try {
      const deletedDeveloper = await this.developersRepository.delete(id);

      return { data: deletedDeveloper.toJSON() };
    } catch (err) {
      throw new HttpException(
        { status: 'error', data: err.message },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
