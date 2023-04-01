import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cat, CatData } from './cat.schema';

@Injectable()
export class CatsService {
	constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {}

	async create(createCatDto: CatData): Promise<Cat> {
		const createdCat = await this.catModel.create(createCatDto);
		return createdCat;
	}

	async findAll(): Promise<Cat[]> {
		return this.catModel.find().exec();
	}

	async findOne(id: string): Promise<Cat | null> {
		return this.catModel.findOne({ _id: id }).exec();
	}

	async delete(id: string) {
		const deletedCat = await this.catModel
			.findByIdAndRemove({ _id: id })
			.exec();
		return deletedCat;
	}
}
