const express = require('express')

const router = express.Router()

const libroController = require('../controllers/libroController')

//Definiendo las rutas
router.post('/', libroController.registrarLibro)
router.get('/', libroController.obtenerLibros)
router.get('/:id', libroController.obtenerLibroPorId)
router.put('/:id', libroController.actualizarLibro)
router.delete('/:id', libroController.eliminarLibro)

module.exports = router