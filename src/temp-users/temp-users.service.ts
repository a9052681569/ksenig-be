import { Injectable, Logger } from '@nestjs/common';
import { TemporaryUser, TemporaryUserData } from './temp-users.schema';
import { v4 as uuidv4 } from 'uuid';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TempUsersService {
	private readonly logger = new Logger(TempUsersService.name);

	// время жизни временного пользователя в миллисекундах. 24 часа (1000 миллисекунд в секунде * 60 секунд в минуте * 60 минут в часе * 24 часа в сутках)
	tempUserLiveTime = 1000 * 60 * 60 * 24;

	constructor(
		@InjectModel(TemporaryUser.name)
		private readonly tempUserModel: Model<TemporaryUser>,
	) {}

	findOne(id: string): Promise<TemporaryUserData | null | undefined> {
		return this.tempUserModel.findOne({ id });
	}

	findAll(): Promise<TemporaryUserData[] | null | undefined> {
		return this.tempUserModel.find({});
	}

	create(comment: string): Promise<TemporaryUser> {
		const data: TemporaryUserData = {
			id: uuidv4(),
			createdAt: Date.now(),
			expiresAt: Date.now() + this.tempUserLiveTime,
			comment,
		};

		this.logger.log(data);

		return this.tempUserModel.create(data);
	}

	delete(id: string): Promise<any> {
		return this.tempUserModel.findOneAndDelete({ id });
	}

	refresh(id: string): Promise<TemporaryUser | null> {
		return this.tempUserModel.findOneAndUpdate(
			{ id },
			{ expiresAt: Date.now() + this.tempUserLiveTime },
			{ new: true },
		);
	}
}
