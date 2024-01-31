import express from 'express'

import { ExampleService } from '../services'

const exampleService = new ExampleService();
const router = express.Router()

router.get('/', async (req, res, next) => {
  //const { id, skip, limit, field } = req.query

  try {
    //const data = await exampleService.getExampless({ id, skip, limit, field })
    //const data = await exampleService.test()
    const data = [
  {
    _id: "5e88c5ef3129924f271f588d",
    tipo: "Desayuno",
    detalle: "Lista de alimentos para el desayuno",
    alimentos: [
            {
              _id: "5e88c5ef3129924f271f588a",
              nombre: "Bruschetta",
              img: "path/img/bruschetta.png",
              calorias: "102.5",
              proteina: "0.15g",
              grasas: "1.3g",
              carbohidratos: "19.5g",
              datos_nutricionales: {
                grasas_totales: "4.7g",
                colesterol: "105mg",
                sodio: "60mg",
                potasio: "70mg",
                cabohidratos: "0.3g"
              }
            },
            {
              _id: "5e88c7423129924f271f588f",
              nombre: "Omelette de verduras",
              img: "path/img/omelette.png",
              calorias: "105.5",
              proteina: "0.15g",
              grasas: "1.3g",
              carbohidratos: "19.5g",
              datos_nutricionales: {
                grasas_totales: "4.7g",
                colesterol: "105mg",
                sodio: "60mg",
                potasio: "70mg",
                cabohidratos: "0.3g"
              }
            },
            {
              _id: "5f2a98fce3e1310abc31f607",
              nombre: "Tostadas francesas",
              img: "path/img/tostadas.png",
              calorias: "105.5",
              proteina: "0.15g",
              grasas: "1.3g",
              carbohidratos: "19.5g",
              datos_nutricionales: {
                grasas_totales: "4.7g",
                colesterol: "105mg",
                sodio: "60mg",
                potasio: "70mg",
                cabohidratos: "0.3g"
              }
            }
          ]
        },
        {
          _id: "5f2a991fe3e1310abc31f608",
          tipo: "Almuerzo",
          detalle: "Lista de alimentos para el almuerzo",
          alimentos: [
            {
              _id: "5f2a991fe3e1310abc31fabc",
              nombre: "Papa rellena",
              img: "path/img/papa.png",
      
              calorias: "102.5",
              proteina: "0.15g",
              grasas: "1.3g",
              carbohidratos: "19.5g",
              datos_nutricionales: {
                grasas_totales: "4.7g",
                colesterol: "105mg",
                sodio: "60mg",
                potasio: "70mg",
                cabohidratos: "0.3g"
              }
            },
            {
              _id: "5f2a998ee3e1310abc31f609",
              nombre: "Tucumana",
              img: "path/img/papa.png",
      
              calorias: "102.5",
              proteina: "0.15g",
              grasas: "1.3g",
              carbohidratos: "19.5g",
              datos_nutricionales: {
                grasas_totales: "4.7g",
                colesterol: "105mg",
                sodio: "60mg",
                potasio: "70mg",
                cabohidratos: "0.3g"
              }
            },
            {
              _id: "5f2a998ee3e1310abc31f609",
              nombre: "Ensalada de la huerta",
              img: "path/img/ensalada.png",
      
              calorias: "102.5",
              proteina: "0.15g",
              grasas: "1.3g",
              carbohidratos: "19.5g",
              datos_nutricionales: {
                grasas_totales: "4.7g",
                colesterol: "105mg",
                sodio: "60mg",
                potasio: "70mg",
                cabohidratos: "0.3g"
              }
            }
          ]
        },
        {
          _id: "5f2a99b4e3e1310abc31f60a",
          tipo: "Merienda",
          detalle: "Lista de alimentos para la merienda",
          alimentos: [
            {
              _id: "5f2a99b4e3e1310abc31f6b2",
              nombre: "Cuñape",
              img: "path/img/img1.png",
              calorias: "105.5",
              proteina: "0.25g",
              grasas: "6.3g",
              carbohidratos: "21.5g",
              datos_nutricionales: {
                grasas_totales: "3.7g",
                colesterol: "105mg",
                sodio: "60mg",
                potasio: "70mg",
                cabohidratos: "0.3g"
              }
            },
            {
              _id: "5f2a99d3e3e1310abc31f60b",
              nombre: "Queue del día",
              img: "path/img/queue.png",
              calorias: "105.5",
              proteina: "0.15g",
              grasas: "1.3g",
              carbohidratos: "19.5g",
              datos_nutricionales: {
                grasas_totales: "4.7g",
                colesterol: "105mg",
                sodio: "60mg",
                potasio: "70mg",
                cabohidratos: "0.3g"
              }
            },
            {
              _id: "5f2a99fae3e1310abc31f60c",
              nombre: "Pan con pasas",
              img: "path/img/pan_pasas.png",
              calorias: "105.5",
              proteina: "0.15g",
              grasas: "1.3g",
              carbohidratos: "19.5g",
              datos_nutricionales: {
                grasas_totales: "4.7g",
                colesterol: "105mg",
                sodio: "60mg",
                potasio: "70mg",
                cabohidratos: "0.3g"
              }
            }
          ]
        },
      ];

    res.status(200).json({
      message: 'Tipos de alimentos',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  const { body: _data } = req

  try {
    const data = await exampleService.createExampless({ _data })
  
    res.status(201).json({
      message: 'Example created',
      data
    })
  } catch(err) {
    next(err)
  }
})

router.put('/:id', async (req, res, next) => {
    const { id } = req.params
    const { body: _data } = req

    try {
      const data = await exampleService.updateExampless({ id, data: _data })
    
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
    const data = await exampleService.deleteExampless(id)
  
    res.status(200).json({
      message: 'Example deleted',
      data
    })
  } catch(err) {
    next(err)
  }
})

export default router
