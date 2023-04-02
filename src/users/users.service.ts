import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserData } from './users.schema';

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<User>,
	) {}

	findOneWithPassword(username: string): Promise<User | null | undefined> {
		return this.userModel.findOne({ username }).select('+password');
	}

	findOne(username: string): Promise<User | null | undefined> {
		return this.userModel.findOne({ username });
	}

	getAll(): Promise<UserData[] | null | undefined> {
		return this.userModel.find();
	}

	create(data: UserData): Promise<User> {
		return this.userModel.create(data);
	}

	delete(username: string): Promise<any> {
		return this.userModel.deleteOne({ username });
	}

	update(data: UserData, _id: string): Promise<UserData | null> {
		return this.userModel.findOneAndUpdate({ _id }, data, { new: true });
	}
}
