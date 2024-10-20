const resizeImages = (files, options = { maxWidth: 1920, maxHeight: 1080, quality: 0.1, outputType: 'base64' }) => {
  const { maxWidth, maxHeight, quality, outputType } = options;

  const processFile = (file) => {
      return new Promise((resolve, reject) => {
          if (!/image/i.test(file.type)) {
              return reject(new Error(`File ${file.name} is not an image.`));
          }

          const reader = new FileReader();
          reader.readAsArrayBuffer(file);

          reader.onload = (event) => {
              const blob = new Blob([event.target.result]);
              const blobURL = URL.createObjectURL(blob);

              const image = new Image();
              image.src = blobURL;

              image.onload = () => {
                  const resizedImage = resizeImage(image);
                  
                  if (outputType === 'base64') {
                      resolve(resizedImage); // Return base64
                  } else if (outputType === 'formdata') {
                      const formData = new FormData();
                      formData.append('images[]', dataURLToFile(resizedImage, file.name));
                      resolve(formData); // Return as FormData
                  } else {
                      reject(new Error('Invalid output type. Choose "base64" or "formdata".'));
                  }
              };

              image.onerror = reject;
          };

          reader.onerror = reject;
      });
  };

  const resizeImage = (img) => {
      const canvas = document.createElement('canvas');
      let { width, height } = img;

      // Maintain aspect ratio and resize
      if (width > height) {
          if (width > maxWidth) {
              height = Math.round((height * maxWidth) / width);
              width = maxWidth;
          }
      } else {
          if (height > maxHeight) {
              width = Math.round((width * maxHeight) / height);
              height = maxHeight;
          }
      }

      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);

      return canvas.toDataURL('image/jpeg', quality); // Return as DataURL (base64)
  };

  const dataURLToFile = (dataUrl, fileName) => {
      const arr = dataUrl.split(',');
      const mime = arr[0].match(/:(.*?);/)[1];
      const bstr = atob(arr[1]);
      let n = bstr.length;
      const u8arr = new Uint8Array(n);
      while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
      }
      return new File([u8arr], fileName, { type: mime });
  };

  // Process each file and return as promise
  const promises = Array.from(files).map(file => processFile(file));

  return Promise.all(promises);
};
