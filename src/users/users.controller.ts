import {
	Controller,
	Logger,
	Post,
	UseGuards,
	Request,
	Get,
	Param,
	Delete,
	Put,
} from '@nestjs/common';
import { DirectWorkWithUserGuard } from './direck-work-with-user.guard';
import { UsersService } from './users.service';
import { User, UserData } from './users.schema';
import { JwtAuthGuard } from 'src/auth/jwt/jwt-auth.guard';

@Controller()
export class UsersController {
	private readonly logger = new Logger(UsersController.name);

	constructor(private usersService: UsersService) {}

	@UseGuards(DirectWorkWithUserGuard, JwtAuthGuard)
	@Post()
	create(@Request() req: any): Promise<UserData | null | undefined> {
		return this.usersService
			.create(req.body)
			.then(({ username, roles }) => ({ username, roles }));
	}

	@UseGuards(DirectWorkWithUserGuard, JwtAuthGuard)
	@Get()
	getAllUsers(): Promise<UserData[] | null | undefined> {
		return this.usersService.getAll();
	}

	@UseGuards(DirectWorkWithUserGuard, JwtAuthGuard)
	@Get(':username')
	getUser(
		@Param('username') username: string,
	): Promise<User | null | undefined> {
		return this.usersService.findOne(username);
	}

	@UseGuards(DirectWorkWithUserGuard, JwtAuthGuard)
	@Delete(':username')
	deleteUser(
		@Param('username') username: string,
	): Promise<User | null | undefined> {
		return this.usersService.delete(username);
	}

	@UseGuards(DirectWorkWithUserGuard, JwtAuthGuard)
	@Put(':id')
	updateUser(
		@Param('id') id: string,
		@Request() req: any,
	): Promise<UserData | null> {
		return this.usersService.update(req.body, id);
	}
}
