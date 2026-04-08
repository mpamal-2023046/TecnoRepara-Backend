import { Router } from "express";
import { getAll, getUser, updateUser, deleteUser, test} from "./user.controller.js";
import{ getTopSellingProducts, getProduct, getAllProducts } from '../../src/product/product.controller.js'
import { getAllCategories } from "../category/category.controller.js"; 
import { validateJwt } from "../../middlewares/validate.jwt.js";
import { updateUserValidator } from '../../middlewares/validators.js'

const api = Router()

api.get('/test', test)

api.get('/getAllUsers', validateJwt, getAll)
api.get('/getUserById/:id', validateJwt, getUser)
api.get('/getTopSoldProducts', [validateJwt], getTopSellingProducts) //productos mas vendidos
api.get('/getProduct/:id', [validateJwt], getProduct)
api.get('/getAllProducts', validateJwt, getAllProducts)
api.get('/getAllCategories', [validateJwt], getAllCategories)
api.put('/updateU/:id', [validateJwt, updateUserValidator], updateUser)
api.delete('/deleteUser/:id', [validateJwt], deleteUser)

export default api