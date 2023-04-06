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
import {
	TemporaryUserData,
	TemporaryUserPublicData,
} from './temp-users.schema';
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

	@Get(':id')
	getUser(@Param('id') id: string): Promise<TemporaryUserPublicData> {
		return this.tempUserService
			.findOne(id)
			.then((tempUser: TemporaryUserData) => {
				if (!tempUser) {
					throw new HttpException('Not found', HttpStatus.NOT_FOUND);
				}

				return {
					id: tempUser.id,
					canShow: tempUser.expiresAt - Date.now() > 0,
				};
			});
	}
}
