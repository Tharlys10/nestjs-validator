import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { resolve } from 'path';

export default {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [
    resolve(
      __dirname,
      '..',
      '..',
      '..',
      'modules',
      '**',
      'infra',
      'typeorm',
      'entities',
      '*',
    ),
  ],
  synchronize: true,
} as TypeOrmModuleOptions;
