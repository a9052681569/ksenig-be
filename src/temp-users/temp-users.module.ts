import { Module } from '@nestjs/common';
import { TempUsersController } from './temp-users.controller';
import { TempUsersService } from './temp-users.service';
import { TemporaryUser, TemporaryUserSchema } from './temp-users.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	controllers: [TempUsersController],
	providers: [TempUsersService],
	imports: [
		MongooseModule.forFeature([
			{ name: TemporaryUser.name, schema: TemporaryUserSchema },
		]),
	],
})
export class TempUsersModule {}
