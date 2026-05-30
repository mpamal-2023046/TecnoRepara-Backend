import Movement from './movement.model.js'
import Product from '../product/product.model.js'



//Agregar movimiento
export const addMovement = async (req, res) => {
    try {

        let data = req.body

        const product = await Product.findById(data.product)

        if (!product) {
            return res.status(404).send({
                message: 'Product not found'
            })
        }

        //ENTRADA
        if (data.type == 'ENTRY') {

            product.stock += Number(data.quantity)

        }

        //SALIDA
        if (data.type == 'EXIT') {

            if (product.stock < data.quantity) {
                return res.status(400).send({
                    message: 'Insufficient stock'
                })
            }

            product.stock -= Number(data.quantity)
        }

        await product.save()

        const movement = new Movement(data)
        await movement.save()

        return res.status(200).send({
            message: 'Movement added successfully',
            movement
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            message: 'Error registering movement'
        })
    }
}



//Listar movimientos
export const getAllMovements = async (req, res) => {
    try {

        const movements = await Movement.find()
            .populate('product')

        return res.send(movements)

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            message: 'Error getting movements'
        })
    }
}



//Movimiento por ID
export const getMovementById = async (req, res) => {
    try {

        let { id } = req.params

        const movement = await Movement.findById(id)
            .populate('product')

        if (!movement) {
            return res.status(404).send({
                message: 'Movement not found'
            })
        }

        return res.send(movement)

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            message: 'Error getting movement'
        })
    }
}



//Eliminar movimiento
export const deleteMovement = async (req, res) => {
    try {

        let { id } = req.params

        const movement = await Movement.findById(id)

        if (!movement) {
            return res.status(404).send({
                message: 'Movement not found'
            })
        }

        await Movement.deleteOne({ _id: id })

        return res.status(200).send({
            message: 'Movement deleted successfully'
        })

    } catch (err) {
        console.error(err)
        return res.status(500).send({
            message: 'Error deleting movement'
        })
    }
}