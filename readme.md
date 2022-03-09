# Form [xdog-sketch](https://github.com/alexpeattie/xdog-sketch)

Fast artistic rendering of photos in the browser with XDoG, & deeplearn.js.

In Node.js version,see [sketch](https://github.com/overQ-N/sketch)

## use script

```js
<script src="xdogSketch.js"></script>;
// detail at example directory
await xdogSketch(image, {
  XDoG: true,
  epsilon: 153.2,
  gpuAccelerated: false,
  phi: 0.738,
  sharpen: 58.4,
  sigmaOne: 3.82,
  sigmaTwo: 3.84,
  threshold: 0.4,
});
```
