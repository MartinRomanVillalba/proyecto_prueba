const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');
const uploadProduct = require('../middlewares/multerProductMiddleware');

router.get('/', productsController.index)

router.get('/create',productsController.create)
router.post('/', productsController.store)

router.get('/detail/:id', productsController.detail)

router.get('/:id/edit', productsController.edit)
router.put('/:id', productsController.update)

router.delete('/:id', productsController.destroy)

router.get('/productCart', productsController.cart)


module.exports = router;