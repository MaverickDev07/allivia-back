import path from 'path'
import * as XLSX from 'xlsx'

function datosExcel() {
  const ruta = path.join(__dirname, 'alimentos.xls')
  const workbook = XLSX.readFile(ruta)
  const workbookSheets = workbook.SheetNames
  const sheet = workbookSheets[0]
  const dataExcel = XLSX.utils.sheet_to_json(workbook.Sheets[sheet])
  const data = {}
  let nombresDB = []
  let cll_alimentos = []
  let count, info, datosNut = {}

  for (const fila of dataExcel) {
    for (var key in fila) {
      nombresDB.push(key)
    }
    break
  }

  for (const fila of dataExcel) {
    count = 0
    datosNut = {}

    data['nombre'] = fila['Alimentos']
    data['img'] = null
    data['calorias'] = Number(fila['calorias'])

    data['proteina'] = { valor: Number(fila['proteina g']), medida: 'g' }
    data['grasas'] = { valor: Number(fila['grasas g']), medida: 'g' }
    data['carbohidratos'] = { valor: Number(0), medida: 'g' }

    for (let key in fila) {
      info = key.split(' ')

      if (
        key == 'Alimentos' ||
        key == 'calorias' ||
        key == 'proteina g' ||
        key == 'grasas g' ||
        key == 'Num'
      ) {
        continue
      }

      if ( key.includes(' ') )
        datosNut[info[0]] = { valor: Number(fila[key]), medida: info[1] }
      else
        datosNut[key] = { valor: Number(fila[key]), medida: '' }

      count++
    }

    data['datos_nutricionales'] = datosNut
    cll_alimentos.push(Object.assign({} , data))
  }

  return cll_alimentos
}

module.exports = {
  datosExcel
}
