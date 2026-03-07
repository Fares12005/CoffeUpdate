import { MongooseModule, Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';
import { OrderStatusEnum } from "src/common/enum/order.enum";


@Schema({ timestamps: true , toJSON: { virtuals: true , transform(doc, ret: any) {
    
    delete ret.__v;
    delete ret._id;
    return ret;
}, }, toObject: { virtuals: true } })

export class Order {


    
    @Prop({ type: Number })
    orderNumber: number;

    @Prop({ type: String, enum: OrderStatusEnum })
    status: string;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    orderUser: Types.ObjectId

    @Prop({ type: [MongooseSchema.Types.ObjectId], ref: 'Product', required: true })
    orderProducts: Types.ObjectId[];

    @Prop({ type: Number })
    orderTotal: number;

    @Prop({ type: Date })
   expiresAt: Date;

    
}


export const OrderSchema = SchemaFactory.createForClass(Order);

OrderSchema.index({expiresAt: 1}, {expireAfterSeconds: 0})


 OrderSchema.pre('save', async function () {

  for (let i = 1;; i++) {

   const ordermodel = this.constructor as any; 
   
   const order = await ordermodel.findOne({ orderNumber: i })


   if(!this.expiresAt){
    this.expiresAt = new Date(Date.now() + 10 * 1000);
   }



   
   if (!order) {
    this.orderNumber = i;
    return;
   };
    
  }

});



export type OrderDocument = HydratedDocument<Order>;

export const OrderModel = MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]);





