import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { RouterModule } from '@nestjs/core';
import { env } from 'process';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
	imports: [
		MongooseModule.forRoot(
			// в проде докер кинет в окружение имся хоста
			// это нужно для доступа БЕ к БД т.к у докера своя внутренняя сеть
			`mongodb://${env.DB_HOST ?? '127.0.0.1'}:27017/ksenigdb`,
		),
		AuthModule,
		UsersModule,
		RouterModule.register([
			{
				path: 'api',
				module: AppModule,
				children: [
					{
						path: 'auth',
						module: AuthModule,
					},
					{
						path: 'users',
						module: UsersModule,
					},
				],
			},
		]),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
