import { Router } from "express"
import { addProduct,
         getAllProducts,
         getSoldOutProducts,
         getTopSellingProducts,
         sellProduct,
         getProduct,
         updateProduct,
         deleteProduct
} from "./product.controller.js"
import { isAdmin, validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()

api.post('/addP', addProduct)
api.get('/getAllP', getAllProducts)
api.get('/getP/:id', getProduct)
api.get('/getSOP', getSoldOutProducts)
api.get('/getTopSP', getTopSellingProducts)
api.put('/getSell/:id',sellProduct)
api.put('/updateP/:id', updateProduct)
api.delete('/deleteP/:id', deleteProduct)

export default api