import {
	Body,
	Controller,
	Delete,
	Get,
	Logger,
	Param,
	Post,
} from '@nestjs/common';
import { CatsService } from './cats.service';
import { Cat, CatData } from './cat.schema';

@Controller()
export class CatsController {
	private readonly logger = new Logger(CatsController.name);
	constructor(private readonly catsService: CatsService) {}

	@Post()
	async create(@Body() createCatDto: CatData) {
		this.logger.log(createCatDto);
		await this.catsService.create(createCatDto);
	}

	@Get()
	async findAll(): Promise<Cat[]> {
		this.logger.log('hello');
		return this.catsService.findAll();
	}

	@Get(':id')
	async findOne(@Param('id') id: string): Promise<Cat | null> {
		return this.catsService.findOne(id);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		return this.catsService.delete(id);
	}
}
