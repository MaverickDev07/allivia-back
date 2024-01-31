import express from 'express'

import { AlimentosService } from '../services'

const service = new AlimentosService(),
      router = express.Router()

router.post('/', async (req, res, next) => {
  const { body: { tipoAlimentoId, alimentos } } = req

  try {
    const data = await service.createCollection(tipoAlimentoId, alimentos)

    res.status(201).json({
      message: 'Alimentos guardados',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.get('/llenarDatos/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const data = await service.llenarAlimentos(id)

    res.status(200).json({
      message: 'Datos llenados desde excel para alimentos',
      data
    })
  } catch(err) {
    next(err)
  }
})

/*router.delete('/:id/unit/:unitId/', async (req, res, next) => {
  const { id, unitId } = req.params

  try {
    const data = await service.deleteConversion(unitId, id)

    res.status(200).json({
      message: 'Conversion deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})*/

export default router
