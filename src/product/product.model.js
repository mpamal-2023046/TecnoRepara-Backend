import { Schema, model } from "mongoose";

const productSchema = Schema(
    {
        name:{
            type: String,
            required: [true, 'Name is required'],
            maxLength: [55, `Can't be overcome 55 characters`],
            unique: true
        },
        brand:{
            type: String,
            required: [true, 'Brand is required'],
            maxLength: [45, `Can't be overcome 45 characters`]
            
        },
        modelo:{
            type: String,
            required: [true, 'Model is required'],
            maxLength: [60, `Can't be overcome 60 characters`]
            
        },
        description:{
            type: String,
            required: [true, 'Description is required'],
            maxLength: [100, `Can't be overcome 100 characters`]
        },
        price:{
            type: Number,
            required: [true, 'Price is required']
        },
        stock:{
            type: Number,
            required: [true, 'Stock is required'],
            min: 0,
            default: 0
        },
        location:{
            type: String,
            required: [true, 'Location is required'],
            maxLength: [50, `Can't be overcome 50 characters`]
        },
        category:{
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: [true, 'Category is required']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }

)

export default model('Product', productSchema)