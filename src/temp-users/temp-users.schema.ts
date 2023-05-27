import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TemporaryUserDocument = HydratedDocument<TemporaryUser>;

@Schema()
export class TemporaryUser {
	@Prop({
		required: true,
		unique: true,
	})
	id: string;

	@Prop({ required: true })
	createdAt: number;

	@Prop({ required: true })
	expiresAt: number;

	@Prop({ required: false })
	comment: string;
}

export const TemporaryUserSchema = SchemaFactory.createForClass(TemporaryUser);

export interface TemporaryUserData {
	id: string;
	createdAt: number;
	expiresAt: number;
	comment: string;
}
