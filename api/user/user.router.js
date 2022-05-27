const {
    controllerAdd,
    controllerGet,
    controllerGetId,
    controllerUpdate,
    controllerDelete,
    controllerLogin
} = require('./user.controller');
const router = require('express').Router();
const { checkToken } = require("../../auth/token_validation")
router.post('/register', checkToken, controllerAdd);
router.get('/', checkToken, controllerGet);
router.get('/id', checkToken, controllerGetId);
router.patch('/', checkToken, controllerUpdate);
router.delete('/', checkToken, controllerDelete);
router.post('/login', controllerLogin);
module.exports = router