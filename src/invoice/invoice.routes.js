import { Router } from "express"
import { getAllInvoices,
         getInvoicesByCustomer,
         getInvoiceById
} from './invoice.controller.js' 
import { validateJwt } from '../../middlewares/validate.jwt.js'

const api = Router()


api.get('/getAllI', validateJwt ,getAllInvoices)
api.get('/getIBC/:id', validateJwt, getInvoicesByCustomer)
api.get('/getIBI/:id', validateJwt, getInvoiceById)


export default api