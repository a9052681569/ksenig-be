import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import { RouterModule } from '@nestjs/core';

@Module({
	imports: [
		MongooseModule.forRoot('mongodb://127.0.0.1:27017/ksenigdb'),
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
