import { NextApiRequest, NextApiResponse } from 'next'
let csvToJson = require('convert-csv-to-json')

/* TypeScript Class */
import { NaiveBayes } from '../../shared/class/NaiveBayes'

const accuracy_score = (
  pred: Array<number>,
  data: Array<number>,
  type: string,
  file: string
): Object => {
  let correct: number = 0

  for (let i = 0; i < pred.length; i++) {
    if (pred[i] == data[i][type]) correct++
  }

  return {
    file: file,
    correctly_classified: correct,
    examples: pred.length,
    accuracy: (correct / data.length) * 100
  }
}

/**
 * @description api
 * @param req
 * @param res
 */
const nb = (req: NextApiRequest, res: NextApiResponse) => {
  // const file = 'banknote_authentication.csv'
  const file = 'iris.csv'

  /* Convert csv to json */
  const data = csvToJson
    .fieldDelimiter(',')
    .getJsonFromCsv(`./shared/data/${file}`)

  const nb = new NaiveBayes()
  nb.group(data)
  let predictions = accuracy_score(nb.predict(data), data, nb.type, file)

  res.send(JSON.stringify(predictions, null, 2))
}

export default nb
