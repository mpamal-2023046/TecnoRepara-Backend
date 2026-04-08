import Invoice from './invoice.model.js';
import Product from '../product/product.model.js';




//Obtener todas las facturas
export const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find().populate('customer').populate('products')
        return res.send({ success: true, invoices })
    } catch (err) {
        return res.status(500).send({ message: 'General error', err })
    }
}



//Obtener factuas por usuario
export const getInvoicesByCustomer = async (req, res) => {
    try {
        const { id } = req.params
        const invoices = await Invoice.find({ customer: id }).populate('products')
        if (invoices.length === 0) return res.status(404).send(
            {
                message: 'No invoices found for this customer' 
            }
        )
        return res.send({ success: true, invoices })
    } catch (err) {
        return res.status(500).send({ message: 'General error', err })
    }
}



// Obtener factura por id
export const getInvoiceById = async (req, res) => {
    try {
        const { id } = req.params
        const invoice = await Invoice.findById(id).populate('customer').populate('products')
        if (!invoice) return res.status(404).send({ message: 'Invoice not found' })
        return res.send({ success: true, invoice })
    } catch (err) {
        return res.status(500).send({ message: 'General error', err })
    }
}