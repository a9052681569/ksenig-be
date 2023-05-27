import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Request,
	Delete,
	Put,
	Logger,
	Param,
	Post,
	UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';
import { TemporaryUser, TemporaryUserData } from './temp-users.schema';
import { TempUsersService } from './temp-users.service';

@Controller()
export class TempUsersController {
	private readonly logger = new Logger(TempUsersController.name);

	constructor(private tempUserService: TempUsersService) {}

	@UseGuards(JwtAuthGuard)
	@Post()
	create(@Request() req: any): Promise<TemporaryUser> {
		return this.tempUserService.create(req.body.comment);
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

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	deleteTempUser(@Param('id') id: string): Promise<any> {
		return this.tempUserService.delete(id);
	}

	@UseGuards(JwtAuthGuard)
	@Put(':id')
	refreshTempUser(@Param('id') id: string): Promise<TemporaryUser | null> {
		return this.tempUserService.refresh(id);
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
