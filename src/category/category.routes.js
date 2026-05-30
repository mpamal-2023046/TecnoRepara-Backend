import { Router } from "express"
import { addCategory,
         getAllCategories,
         updateCategory,
         deleteCategory
} from './category.controller.js'
import { validateJwt, isAdmin} from '../../middlewares/validate.jwt.js'


const api = Router()


api.post('/addC', addCategory)
api.get('/getAllC', getAllCategories)
api.put('/updateC/:id', updateCategory)
api.delete('/deleteC/:id', deleteCategory)


export default api