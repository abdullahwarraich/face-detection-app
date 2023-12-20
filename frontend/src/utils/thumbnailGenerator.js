export  function  createThumbnail(file) {
    return  new Promise( (resolve) => {
      const reader = new FileReader();
  
      reader.onload = async (e) => {
        const img = new Image();
        img.src = e.target.result;
  
        img.onload = async () => {
          // Create a canvas to draw the thumbnail
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          const maxWidth = 100; // Set the maximum width for the thumbnail
  
          // Calculate the proportional height based on the maximum width
          const ratio = maxWidth / img.width;
          const height = img.height * ratio;
  
          // Set the canvas dimensions
          canvas.width = maxWidth;
          canvas.height = height;
  
          // Draw the image onto the canvas
          ctx.drawImage(img, 0, 0, maxWidth, height);
  
          // Convert the canvas content to a data URL representing the thumbnail
          const thumbnailDataUrl = canvas.toDataURL('image/jpeg');
  
          // Resolve the promise with the thumbnail data URL
          resolve(thumbnailDataUrl);
        };
      };
  
      // Read the image file as a data URL
      reader.readAsDataURL(file);
    });
  }
  