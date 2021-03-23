module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./pages/api/nb.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/api/nb.ts":
/*!*************************!*\
  !*** ./pages/api/nb.ts ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _shared_class_NaiveBayes__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../shared/class/NaiveBayes */ "./shared/class/NaiveBayes.ts");
let csvToJson = __webpack_require__(/*! convert-csv-to-json */ "convert-csv-to-json");
/* TypeScript Class */




const accuracy_score = (pred, data, type, file) => {
  let correct = 0;

  for (let i = 0; i < pred.length; i++) {
    if (pred[i] == data[i][type]) correct++;
  }

  return {
    file: file,
    correctly_classified: correct,
    examples: pred.length,
    accuracy: correct / data.length * 100
  };
};
/**
 * @description api
 * @param req
 * @param res
 */


const nb = (req, res) => {
  // const file = 'banknote_authentication.csv'
  const file = 'iris.csv';
  /* Convert csv to json */

  const data = csvToJson.fieldDelimiter(',').getJsonFromCsv(`./shared/data/${file}`);
  const nb = new _shared_class_NaiveBayes__WEBPACK_IMPORTED_MODULE_0__["NaiveBayes"]();
  nb.group(data);
  let predictions = accuracy_score(nb.predict(data), data, nb.type, file);
  res.send(JSON.stringify(predictions, null, 2));
};

/* harmony default export */ __webpack_exports__["default"] = (nb);

/***/ }),

/***/ "./shared/class/NaiveBayes.ts":
/*!************************************!*\
  !*** ./shared/class/NaiveBayes.ts ***!
  \************************************/
/*! exports provided: NaiveBayes */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NaiveBayes", function() { return NaiveBayes; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * @description a simple function that translates string label to integer based on index
 * @param obj
 */
const labelToInt = obj => {
  let size = 0;
  let tmp = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      tmp[size] = obj[key];
      delete obj[key];
      size++;
    }
  }

  return tmp;
};
/**
 *
 * @description this function helps figuring out which class a value belongs to
 * @param x
 * @param mean
 * @param stdev
 */


const probability = (x, mean, stdev) => {
  let x1 = Math.exp(-(Math.pow(x - mean, 2) / (2 * Math.pow(stdev, 2))));
  let x2 = 1 / (Math.sqrt(2 * Math.PI) * stdev);
  return x2 * x1;
};

class NaiveBayes {
  constructor() {
    _defineProperty(this, "obj", void 0);

    _defineProperty(this, "label", void 0);

    _defineProperty(this, "nOfAttributes", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "group", data => {
      /* This loop groups respective data into its own array */
      for (let i = 0; i < data.length; i++) {
        let tmp = data[i][Object.keys(data[i])[Object.keys(data[i]).length - 1]]; // class name, e.g. Iris-setosa

        if (!this.obj[tmp]) {
          this.label.push([this.label.length]);
          this.obj[tmp] = [];
        }
        /* Attributes of class, e.g. (petal-width, petal-length etc.) */


        let attributes = Object.keys(data[i]);
        this.type = attributes.pop(); // save and remove, e.g. "species" from object

        if (data[i][this.type] === tmp) {
          // delete data[i][type]
          data[i][this.type] = this.label.length - 1; // changing class name to number

          this.obj[tmp].push(data[i]);
        }
      } // console.log(this.obj)

      /* This function renames the name to the correct integer */


      this.obj = labelToInt(this.obj);
      /* This sets number of attributes */

      for (let key in this.obj) {
        if (this.obj.hasOwnProperty(key)) {
          this.nOfAttributes = Object.keys(this.obj[key][0]).length;
        }
      }
      /* Push data and known labels to fit for training */


      this.fit(this.obj, this.label);
    });

    _defineProperty(this, "fit", (X, y) => {
      /* This loop creates the labels */

      /* Go through each object and store as label */
      for (let key in X) {
        if (X.hasOwnProperty(key)) {
          let labelKey = y[key];

          if (labelKey == key) {
            this.label[key] = [];
            /* These are placeholders and are to be replaced by 'real' data through mean and stdev methods */

            let meanArr = new Array(this.nOfAttributes).fill(0);
            let stdvArr = new Array(this.nOfAttributes).fill(0);
            /* Create new label */

            this.label[key].push({
              id: key,
              data: X[key],
              mean: meanArr,
              stdev: stdvArr,
              prob: 0
            });
          }
        }
      }
      /* Calculate mean and standard deviation after we've created the labels */


      this.mean();
      this.stdev();
    });

    _defineProperty(this, "mean", () => {
      /* Calculate mean by data in each label */
      for (let i = 0; i < this.label.length; i++) {
        let label = this.label[i][0]; // nested array, therefore [0]

        let data = label.data;
        /* Loop each data object */

        for (let j = 0; j < data.length; j++) {
          /* Sum each attribute */
          let ii = 0;

          for (let key in data[j]) {
            if (data[j].hasOwnProperty(key)) {
              let tmp = parseFloat(data[j][key]);
              label.mean[ii] += tmp;
              ii++;
            }
          }
        }

        for (let j = 0; j < this.nOfAttributes; j++) {
          label.mean[j] /= data.length;
        }
      }
    });

    _defineProperty(this, "stdev", () => {
      /* Calculate standard deviation based on data in each label */
      for (let i = 0; i < this.label.length; i++) {
        let label = this.label[i][0]; // nested array, therefore [0]

        let data = label.data;
        /* Loop each data object */

        for (let j = 0; j < data.length; j++) {
          /* Calculate each attribute */
          let ii = 0;

          for (let key in data[j]) {
            if (data[j].hasOwnProperty(key)) {
              let tmp = parseFloat(data[j][key]);
              label.stdev[ii] += Math.pow(tmp - label.mean[ii], 2);
              ii++;
            }
          }
        }

        for (let j = 0; j < this.nOfAttributes; j++) {
          label.stdev[j] /= data.length - 1;
          label.stdev[j] = Math.sqrt(label.stdev[j]);
        }
      }
    });

    _defineProperty(this, "classification", X => {
      for (let i = 0; i < this.label.length; i++) {
        let e = this.label[i][0];
        let p = 0.0;
        let j = 0;

        for (let key in X) {
          if (X.hasOwnProperty(key)) {
            let tmp = Math.log(probability(X[key], e.mean[j], e.stdev[j]));

            if (!isNaN(tmp)) {
              p += tmp;
            }

            j++;
          }
        }

        e.prob = Math.exp(p);
      }

      return this.bestLabel();
    });

    _defineProperty(this, "bestLabel", () => {
      let max = 0;
      let index = -1;

      for (let i = 0; i < this.label.length; i++) {
        let e = this.label[i][0];

        if (e.prob > max || index == -1) {
          max = this.label[i][0].prob;
          index = i;
        }
      }

      return this.label[index][0].id;
    });

    this.obj = {};
    this.label = [];
  }
  /**
   * @description this method seperates data based on class
   * @param data
   */


  /**
   * @description this method produces a list of predictions based on instances
   * @param X
   */
  predict(X) {
    let pred = [];
    /* Goes through */

    for (let i = 0; i < X.length; i++) {
      pred.push(this.classification(X[i]));
    }

    console.log(pred);
    return pred;
  }
  /**
   * @description this method classifies each instances
   * @param X
   */


}

/***/ }),

/***/ "convert-csv-to-json":
/*!**************************************!*\
  !*** external "convert-csv-to-json" ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("convert-csv-to-json");

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL25iLnRzIiwid2VicGFjazovLy8uL3NoYXJlZC9jbGFzcy9OYWl2ZUJheWVzLnRzIiwid2VicGFjazovLy9leHRlcm5hbCBcImNvbnZlcnQtY3N2LXRvLWpzb25cIiJdLCJuYW1lcyI6WyJjc3ZUb0pzb24iLCJyZXF1aXJlIiwiYWNjdXJhY3lfc2NvcmUiLCJwcmVkIiwiZGF0YSIsInR5cGUiLCJmaWxlIiwiY29ycmVjdCIsImkiLCJsZW5ndGgiLCJjb3JyZWN0bHlfY2xhc3NpZmllZCIsImV4YW1wbGVzIiwiYWNjdXJhY3kiLCJuYiIsInJlcSIsInJlcyIsImZpZWxkRGVsaW1pdGVyIiwiZ2V0SnNvbkZyb21Dc3YiLCJOYWl2ZUJheWVzIiwiZ3JvdXAiLCJwcmVkaWN0aW9ucyIsInByZWRpY3QiLCJzZW5kIiwiSlNPTiIsInN0cmluZ2lmeSIsImxhYmVsVG9JbnQiLCJvYmoiLCJzaXplIiwidG1wIiwia2V5IiwiaGFzT3duUHJvcGVydHkiLCJwcm9iYWJpbGl0eSIsIngiLCJtZWFuIiwic3RkZXYiLCJ4MSIsIk1hdGgiLCJleHAiLCJwb3ciLCJ4MiIsInNxcnQiLCJQSSIsImNvbnN0cnVjdG9yIiwiT2JqZWN0Iiwia2V5cyIsImxhYmVsIiwicHVzaCIsImF0dHJpYnV0ZXMiLCJwb3AiLCJuT2ZBdHRyaWJ1dGVzIiwiZml0IiwiWCIsInkiLCJsYWJlbEtleSIsIm1lYW5BcnIiLCJBcnJheSIsImZpbGwiLCJzdGR2QXJyIiwiaWQiLCJwcm9iIiwiaiIsImlpIiwicGFyc2VGbG9hdCIsImUiLCJwIiwibG9nIiwiaXNOYU4iLCJiZXN0TGFiZWwiLCJtYXgiLCJpbmRleCIsImNsYXNzaWZpY2F0aW9uIiwiY29uc29sZSJdLCJtYXBwaW5ncyI6Ijs7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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RzdELENBQVI7QUFDRDtBQUNGOztBQUVELGFBQU8sS0FBS3FDLEtBQUwsQ0FBV3dCLEtBQVgsRUFBa0IsQ0FBbEIsRUFBcUJYLEVBQTVCO0FBQ0QsS0FwTWE7O0FBQ1osU0FBS2hDLEdBQUwsR0FBVyxFQUFYO0FBQ0EsU0FBS21CLEtBQUwsR0FBYSxFQUFiO0FBQ0Q7QUFFRDtBQUNGO0FBQ0E7QUFDQTs7O0FBaUlFO0FBQ0Y7QUFDQTtBQUNBO0FBQ0V4QixTQUFPLENBQUM4QixDQUFELEVBQW1CO0FBQ3hCLFFBQUloRCxJQUFJLEdBQUcsRUFBWDtBQUVBOztBQUNBLFNBQUssSUFBSUssQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBRzJDLENBQUMsQ0FBQzFDLE1BQXRCLEVBQThCRCxDQUFDLEVBQS9CLEVBQW1DO0FBQ2pDTCxVQUFJLENBQUMyQyxJQUFMLENBQVUsS0FBS3dCLGNBQUwsQ0FBb0JuQixDQUFDLENBQUMzQyxDQUFELENBQXJCLENBQVY7QUFDRDs7QUFFRCtELFdBQU8sQ0FBQ04sR0FBUixDQUFZOUQsSUFBWjtBQUVBLFdBQU9BLElBQVA7QUFDRDtBQUVEO0FBQ0Y7QUFDQTtBQUNBOzs7QUFuS3dCLEM7Ozs7Ozs7Ozs7O0FDbEN4QixnRCIsImZpbGUiOiJwYWdlcy9hcGkvbmIuanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHJlcXVpcmUoJy4uLy4uL3Nzci1tb2R1bGUtY2FjaGUuanMnKTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0dmFyIHRocmV3ID0gdHJ1ZTtcbiBcdFx0dHJ5IHtcbiBcdFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcbiBcdFx0XHR0aHJldyA9IGZhbHNlO1xuIFx0XHR9IGZpbmFsbHkge1xuIFx0XHRcdGlmKHRocmV3KSBkZWxldGUgaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF07XG4gXHRcdH1cblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3BhZ2VzL2FwaS9uYi50c1wiKTtcbiIsImltcG9ydCB7IE5leHRBcGlSZXF1ZXN0LCBOZXh0QXBpUmVzcG9uc2UgfSBmcm9tICduZXh0J1xyXG5sZXQgY3N2VG9Kc29uID0gcmVxdWlyZSgnY29udmVydC1jc3YtdG8tanNvbicpXHJcblxyXG4vKiBUeXBlU2NyaXB0IENsYXNzICovXHJcbmltcG9ydCB7IE5haXZlQmF5ZXMgfSBmcm9tICcuLi8uLi9zaGFyZWQvY2xhc3MvTmFpdmVCYXllcydcclxuXHJcbmNvbnN0IGFjY3VyYWN5X3Njb3JlID0gKFxyXG4gIHByZWQ6IEFycmF5PG51bWJlcj4sXHJcbiAgZGF0YTogQXJyYXk8bnVtYmVyPixcclxuICB0eXBlOiBzdHJpbmcsXHJcbiAgZmlsZTogc3RyaW5nXHJcbik6IE9iamVjdCA9PiB7XHJcbiAgbGV0IGNvcnJlY3Q6IG51bWJlciA9IDBcclxuXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBwcmVkLmxlbmd0aDsgaSsrKSB7XHJcbiAgICBpZiAocHJlZFtpXSA9PSBkYXRhW2ldW3R5cGVdKSBjb3JyZWN0KytcclxuICB9XHJcblxyXG4gIHJldHVybiB7XHJcbiAgICBmaWxlOiBmaWxlLFxyXG4gICAgY29ycmVjdGx5X2NsYXNzaWZpZWQ6IGNvcnJlY3QsXHJcbiAgICBleGFtcGxlczogcHJlZC5sZW5ndGgsXHJcbiAgICBhY2N1cmFjeTogKGNvcnJlY3QgLyBkYXRhLmxlbmd0aCkgKiAxMDBcclxuICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBAZGVzY3JpcHRpb24gYXBpXHJcbiAqIEBwYXJhbSByZXFcclxuICogQHBhcmFtIHJlc1xyXG4gKi9cclxuY29uc3QgbmIgPSAocmVxOiBOZXh0QXBpUmVxdWVzdCwgcmVzOiBOZXh0QXBpUmVzcG9uc2UpID0+IHtcclxuICAvLyBjb25zdCBmaWxlID0gJ2Jhbmtub3RlX2F1dGhlbnRpY2F0aW9uLmNzdidcclxuICBjb25zdCBmaWxlID0gJ2lyaXMuY3N2J1xyXG5cclxuICAvKiBDb252ZXJ0IGNzdiB0byBqc29uICovXHJcbiAgY29uc3QgZGF0YSA9IGNzdlRvSnNvblxyXG4gICAgLmZpZWxkRGVsaW1pdGVyKCcsJylcclxuICAgIC5nZXRKc29uRnJvbUNzdihgLi9zaGFyZWQvZGF0YS8ke2ZpbGV9YClcclxuXHJcbiAgY29uc3QgbmIgPSBuZXcgTmFpdmVCYXllcygpXHJcbiAgbmIuZ3JvdXAoZGF0YSlcclxuICBsZXQgcHJlZGljdGlvbnMgPSBhY2N1cmFjeV9zY29yZShuYi5wcmVkaWN0KGRhdGEpLCBkYXRhLCBuYi50eXBlLCBmaWxlKVxyXG5cclxuICByZXMuc2VuZChKU09OLnN0cmluZ2lmeShwcmVkaWN0aW9ucywgbnVsbCwgMikpXHJcbn1cclxuXHJcbmV4cG9ydCBkZWZhdWx0IG5iXHJcbiIsImltcG9ydCB7IGluZGV4T2YgfSBmcm9tICdsaXN0J1xyXG5cclxuLyoqXHJcbiAqIEBkZXNjcmlwdGlvbiBhIHNpbXBsZSBmdW5jdGlvbiB0aGF0IHRyYW5zbGF0ZXMgc3RyaW5nIGxhYmVsIHRvIGludGVnZXIgYmFzZWQgb24gaW5kZXhcclxuICogQHBhcmFtIG9ialxyXG4gKi9cclxuY29uc3QgbGFiZWxUb0ludCA9IChvYmopID0+IHtcclxuICBsZXQgc2l6ZSA9IDBcclxuICBsZXQgdG1wID0ge31cclxuXHJcbiAgZm9yIChsZXQga2V5IGluIG9iaikge1xyXG4gICAgaWYgKG9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgIHRtcFtzaXplXSA9IG9ialtrZXldXHJcbiAgICAgIGRlbGV0ZSBvYmpba2V5XVxyXG4gICAgICBzaXplKytcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHJldHVybiB0bXBcclxufVxyXG5cclxuLyoqXHJcbiAqXHJcbiAqIEBkZXNjcmlwdGlvbiB0aGlzIGZ1bmN0aW9uIGhlbHBzIGZpZ3VyaW5nIG91dCB3aGljaCBjbGFzcyBhIHZhbHVlIGJlbG9uZ3MgdG9cclxuICogQHBhcmFtIHhcclxuICogQHBhcmFtIG1lYW5cclxuICogQHBhcmFtIHN0ZGV2XHJcbiAqL1xyXG5jb25zdCBwcm9iYWJpbGl0eSA9ICh4OiBudW1iZXIsIG1lYW46IG51bWJlciwgc3RkZXY6IG51bWJlcikgPT4ge1xyXG4gIGxldCB4MTogbnVtYmVyID0gTWF0aC5leHAoLShNYXRoLnBvdyh4IC0gbWVhbiwgMikgLyAoMiAqIE1hdGgucG93KHN0ZGV2LCAyKSkpKVxyXG4gIGxldCB4MjogbnVtYmVyID0gMSAvIChNYXRoLnNxcnQoMiAqIE1hdGguUEkpICogc3RkZXYpXHJcbiAgcmV0dXJuIHgyICogeDFcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE5haXZlQmF5ZXMge1xyXG4gIG9iajogT2JqZWN0XHJcbiAgbGFiZWw6IEFycmF5PGFueT5cclxuICBuT2ZBdHRyaWJ1dGVzOiBudW1iZXJcclxuICB0eXBlOiBzdHJpbmdcclxuXHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLm9iaiA9IHt9XHJcbiAgICB0aGlzLmxhYmVsID0gW11cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiB0aGlzIG1ldGhvZCBzZXBlcmF0ZXMgZGF0YSBiYXNlZCBvbiBjbGFzc1xyXG4gICAqIEBwYXJhbSBkYXRhXHJcbiAgICovXHJcbiAgZ3JvdXAgPSAoZGF0YTogQXJyYXk8c3RyaW5nIHwgbnVtYmVyPikgPT4ge1xyXG4gICAgLyogVGhpcyBsb29wIGdyb3VwcyByZXNwZWN0aXZlIGRhdGEgaW50byBpdHMgb3duIGFycmF5ICovXHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IHRtcCA9IGRhdGFbaV1bT2JqZWN0LmtleXMoZGF0YVtpXSlbT2JqZWN0LmtleXMoZGF0YVtpXSkubGVuZ3RoIC0gMV1dIC8vIGNsYXNzIG5hbWUsIGUuZy4gSXJpcy1zZXRvc2FcclxuXHJcbiAgICAgIGlmICghdGhpcy5vYmpbdG1wXSkge1xyXG4gICAgICAgIHRoaXMubGFiZWwucHVzaChbdGhpcy5sYWJlbC5sZW5ndGhdKVxyXG4gICAgICAgIHRoaXMub2JqW3RtcF0gPSBbXVxyXG4gICAgICB9XHJcblxyXG4gICAgICAvKiBBdHRyaWJ1dGVzIG9mIGNsYXNzLCBlLmcuIChwZXRhbC13aWR0aCwgcGV0YWwtbGVuZ3RoIGV0Yy4pICovXHJcbiAgICAgIGxldCBhdHRyaWJ1dGVzID0gT2JqZWN0LmtleXMoZGF0YVtpXSlcclxuICAgICAgdGhpcy50eXBlID0gYXR0cmlidXRlcy5wb3AoKSAvLyBzYXZlIGFuZCByZW1vdmUsIGUuZy4gXCJzcGVjaWVzXCIgZnJvbSBvYmplY3RcclxuXHJcbiAgICAgIGlmIChkYXRhW2ldW3RoaXMudHlwZV0gPT09IHRtcCkge1xyXG4gICAgICAgIC8vIGRlbGV0ZSBkYXRhW2ldW3R5cGVdXHJcbiAgICAgICAgZGF0YVtpXVt0aGlzLnR5cGVdID0gdGhpcy5sYWJlbC5sZW5ndGggLSAxIC8vIGNoYW5naW5nIGNsYXNzIG5hbWUgdG8gbnVtYmVyXHJcbiAgICAgICAgdGhpcy5vYmpbdG1wXS5wdXNoKGRhdGFbaV0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjb25zb2xlLmxvZyh0aGlzLm9iailcclxuXHJcbiAgICAvKiBUaGlzIGZ1bmN0aW9uIHJlbmFtZXMgdGhlIG5hbWUgdG8gdGhlIGNvcnJlY3QgaW50ZWdlciAqL1xyXG4gICAgdGhpcy5vYmogPSBsYWJlbFRvSW50KHRoaXMub2JqKVxyXG5cclxuICAgIC8qIFRoaXMgc2V0cyBudW1iZXIgb2YgYXR0cmlidXRlcyAqL1xyXG4gICAgZm9yIChsZXQga2V5IGluIHRoaXMub2JqKSB7XHJcbiAgICAgIGlmICh0aGlzLm9iai5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XHJcbiAgICAgICAgdGhpcy5uT2ZBdHRyaWJ1dGVzID0gT2JqZWN0LmtleXModGhpcy5vYmpba2V5XVswXSkubGVuZ3RoXHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBQdXNoIGRhdGEgYW5kIGtub3duIGxhYmVscyB0byBmaXQgZm9yIHRyYWluaW5nICovXHJcbiAgICB0aGlzLmZpdCh0aGlzLm9iaiwgdGhpcy5sYWJlbClcclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiB0aGlzIG1ldGhvZCBoZWxwcyB0cmFpbiB0aGUgbW9kZWxcclxuICAgKiBAcGFyYW0geFxyXG4gICAqIEBwYXJhbSB5XHJcbiAgICovXHJcbiAgZml0ID0gKFg6IE9iamVjdCwgeTogQXJyYXk8bnVtYmVyPik6IHZvaWQgPT4ge1xyXG4gICAgLyogVGhpcyBsb29wIGNyZWF0ZXMgdGhlIGxhYmVscyAqL1xyXG4gICAgLyogR28gdGhyb3VnaCBlYWNoIG9iamVjdCBhbmQgc3RvcmUgYXMgbGFiZWwgKi9cclxuICAgIGZvciAobGV0IGtleSBpbiBYKSB7XHJcbiAgICAgIGlmIChYLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICBsZXQgbGFiZWxLZXkgPSB5W2tleV1cclxuXHJcbiAgICAgICAgaWYgKGxhYmVsS2V5ID09IGtleSkge1xyXG4gICAgICAgICAgdGhpcy5sYWJlbFtrZXldID0gW11cclxuXHJcbiAgICAgICAgICAvKiBUaGVzZSBhcmUgcGxhY2Vob2xkZXJzIGFuZCBhcmUgdG8gYmUgcmVwbGFjZWQgYnkgJ3JlYWwnIGRhdGEgdGhyb3VnaCBtZWFuIGFuZCBzdGRldiBtZXRob2RzICovXHJcbiAgICAgICAgICBsZXQgbWVhbkFyciA9IG5ldyBBcnJheSh0aGlzLm5PZkF0dHJpYnV0ZXMpLmZpbGwoMClcclxuICAgICAgICAgIGxldCBzdGR2QXJyID0gbmV3IEFycmF5KHRoaXMubk9mQXR0cmlidXRlcykuZmlsbCgwKVxyXG5cclxuICAgICAgICAgIC8qIENyZWF0ZSBuZXcgbGFiZWwgKi9cclxuICAgICAgICAgIHRoaXMubGFiZWxba2V5XS5wdXNoKHtcclxuICAgICAgICAgICAgaWQ6IGtleSxcclxuICAgICAgICAgICAgZGF0YTogWFtrZXldLFxyXG4gICAgICAgICAgICBtZWFuOiBtZWFuQXJyLFxyXG4gICAgICAgICAgICBzdGRldjogc3RkdkFycixcclxuICAgICAgICAgICAgcHJvYjogMFxyXG4gICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiBDYWxjdWxhdGUgbWVhbiBhbmQgc3RhbmRhcmQgZGV2aWF0aW9uIGFmdGVyIHdlJ3ZlIGNyZWF0ZWQgdGhlIGxhYmVscyAqL1xyXG4gICAgdGhpcy5tZWFuKClcclxuICAgIHRoaXMuc3RkZXYoKVxyXG4gIH1cclxuXHJcbiAgLyoqXHJcbiAgICogQGRlc2NyaXB0aW9uIHRoaXMgY2FsY3VsYXRlcyBtZWFuXHJcbiAgICovXHJcbiAgbWVhbiA9ICgpOiB2b2lkID0+IHtcclxuICAgIC8qIENhbGN1bGF0ZSBtZWFuIGJ5IGRhdGEgaW4gZWFjaCBsYWJlbCAqL1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxhYmVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBsYWJlbCA9IHRoaXMubGFiZWxbaV1bMF0gLy8gbmVzdGVkIGFycmF5LCB0aGVyZWZvcmUgWzBdXHJcbiAgICAgIGxldCBkYXRhID0gbGFiZWwuZGF0YVxyXG5cclxuICAgICAgLyogTG9vcCBlYWNoIGRhdGEgb2JqZWN0ICovXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIC8qIFN1bSBlYWNoIGF0dHJpYnV0ZSAqL1xyXG4gICAgICAgIGxldCBpaSA9IDBcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YVtqXSkge1xyXG4gICAgICAgICAgaWYgKGRhdGFbal0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBsZXQgdG1wID0gcGFyc2VGbG9hdChkYXRhW2pdW2tleV0pXHJcbiAgICAgICAgICAgIGxhYmVsLm1lYW5baWldICs9IHRtcFxyXG4gICAgICAgICAgICBpaSsrXHJcbiAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICB9XHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgdGhpcy5uT2ZBdHRyaWJ1dGVzOyBqKyspIHtcclxuICAgICAgICBsYWJlbC5tZWFuW2pdIC89IGRhdGEubGVuZ3RoXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiB0aGlzIGNhbGN1bGF0ZXMgc3RhbmRhcmQgZGV2aWF0aW9uXHJcbiAgICovXHJcbiAgc3RkZXYgPSAoKTogdm9pZCA9PiB7XHJcbiAgICAvKiBDYWxjdWxhdGUgc3RhbmRhcmQgZGV2aWF0aW9uIGJhc2VkIG9uIGRhdGEgaW4gZWFjaCBsYWJlbCAqL1xyXG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmxhYmVsLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgIGxldCBsYWJlbCA9IHRoaXMubGFiZWxbaV1bMF0gLy8gbmVzdGVkIGFycmF5LCB0aGVyZWZvcmUgWzBdXHJcbiAgICAgIGxldCBkYXRhID0gbGFiZWwuZGF0YVxyXG5cclxuICAgICAgLyogTG9vcCBlYWNoIGRhdGEgb2JqZWN0ICovXHJcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YS5sZW5ndGg7IGorKykge1xyXG4gICAgICAgIC8qIENhbGN1bGF0ZSBlYWNoIGF0dHJpYnV0ZSAqL1xyXG4gICAgICAgIGxldCBpaSA9IDBcclxuICAgICAgICBmb3IgKGxldCBrZXkgaW4gZGF0YVtqXSkge1xyXG4gICAgICAgICAgaWYgKGRhdGFbal0uaGFzT3duUHJvcGVydHkoa2V5KSkge1xyXG4gICAgICAgICAgICBsZXQgdG1wID0gcGFyc2VGbG9hdChkYXRhW2pdW2tleV0pXHJcbiAgICAgICAgICAgIGxhYmVsLnN0ZGV2W2lpXSArPSBNYXRoLnBvdyh0bXAgLSBsYWJlbC5tZWFuW2lpXSwgMilcclxuICAgICAgICAgICAgaWkrK1xyXG4gICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IHRoaXMubk9mQXR0cmlidXRlczsgaisrKSB7XHJcbiAgICAgICAgbGFiZWwuc3RkZXZbal0gLz0gZGF0YS5sZW5ndGggLSAxXHJcbiAgICAgICAgbGFiZWwuc3RkZXZbal0gPSBNYXRoLnNxcnQobGFiZWwuc3RkZXZbal0pXHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcblxyXG4gIC8qKlxyXG4gICAqIEBkZXNjcmlwdGlvbiB0aGlzIG1ldGhvZCBwcm9kdWNlcyBhIGxpc3Qgb2YgcHJlZGljdGlvbnMgYmFzZWQgb24gaW5zdGFuY2VzXHJcbiAgICogQHBhcmFtIFhcclxuICAgKi9cclxuICBwcmVkaWN0KFg6IEFycmF5PG51bWJlcj4pIHtcclxuICAgIGxldCBwcmVkID0gW11cclxuXHJcbiAgICAvKiBHb2VzIHRocm91Z2ggKi9cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgWC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBwcmVkLnB1c2godGhpcy5jbGFzc2lmaWNhdGlvbihYW2ldKSlcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyhwcmVkKVxyXG5cclxuICAgIHJldHVybiBwcmVkXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gdGhpcyBtZXRob2QgY2xhc3NpZmllcyBlYWNoIGluc3RhbmNlc1xyXG4gICAqIEBwYXJhbSBYXHJcbiAgICovXHJcbiAgY2xhc3NpZmljYXRpb24gPSAoWDogT2JqZWN0KSA9PiB7XHJcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHRoaXMubGFiZWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgbGV0IGUgPSB0aGlzLmxhYmVsW2ldWzBdXHJcbiAgICAgIGxldCBwOiBudW1iZXIgPSAwLjBcclxuXHJcbiAgICAgIGxldCBqID0gMFxyXG4gICAgICBmb3IgKGxldCBrZXkgaW4gWCkge1xyXG4gICAgICAgIGlmIChYLmhhc093blByb3BlcnR5KGtleSkpIHtcclxuICAgICAgICAgIGxldCB0bXAgPSBNYXRoLmxvZyhwcm9iYWJpbGl0eShYW2tleV0sIGUubWVhbltqXSwgZS5zdGRldltqXSkpXHJcbiAgICAgICAgICBpZiAoIWlzTmFOKHRtcCkpIHtcclxuICAgICAgICAgICAgcCArPSB0bXBcclxuICAgICAgICAgIH1cclxuICAgICAgICAgIGorK1xyXG4gICAgICAgIH1cclxuICAgICAgfVxyXG4gICAgICBlLnByb2IgPSBNYXRoLmV4cChwKVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmJlc3RMYWJlbCgpXHJcbiAgfVxyXG5cclxuICAvKipcclxuICAgKiBAZGVzY3JpcHRpb24gdGhpcyBtZXRob2QgcmV0dXJucyB0aGUgYmVzdCBzdWl0ZWQgbGFiZWwgZm9yIGFuIGluc3RhbmNlXHJcbiAgICovXHJcbiAgYmVzdExhYmVsID0gKCkgPT4ge1xyXG4gICAgbGV0IG1heDogbnVtYmVyID0gMFxyXG4gICAgbGV0IGluZGV4OiBudW1iZXIgPSAtMVxyXG5cclxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5sYWJlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICBsZXQgZSA9IHRoaXMubGFiZWxbaV1bMF1cclxuXHJcbiAgICAgIGlmIChlLnByb2IgPiBtYXggfHwgaW5kZXggPT0gLTEpIHtcclxuICAgICAgICBtYXggPSB0aGlzLmxhYmVsW2ldWzBdLnByb2JcclxuICAgICAgICBpbmRleCA9IGlcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB0aGlzLmxhYmVsW2luZGV4XVswXS5pZFxyXG4gIH1cclxufVxyXG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb252ZXJ0LWNzdi10by1qc29uXCIpOyJdLCJzb3VyY2VSb290IjoiIn0=