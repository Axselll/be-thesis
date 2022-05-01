import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Repository, RepositorySchema } from 'src/repository/schema/repository.schema';

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    firstName: string;

    @Prop()
    lastName: string;

    @Prop({ unique: true })
    email: string;

    @Prop()
    googleId: string;

    @Prop({ type: [RepositorySchema] })
    repository: Types.Array<Repository>;
}

export const UserSchema = SchemaFactory.createForClass(User)
