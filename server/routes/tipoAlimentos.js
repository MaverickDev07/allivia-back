import express from 'express'

import { TipoAlimentosService } from '../services'

const tipoAlimentosService = new TipoAlimentosService(),
      router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await tipoAlimentosService.getAllCollection()

    res.status(200).json({
      message: 'Listado de alimentos',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { body: _data } = req

  try {
    const data = await tipoAlimentosService.createCollection(_data)
  
    res.status(201).json({
      message: 'Tipo de Alimento creado',
      data
    })
  } catch(err) {
    next(err)
  }
})

/*router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: unit } = req

    try {
      const data = await unitService.updateUnit(id, unit)
    
      res.status(200).json({
        message: 'Unit updated',
        data
      })
    } catch(err) {
      next(err)
    }
  }
)

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params

  try {
    const data = await unitService.deleteUnit(id)
  
    res.status(200).json({
      message: 'Unit deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})*/

export default router

