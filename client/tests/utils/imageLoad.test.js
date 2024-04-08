// Mock the Image constructor


global.Image = class {
    constructor() {
      setTimeout(() => {
        this.onload();
      }, 100); // Simulate image loading asynchronously
    }
  };
  

  describe('Image Load Test', () => {
    it('should verify if the image loads correctly', (done) => {
      const imageSrc = '/images/toyota.jpg'; // Adjust if your path is different
      const img = new Image();
  
      img.onload = () => {
        done();
      };
  

      img.onerror = () => {
        done(new Error('Image failed to load'));
      };
  

      img.src = imageSrc;

    });
    
  });
  