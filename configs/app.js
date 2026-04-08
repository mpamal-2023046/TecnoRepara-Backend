'use strict'

import express from 'express'
import morgan from 'morgan'
import helmet from 'helmet'
import cors from 'cors'
import userRoutes from '../src/user/user.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
import productRoutes from '../src/product/product.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import shoppingRoutes from '../src/shoppingCart/shoppingCart.routes.js'
import invoiceRoutes from '../src/invoice/invoice.routes.js'
import { limiter } from '../middlewares/rate.limit.js'

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended: false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
    app.use(limiter)
}

const routes = (app) => {
    app.use(authRoutes);
    app.use('/v1/user', userRoutes)
    app.use('/v1/product', productRoutes)
    app.use('/v1/category', categoryRoutes)
    app.use('/v1/shoppingCart', shoppingRoutes)
    app.use('/v1/invoice', invoiceRoutes)
}

export const initServer = ()=>{
    const app = express()
    try{
        configs(app)
        routes(app)
        app.listen(process.env.PORT || 3200)
        console.log(`Server running on port ${process.env.PORT || 3200}`)
    }catch(err){
        console.error('The server failed to start', err)
    }
}