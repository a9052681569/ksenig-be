import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from 'src/auth/role/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
	@Prop({
		required: true,
		unique: true,
		minlength: 2,
		maxlength: 30,
	})
	username: string;

	@Prop({
		required: true,
		select: false,
		minlength: 2,
		maxlength: 30,
	})
	password: string;

	@Prop({ required: true })
	roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface UserData {
	username: string;
	password?: string;
	roles: Role[];
}
