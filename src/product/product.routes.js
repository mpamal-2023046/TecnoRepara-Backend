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

api.post('/addP', [validateJwt], addProduct)
api.get('/getAllP', [validateJwt], getAllProducts)
api.get('/getP/:id', [validateJwt], getProduct)
api.get('/getSOP', [validateJwt], getSoldOutProducts)
api.get('/getTopSP', [validateJwt], getTopSellingProducts)
api.put('/getSell/:id', [validateJwt], sellProduct)
api.put('/updateP/:id', [validateJwt], updateProduct)
api.delete('/deleteP/:id',[validateJwt], deleteProduct)

export default api