import { Router } from "express"

import {
    addMovement,
    getAllMovements,
    getMovementById,
    deleteMovement
} from './movement.controller.js'

const api = Router()


api.post('/addM', addMovement)
api.get('/getAllM', getAllMovements)
api.get('/getM/:id', getMovementById)
api.delete('/deleteM/:id', deleteMovement)


export default api