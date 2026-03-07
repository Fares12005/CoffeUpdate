import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { OrderStatusEnum } from "src/common/enum/order.enum";
import { ProductEnum } from "src/common/enum/product.enum";


@Schema({ timestamps: true , toJSON: { virtuals: true , transform(doc, ret: any) {
    
    delete ret.__v;
    delete ret._id;
    return ret;
}, }, toObject: { virtuals: true } })
export class Product {


    @Prop({ type: String, required: true , maxlength: 20 , minLength: 5 , unique: true })
    name: string;
    
    @Prop({ type: Number, required: true })
    price: number;
    
    @Prop({ type: String, required: true , maxlength: 100 , minLength: 20 })
    description: string;

    @Prop({ type: String, enum: ProductEnum , default: ProductEnum.DRINKS })
    productType: string;

    @Prop({ type: String, enum:OrderStatusEnum })
    orderStatus: string;
    
    @Prop({ type: String , ref:`Category`})
    category?: string;
    
    @Prop({ type: String })
    image?: string
    


  
}

export const ProductSchema = SchemaFactory.createForClass(Product);

export type ProductDocument = HydratedDocument<Product>;

export const ProductModel = MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]);