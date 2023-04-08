import {
	Controller,
	Get,
	Logger,
	Post,
	Request,
	Res,
	UseGuards,
} from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { UserData } from 'src/users/users.schema';
import { Response } from 'express';

@Controller()
export class AuthController {
	private readonly logger = new Logger(AppController.name);

	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(
		@Request() req: any,
		@Res({ passthrough: true }) response: Response,
	): Promise<UserData> {
		return this.authService.login(req.user).then((data) => {
			response.cookie('jwt', data.access_token);

			return data.user;
		});
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getUser(@Request() req: any) {
		return req.user;
	}
}
