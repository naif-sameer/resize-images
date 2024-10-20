# Resize Images Library

## Overview
This library provides a utility to resize images in the browser. It works with multiple image files, resizes them according to specified dimensions and quality, and returns them in either **base64** format or as **FormData** objects. This is useful for situations where you need to process and resize images client-side before uploading them to a server.

## Features
- Supports resizing images while maintaining their aspect ratio.
- Output formats: **Base64** or **FormData**.
- Customizable maximum width, height, and quality settings.
- Works asynchronously, allowing you to handle multiple images at once.

## Installation
You can include the library as a JavaScript module in your project.

1. **Download the library file** and include it in your project.
2. **Import the function** into your code.

```javascript
import { resizeImages } from './path/to/your/resizeImages';

resizeImages(files, options = { maxWidth: 1920, maxHeight: 1080, quality: 0.7, outputType: 'base64' })
```


## Parameters
1. **files**: 
   - **Type**: `FileList` or an array of `File` objects.
   - **Description**: The files (images) to be resized.

2. **options**:
   - **Type**: `Object`
   - **Default**: 
     ```javascript
     { maxWidth: 1920, maxHeight: 1080, quality: 0.7, outputType: 'base64' }
     ```
   - **Available options**:
     - **maxWidth** (Number): The maximum width for the resized image. Default is `1920`.
     - **maxHeight** (Number): The maximum height for the resized image. Default is `1080`.
     - **quality** (Number): The quality of the resized image. Should be a value between `0.0` (lowest) and `1.0` (highest). Default is `0.7`.
     - **outputType** (String): Specifies the output format. Options:
       - `'base64'`: Returns the resized images as base64-encoded strings.
       - `'formdata'`: Returns the resized images as `FormData` objects (useful for uploading).



## Return Value
Returns a promise that resolves to an array of resized images:

- If `outputType` is `'base64'`, the array will contain base64 strings.
- If `outputType` is `'formdata'`, the array will contain `FormData` objects.

## Example Usage

### Example 1: Basic Usage with Base64 Output

```javascript
const fileInput = document.getElementById('fileInput');

fileInput.onchange = async () => {
    const inputFiles = fileInput.files;
    const resizedImages = await resizeImages(inputFiles, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.8,
        outputType: 'base64'
    });

    resizedImages.forEach(base64Image => {
        console.log(base64Image); // Use the base64 string as needed
    });
};

```

### Example 2: FormData Output for Upload
```js

const fileInput = document.getElementById('fileInput');

fileInput.onchange = async () => {
    const inputFiles = fileInput.files;
    const formDataArray = await resizeImages(inputFiles, {
        maxWidth: 1200,
        maxHeight: 800,
        quality: 0.8,
        outputType: 'formdata'
    });

    formDataArray.forEach(formData => {
        console.log(formData.get('images[]')); // Each image as a File in FormData
        // You can send this formData via an AJAX request to upload the resized image
    });
};
```


### Error Handling

If a file is not an image or there is any other issue, the promise will be rejected with an error. You can handle it like this:

```js
try {
    const resizedImages = await resizeImages(inputFiles, { outputType: 'base64' });
    // Process resized images...
} catch (error) {
    console.error('Error resizing images:', error.message);
}
```

## License
This library is licensed under the MIT License. Feel free to use it in your projects.


