import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Transform } from 'class-transformer'
import { Commited, CommitedSchema } from 'src/commit/schema/commit.schema';
import moment from 'moment';

export type RepositoryDocument = Repository & Document

@Schema()
export class Repository {
    @Prop()
    name: string;

    @Prop()
    desc: string;

    @Prop({ type: Date, default: Date.now })
    @Transform(() => moment().format("DD/MM/YY"))
    createdTime: Date;

    @Prop({ type: [CommitedSchema] })
    commited: Types.Array<Commited>
}

export const RepositorySchema = SchemaFactory.createForClass(Repository)