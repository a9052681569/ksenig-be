import {
	Injectable,
	CanActivate,
	ExecutionContext,
	Logger,
} from '@nestjs/common';
import { userConstants } from './constants';

@Injectable()
export class DirectWorkWithUserGuard implements CanActivate {
	private readonly logger = new Logger(DirectWorkWithUserGuard.name);

	canActivate(context: ExecutionContext): boolean {
		const { headers } = context.switchToHttp().getRequest();

		return (
			headers['direct-work-with-user-token'] === userConstants.createToken
		);
	}
}
