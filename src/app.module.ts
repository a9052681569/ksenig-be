import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { RouterModule } from '@nestjs/core';
import { env } from 'process';

@Module({
	imports: [
		MongooseModule.forRoot(
			// в проде докер кинет в окружение имся хоста
			// это нужно для доступа БЕ к БД т.к у докера своя внутренняя сеть
			`mongodb://${env.DB_HOST ?? '127.0.0.1'}:27017/ksenigdb`,
		),
		CatsModule,
		RouterModule.register([
			{
				path: 'api',
				children: [
					{
						path: 'cats',
						module: CatsModule,
					},
				],
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
