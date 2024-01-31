import express from 'express'

import { IziService } from '../services'

const service = new IziService()
const router = express.Router()

router.get('/facturas', async (req, res, next) => {
  const { id, skip, limit, field } = req.query

  try {
    let data = await service.getFacturas({ id, skip, limit, field })

    res.status(200).json({
      message: 'List facturas',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.get('/cobros', async (req, res, next) => {
  const { id, skip, limit, field } = req.query

  try {
    let data = await service.getCobros({ id, skip, limit, field })

    res.status(200).json({
      message: 'List cobros',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/getAuth', async (req, res, next) => {
  const { body: _data } = req
  try {
    const data = await service.getAuth(_data)

    res.status(200).json({
      message: 'Test getAuth',
      data
    })
  } catch(err) {
    next(err)
  }
})


router.post('/facturas', async (req, res, next) => {
  const { body: _data } = req

  try {
    let data = await service.createFactura( _data )
    if ( data['status'] ) {
      res.status(data['status']).json({
        message: 'Error: al crear factura, revise los NIT',
        data
      })
    } else {
      res.status(200).json({
        message: 'Factura created',
        data
      })
    }
  } catch(err) {
    next(err)
  }
})

router.post('/cobros', async (req, res, next) => {
  const { body: _data } = req

  try {
    const data = await service.createCobro( _data )
  
    res.status(200).json({
      message: 'Cobro created',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/prueba', async (req, res, next) => {
  const { body: data } = req

  try {
    res.status(200).json({
      message: 'Prueba POST',
      data
    })
  } catch(err) {
    next(err)
  }
})

/*router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: _data } = req

    try {
      const data = await service.updateExampless({ id, data: _data })
    
      res.status(200).json({
        message: 'example updated',
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
    const data = await service.deleteExampless(id)
  
    res.status(200).json({
      message: 'Example deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})*/

export default router
