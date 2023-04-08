import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Logger,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { TemporaryUserData } from './temp-users.schema';
import { TempUsersService } from './temp-users.service';

@Controller()
export class TempUsersController {
	private readonly logger = new Logger(TempUsersController.name);

	constructor(private tempUserService: TempUsersService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create() {
		return this.tempUserService.create();
	}

	@UseGuards(JwtAuthGuard)
	@Get()
	getAll(): Promise<TemporaryUserData[]> {
		return this.tempUserService
			.findAll()
			.then((tempUsers: TemporaryUserData[]) => {
				if (!tempUsers.length) {
					throw new HttpException('Not found', HttpStatus.NOT_FOUND);
				}

				return tempUsers;
			});
	}

	@Get(':id')
	getTempUser(@Param('id') id: string): Promise<TemporaryUserData> {
		return this.tempUserService
			.findOne(id)
			.then((tempUser: TemporaryUserData) => {
				if (!tempUser) {
					throw new HttpException('Not found', HttpStatus.NOT_FOUND);
				}

				return tempUser;
			});
	}
}
