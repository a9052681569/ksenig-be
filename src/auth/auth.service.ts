import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
	private readonly logger = new Logger(AuthService.name);
	constructor(
		private usersService: UsersService,
		private jwtService: JwtService,
	) {}

	validateUser(username: string, pass: string): Promise<any> {
		return this.usersService.findOneWithPassword(username).then((user) => {
			if (user && user.password === pass) {
				return this.usersService.findOne(username);
			}

			return null;
		});
	}

	async login(user: any) {
		const payload = {
			username: user.username,
			roles: user.roles,
			_id: user._id,
		};

		return {
			access_token: this.jwtService.sign(payload),
			user,
		};
	}
}
