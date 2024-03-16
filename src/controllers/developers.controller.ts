import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { DevelopersService } from 'src/services/developers.service';
import { z } from 'zod';

@Controller()
export class DevelopersController {
  constructor(private readonly developersService: DevelopersService) {}

  @Get('/')
  heartbeat() {
    return { data: 'Open-Coding Bahia devs API' };
  }

  @Post('/developers')
  async create(@Body() body: any) {
    const bodySchema = z.object({
      name: z.string().max(200),
      role: z.string().max(200),
      age: z.number().min(18).max(150),
      email: z.string().email(),
      techs: z.array(z.string()),
    });

    const bodySchemaValidation = bodySchema.safeParse(body);
    if (bodySchemaValidation.success !== true) {
      throw new HttpException(
        { errors: bodySchemaValidation.error.issues },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { name, email, age, role, techs } = bodySchemaValidation.data;

    const data = await this.developersService.create({
      name,
      email,
      age,
      role,
      techs,
    });

    return data;
  }

  @Put('/developers/:id')
  async update(@Body() body: any, @Param() params: { id: string }) {
    const bodySchema = z.object({
      name: z.string().max(200),
      role: z.string().max(200),
      age: z.number().min(18).max(150),
      techs: z.array(z.string()),
    });

    const bodySchemaValidation = bodySchema.safeParse(body);
    if (bodySchemaValidation.success !== true) {
      throw new HttpException(
        { errors: bodySchemaValidation.error.issues },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { name, age, role, techs } = bodySchemaValidation.data;

    const data = await this.developersService.update(params.id, {
      name,
      age,
      role,
      techs,
    });

    return data;
  }

  @Delete('/developers/:id')
  async delete(@Param() params: { id: string }) {
    const data = await this.developersService.delete(params.id);
    return data;
  }

  @Get('/developers/:id')
  async findById(@Param() params: { id: string }) {
    const data = await this.developersService.find(params.id);
    return data;
  }

  @Get('/developers/')
  async findMany(@Query() query: any) {
    const querySchema = z.object({
      role: z.string().optional(),
      tech: z.string().optional(),
    });

    const querySchemaValidation = querySchema.safeParse(query);
    if (querySchemaValidation.success !== true) {
      throw new HttpException(
        { errors: querySchemaValidation.error.issues },
        HttpStatus.BAD_REQUEST,
      );
    }

    const { role, tech } = querySchemaValidation.data;

    const data = await this.developersService.findMany({ role, tech });
    return data;
  }
}
