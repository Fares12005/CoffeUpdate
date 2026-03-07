import { Injectable } from "@nestjs/common";
import { Types } from "mongoose";
import Stripe from "stripe";
@Injectable()


export class PaymentGetaway {
    private stripe: Stripe;
    
    constructor() {
        this.stripe = new Stripe(process.env.SECRET_KEY as string);
    }

async createCheckoutSession(amount: number, orderNumber: number , orderId: Types.ObjectId) {
    const paymentIntent = await this.stripe.checkout.sessions.create({
        mode: 'payment',
        payment_method_types: ['card'],
        
        line_items:[{price_data:{currency : 'egp' , product_data:{name:`Order ${orderNumber}`} , unit_amount:amount * 100} , quantity:1}]
        ,
        success_url: 'http://localhost:3000/api/table/success',
        cancel_url: 'http://localhost:3000/api/table/cancel',
      
    });
    return paymentIntent;
    
}


}