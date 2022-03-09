import { readAsDataURL } from "promise-file-reader"
import getPixels from 'get-pixels'
import { DoGFilter, XDoGFilter, convertToGrayscale } from './xdog'
import { isString } from "util"

const settings = {
  XDoG: true,
  epsilon: 20,
  gpuAccelerated: true,
  phi: 0.1,
  sharpen: 35,
  sigmaOne: 1,
  sigmaTwo: 1.8,
  threshold: 0.4,
}
var initial = {
  pixels: null,
  url: null,
  width: null,
  height: null,
  originalWidth: null,
  originalHeight: null,
  sketched: false,
  rerendering: false,
  options: null,
  filename: null,
  loading: false
}
function isBase64(str) {
  if (isString(str) && str.indexOf('data:') != -1 && str.indexOf('base64') != -1) {
    return true;
  } else {
    return false;
  }
}
async function toUrl(image) {
  // 如果是base64
  if (isBase64(image)) {
    return image
  }
  return await readAsDataURL(image)
}
/**
 * @param {image} File
 */
export const loadImage = (image) => {
  const filename = image.name
  return new Promise(async (resolve, reject) => {
    // readAsDataURL(image).then(dataUrl => {
    const dataUrl = await toUrl(image)
    getPixels(dataUrl, (err, colorPixels) => {
      const [originalWidth, originalHeight, ...rest] = colorPixels.shape
      let [width, height] = [originalWidth, originalHeight]
      const scaleFactor = Math.min(470 / width, 600 / height)

      if (scaleFactor < 1) {
        width = originalWidth * scaleFactor
        height = originalHeight * scaleFactor
      }

      initial = { ...initial, url: dataUrl, width, height, originalHeight, originalWidth, filename }

      convertToGrayscale(colorPixels).then(pixels => {
        initial = { ...initial, pixels, rerendering: false, sketched: false, loading: false }
        resolve()
      })
    })
    // })
  })
}
const sketchify = async (options) => {
  for (let key in options) {
    if (!['gpuAccelerated', 'XDoG'].includes(key)) {
      options[key] = parseFloat(options[key])
    }
  }
  const { pixels, originalWidth, originalHeight } = initial
  const filterFn = options.XDoG ? XDoGFilter : DoGFilter
  const url = await filterFn(pixels, options, [originalWidth, originalHeight])
  return url
}

const sketch = async (image, options = settings) => {
  await loadImage(image)
  return await sketchify(options)
}

export default sketch