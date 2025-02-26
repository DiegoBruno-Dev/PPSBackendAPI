const { Router } = require('express')
const { getUsers, getUserById, searchUsers, createUser, updateUser, deleteUser } = require('../controllers/Users')

const router = Router()

router.get('/search', searchUsers)
router.get('/', getUsers)
router.get('/:id', getUserById)
router.post('/', createUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router
