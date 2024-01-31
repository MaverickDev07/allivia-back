import express from 'express'

import { ListaPlatosService } from '../services'

const listaPlatosService = new ListaPlatosService(),
      router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await listaPlatosService.getAll()

    res.status(200).json({
      message: 'Listado de platos',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { body: _data } = req

  try {
    
    const data = await listaPlatosService.create(_data)

    res.status(201).json({
      message: 'Lista de platos añadidos',
      data
    })
  } catch(err) {
    next(err)
  }
})

export default router

