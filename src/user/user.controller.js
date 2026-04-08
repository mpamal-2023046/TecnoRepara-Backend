'use strict'

import User from '../user/user.model.js'
import { encrypt, checkPassword, checkUpdate } from '../../utils/encrypt.js'

export const test = async (req, res) => {
    return res.send('The user route is running')
}

//Listar todos los usuarios
export const getAll = async(req,res)=>{
    try{
        const { limit = 20, skip = 0} = req.query
        const users = await User.find()
            .skip(skip)
            .limit(limit)

        if(users.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Users not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Users found',
                users
            }
        )
    }catch(e){
        console.error(e)
        return res.status(500).send({message: 'General error',e})
    }
}

//Listar solo un usuario
export const getUser = async(req, res)=>{
    try {
        let { id } = req.params
        let user = await User.findById(id)
        if(!user) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User found: ', 
                user
            }
        )
    } catch (err) {
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error', 
                err
            }
        )
    }
}

//Crear admin por defecto
export const defaultAdmin = async (nameA, surnameA, usernameA, emailA, passwordA, phoneA, roleA) => {
    try {
        let adminFound = await User.findOne({ role: 'ADMIN' })
        if (!adminFound) {
            const data = {
                name: nameA,
                surname: surnameA,
                username: usernameA,
                email: emailA,
                password: await encrypt(passwordA),
                phone: phoneA,
                role: roleA
            }
            let user = new User(data)
            await user.save()
            return console.log('A default admin has been created.')
        } else {
            return console.log('Default admin cannot be created.')
        }

    } catch (err) {
        console.error(err)
        
    }
}

defaultAdmin('Super ', 'Admin', '1admin', 'admin@gmail.com', '123123Aa!', '123123123', 'ADMIN')


//Actualizar datos del usuario
export const updateUser = async(req, res)=>{
    try{
        const { id } = req.params
        const data = req.body
        const update = await User.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )
        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'User not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'User updated',
                user: update
            }
        )
    }catch(err){
        console.error('General error', err)
        return res.status(500).send(
            {
                success: false,
                message: 'General error',
                err
            }
        )
    }
}
 


//Eliminar usuario
export const deleteUser = async(req, res) => {
    try {
        let id = req.params.id;
        let user = await User.findByIdAndDelete(id);
        if (!user) return res.status(404).send({ message: 'User not found' });
        return res.send({ message: 'User deleted successfully!' });
    } catch (err) {
        console.error(err);
        return res.status(500).send({ message: 'General error', err });
    }
}