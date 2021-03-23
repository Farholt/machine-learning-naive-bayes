import { indexOf } from 'list'

/**
 * @description a simple function that translates string label to integer based on index
 * @param obj
 */
const labelToInt = (obj) => {
  let size = 0
  let tmp = {}

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      tmp[size] = obj[key]
      delete obj[key]
      size++
    }
  }

  return tmp
}

/**
 *
 * @description this function helps figuring out which class a value belongs to
 * @param x
 * @param mean
 * @param stdev
 */
const probability = (x: number, mean: number, stdev: number) => {
  let x1: number = Math.exp(-(Math.pow(x - mean, 2) / (2 * Math.pow(stdev, 2))))
  let x2: number = 1 / (Math.sqrt(2 * Math.PI) * stdev)
  return x2 * x1
}

export class NaiveBayes {
  obj: Object
  label: Array<any>
  nOfAttributes: number
  type: string

  constructor() {
    this.obj = {}
    this.label = []
  }

  /**
   * @description this method seperates data based on class
   * @param data
   */
  group = (data: Array<string | number>) => {
    /* This loop groups respective data into its own array */
    for (let i = 0; i < data.length; i++) {
      let tmp = data[i][Object.keys(data[i])[Object.keys(data[i]).length - 1]] // class name, e.g. Iris-setosa

      if (!this.obj[tmp]) {
        this.label.push([this.label.length])
        this.obj[tmp] = []
      }

      /* Attributes of class, e.g. (petal-width, petal-length etc.) */
      let attributes = Object.keys(data[i])
      this.type = attributes.pop() // save and remove, e.g. "species" from object

      if (data[i][this.type] === tmp) {
        // delete data[i][type]
        data[i][this.type] = this.label.length - 1 // changing class name to number
        this.obj[tmp].push(data[i])
      }
    }

    // console.log(this.obj)

    /* This function renames the name to the correct integer */
    this.obj = labelToInt(this.obj)

    /* This sets number of attributes */
    for (let key in this.obj) {
      if (this.obj.hasOwnProperty(key)) {
        this.nOfAttributes = Object.keys(this.obj[key][0]).length
      }
    }

    /* Push data and known labels to fit for training */
    this.fit(this.obj, this.label)
  }

  /**
   * @description this method helps train the model
   * @param x
   * @param y
   */
  fit = (X: Object, y: Array<number>): void => {
    /* This loop creates the labels */
    /* Go through each object and store as label */
    for (let key in X) {
      if (X.hasOwnProperty(key)) {
        let labelKey = y[key]

        if (labelKey == key) {
          this.label[key] = []

          /* These are placeholders and are to be replaced by 'real' data through mean and stdev methods */
          let meanArr = new Array(this.nOfAttributes).fill(0)
          let stdvArr = new Array(this.nOfAttributes).fill(0)

          /* Create new label */
          this.label[key].push({
            id: key,
            data: X[key],
            mean: meanArr,
            stdev: stdvArr,
            prob: 0
          })
        }
      }
    }

    /* Calculate mean and standard deviation after we've created the labels */
    this.mean()
    this.stdev()
  }

  /**
   * @description this calculates mean
   */
  mean = (): void => {
    /* Calculate mean by data in each label */
    for (let i = 0; i < this.label.length; i++) {
      let label = this.label[i][0] // nested array, therefore [0]
      let data = label.data

      /* Loop each data object */
      for (let j = 0; j < data.length; j++) {
        /* Sum each attribute */
        let ii = 0
        for (let key in data[j]) {
          if (data[j].hasOwnProperty(key)) {
            let tmp = parseFloat(data[j][key])
            label.mean[ii] += tmp
            ii++
          }
        }
      }
      for (let j = 0; j < this.nOfAttributes; j++) {
        label.mean[j] /= data.length
      }
    }
  }

  /**
   * @description this calculates standard deviation
   */
  stdev = (): void => {
    /* Calculate standard deviation based on data in each label */
    for (let i = 0; i < this.label.length; i++) {
      let label = this.label[i][0] // nested array, therefore [0]
      let data = label.data

      /* Loop each data object */
      for (let j = 0; j < data.length; j++) {
        /* Calculate each attribute */
        let ii = 0
        for (let key in data[j]) {
          if (data[j].hasOwnProperty(key)) {
            let tmp = parseFloat(data[j][key])
            label.stdev[ii] += Math.pow(tmp - label.mean[ii], 2)
            ii++
          }
        }
      }
      for (let j = 0; j < this.nOfAttributes; j++) {
        label.stdev[j] /= data.length - 1
        label.stdev[j] = Math.sqrt(label.stdev[j])
      }
    }
  }

  /**
   * @description this method produces a list of predictions based on instances
   * @param X
   */
  predict(X: Array<number>) {
    let pred = []

    /* Goes through */
    for (let i = 0; i < X.length; i++) {
      pred.push(this.classification(X[i]))
    }

    console.log(pred)

    return pred
  }

  /**
   * @description this method classifies each instances
   * @param X
   */
  classification = (X: Object) => {
    for (let i = 0; i < this.label.length; i++) {
      let e = this.label[i][0]
      let p: number = 0.0

      let j = 0
      for (let key in X) {
        if (X.hasOwnProperty(key)) {
          let tmp = Math.log(probability(X[key], e.mean[j], e.stdev[j]))
          if (!isNaN(tmp)) {
            p += tmp
          }
          j++
        }
      }
      e.prob = Math.exp(p)
    }

    return this.bestLabel()
  }

  /**
   * @description this method returns the best suited label for an instance
   */
  bestLabel = () => {
    let max: number = 0
    let index: number = -1

    for (let i = 0; i < this.label.length; i++) {
      let e = this.label[i][0]

      if (e.prob > max || index == -1) {
        max = this.label[i][0].prob
        index = i
      }
    }

    return this.label[index][0].id
  }
}
