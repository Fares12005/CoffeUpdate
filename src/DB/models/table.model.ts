import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { TableStatusEnum } from "src/common/enum/table.enum";


@Schema({ timestamps: true , toJSON: { virtuals: true , transform(doc, ret: any) {
    
    delete ret.__v;
    delete ret._id;
    return ret;
}, }, toObject: { virtuals: true } })

export class Table {

    @Prop({ type: Number , required: true })
    chairs: number;

    @Prop({ type: Number, unique: true , required: true })
    tableNumber: number;

    @Prop({ type: String, enum: TableStatusEnum , default: TableStatusEnum.AVAILABLE })
    tableStatus: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    reservation: mongoose.Types.ObjectId;

    @Prop({ type: Number })
    reservation_price: number;
  
}

export const TableSchema = SchemaFactory.createForClass(Table);

export type TableDocument = HydratedDocument<Table>;

export const TableModel = MongooseModule.forFeature([{ name: 'Table', schema: TableSchema }]);