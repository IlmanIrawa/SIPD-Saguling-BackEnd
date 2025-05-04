const express = require('express')
const router = express.Router()
const userService = require('./user.service')
const authorizeJWT = require('../middleware/authorizeJWT');

router.post('/', async (req, res, next) => {
    try {
        const userData = req.body
        const user = await userService.createUser(userData)
        res.status(201).json(user)
    } catch (e) {
        next(e) 
    }
})

router.get('/', async (req, res, next) => {
    try {
        const users = await userService.getAllUser()
        res.status(200).json(users)
    } catch (e) {
        next(e)
    }
})

router.get('/me', authorizeJWT, async (req, res, next) => {
    try {
        console.log('req.user:', req.user); 

        const userid = req.user?.userid;
        if (!userid) {
            return res.status(400).json({ message: 'Invalid token payload: no userid' });
        }

        const user = await userService.getMe(userid);
        res.status(200).json(user);
    } catch (e) {
        next(e);
    }
});


router.get('/:userid', async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userid) 
        const user = await userService.getUserById(userId)
        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }
        res.status(200).json(user)
    } catch (e) {
        next(e)
    }
})

router.patch('/:userid', async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userid)
        const userData = req.body
        const updatedUser = await userService.editUser(userId, userData)
        res.status(200).json(updatedUser)
    } catch (e) {
        next(e)
    }
})

router.delete('/:userid', async (req, res, next) => {
    try {
        const userId = parseInt(req.params.userid)
        const deletedUser = await userService.deleteUser(userId)
        res.status(200).json({ message: 'User deleted successfully', deletedUser })
    } catch (e) {
        next(e)
    }
})


module.exports = router
