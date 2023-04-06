import { Injectable, Logger } from '@nestjs/common';
import { TemporaryUser, TemporaryUserData } from './temp-users.schema';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TempUsersService {
	private readonly logger = new Logger(TempUsersService.name);

	// время жизни временного пользователя в миллисекундах. Пока минута для тестов (1000 миллисекунд в секунде * 60 секунд в минуте * 60 минут в часе)
	tempUserLiveTime = 1000 * 60 * 60;

	constructor(
		@InjectModel(TemporaryUser.name)
		private readonly tempUserModel: Model<TemporaryUser>,
	) {}

	findOne(id: string): Promise<TemporaryUserData | null | undefined> {
		return this.tempUserModel.findOne({ id });
	}

	create(): Promise<TemporaryUser> {
		const data: TemporaryUserData = {
			id: uuidv4(),
			createdAt: Date.now(),
			expiresAt: Date.now() + this.tempUserLiveTime,
		};

		this.logger.log(data);

		return this.tempUserModel.create(data);
	}
}
