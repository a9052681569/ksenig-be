import {
	Controller,
	Get,
	Logger,
	Post,
	Request,
	UseGuards,
} from '@nestjs/common';
import { AppController } from 'src/app.controller';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt/jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
	private readonly logger = new Logger(AppController.name);

	constructor(private authService: AuthService) {}

	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(@Request() req: any) {
		return this.authService.login(req.user);
	}

	@UseGuards(JwtAuthGuard)
	@Get('profile')
	async getUser(@Request() req: any) {
		return req.user;
	}
}
