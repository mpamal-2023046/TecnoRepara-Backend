import { Schema, model } from "mongoose";

const categorySchema = Schema(
    {
        name: {
            type: String,
            maxLength: [50, `Can't be overcome 50 characters`],
            required: [true, 'Name is required'],
        },
        description: {
            type: String,
            maxLength: [70, `Can't be overcome 70 characters`],
            required: [true, 'Description is required']
        },
        clasification: {
            type: String,
            uppercase: true,
            enum: ['CATEGORY', 'DEFAULT'],
            required: [true, 'Clasification is required'],
        }
    },
    {
        versionKey: false,
        timestamps: true
    }
)
export default model('Category', categorySchema)