import { Document } from 'mongoose'
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'

export type CommitedSchema = Commited & Document;

@Schema({ timestamps: true })
export class Commited {
    @Prop()
    title: string;

    @Prop()
    desc: string;

    @Prop()
    file: string;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ default: Date.now })
    updatedAt: Date;
}

export const CommitedSchema = SchemaFactory.createForClass(Commited)