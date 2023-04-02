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
import { DirectWorkWithUserGuard } from './create-user.guard';
import { UsersService } from './users.service';
import { User, UserData } from './users.schema';

@Controller()
export class UsersController {
	private readonly logger = new Logger(UsersController.name);

	constructor(private usersService: UsersService) {}

	@UseGuards(DirectWorkWithUserGuard)
	@Post()
	create(@Request() req: any): Promise<UserData | null | undefined> {
		return this.usersService
			.create(req.body)
			.then(({ username, roles }) => ({ username, roles }));
	}

	@UseGuards(DirectWorkWithUserGuard)
	@Get()
	getAllUsers(): Promise<UserData[] | null | undefined> {
		return this.usersService.getAll();
	}

	@UseGuards(DirectWorkWithUserGuard)
	@Get(':username')
	getUser(
		@Param('username') username: string,
	): Promise<User | null | undefined> {
		return this.usersService.findOne(username);
	}

	@UseGuards(DirectWorkWithUserGuard)
	@Delete(':username')
	deleteUser(
		@Param('username') username: string,
	): Promise<User | null | undefined> {
		return this.usersService.delete(username);
	}

	@UseGuards(DirectWorkWithUserGuard)
	@Put(':id')
	updateUser(
		@Param('id') id: string,
		@Request() req: any,
	): Promise<UserData | null> {
		return this.usersService.update(req.body, id);
	}
}
