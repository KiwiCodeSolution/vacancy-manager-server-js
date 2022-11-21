const router = require('express').Router();
const ctrlWrapper = require('../middlewares/ctrlWrapper');
const auth = require('../middlewares/auth');
const {createUser, getUsers, login, logout, currentUser} = require('../controller/userController');

// router.get('/', ctrlWrapper(getUsers));
router.post('/register', ctrlWrapper(createUser));
router.post('/login', ctrlWrapper(login));
router.get('/current', auth, ctrlWrapper(currentUser));
router.get('/logout', auth, ctrlWrapper(logout))

module.exports = router;
