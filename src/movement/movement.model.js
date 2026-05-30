import { Schema, model } from "mongoose";

const movementSchema = Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Product is required']
        },

        type: {
            type: String,
            uppercase: true,
            enum: ['ENTRY', 'EXIT'],
            required: [true, 'Movement type is required']
        },

        quantity: {
            type: Number,
            min: [1, 'Quantity must be greater than 0'],
            required: [true, 'Quantity is required']
        },

        description: {
            type: String,
            maxLength: [100, `Can't be overcome 100 characters`],
            required: [true, 'Description is required']
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)

export default model('Movement', movementSchema)