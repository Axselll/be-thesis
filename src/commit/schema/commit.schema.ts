import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Transform } from 'class-transformer';
import moment from 'moment';

export type CommitedSchema = Commited & Document;

@Schema()
export class Commited {
    @Prop()
    title: string;

    @Prop()
    desc: string;

    @Prop()
    file: string;

    @Prop({ type: Date, default: Date.now })
    @Transform(() => moment().format("DD/MM/YY"))
    createdTime: Date;
}

export const CommitedSchema = SchemaFactory.createForClass(Commited)