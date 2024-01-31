import express from 'express'

import { NutricionService } from '../services'

const service = new NutricionService(),
      router = express.Router()

router.get('/', async (req, res, next) => {
  const { id, skip, limit, ...field } = req.query

  try {
    const data = await service.getAll({ id, skip, limit, field })

    res.status(200).json({
      message: 'Datos nutricionales',
      data
    })
  } catch(err) {
    next(err)
  }
})

/*router.post('/', async (req, res, next) => {
  const { body: _data } = req
  try {
    const data = await service.create(_data)
  
    res.status(201).json({
      message: 'Datos nutricionales creado',
      data
    })
  } catch(err) {
    next(err)
  }
})*/

router.post('/addAlimentos', async (req, res, next) => {
  const { body: { usuarioId, alimentoId, fecha } } = req
  let data = {}

  try {
    if (usuarioId)
      if (alimentoId)
        if (fecha)
          data = await service.addAlimentos(usuarioId, alimentoId, fecha)
        else
          data = {errr: "Error: fecha incorrecta"}
      else
        data = {error: "Error: alimentoId incorrecto"}
    else
      data = {error: "Error: usuarioId incorrecto"}

    res.status(200).json({
      message: 'Alimento añadido',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/addVasosAgua', async (req, res, next) => {
  const { body: { usuarioId, fecha } } = req
  let data = {}

  try {
    if (usuarioId)
      if (fecha)
        data = await service.addVasosAgua(usuarioId, fecha)
      else
        data = {error: "Error: fecha incorrecta"}
    else
      data = {error: "Error: usuarioId incorrecto"}

    res.status(200).json({
      message: 'Vaso de agua añadido',
      data
    })
  } catch(err) {
    next(err)
  }
})


router.post('/subVasosAgua', async (req, res, next) => {
  const { body: { usuarioId, fecha } } = req
  let data = {}

  if (usuarioId)
    if (fecha)
      data = await service.subVasoAgua(usuarioId, fecha)
    else
      data = {error: "Error: fecha incorrecta"}
  else
    data = {error: "Error: usuarioId incorrecto"}

  try {
    res.status(200).json({
      message: 'Example deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.delete('/:usuarioId/:fecha/:alimentoId', async (req, res, next) => {
  const { usuarioId, alimentoId, fecha } = req.params
  let data = {}

  if (usuarioId)
    if (alimentoId)
      if (fecha)
        data = await service.deleteAlimentos(usuarioId, alimentoId, fecha)
      else
        data = {error: "Error: fecha incorrecta"}
    else
      data = {error: "Error: alimentoId incorrecto"}
  else
    data = {error: "Error: usuarioId incorrecto"}

  try {
    res.status(200).json({
      message: 'Alimento eliminado',
      data
    })
  } catch(err) {
    next(err)
  }
})


export default router
