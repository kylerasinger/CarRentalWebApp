// test/integration/routes/brand.test.js
const { Brand } = require("../../../models/brand"); // Update the path

describe('Brand Validation', () => {
  it('should validate a properly formatted brand', () => {
    const brand = new Brand({ name: 'ValidBrandName' });
    const validationResult = brand.validateSync();
    expect(validationResult).toBeUndefined();
  });

  it('should return an error if name is too short', () => {
    const brand = new Brand({ name: '' }); // Empty string, less than min length
    const validationResult = brand.validateSync();
    expect(validationResult.errors).toBeDefined();
    expect(validationResult.errors.name.message).toMatch(/required/); // Updated pattern to match Mongoose error message
  });

  it('should return an error if name is too long', () => {
    const name = new Array(52).join('a'); // Creates a string of 51 'a's, exceeding max length
    const brand = new Brand({ name });
    const validationResult = brand.validateSync();
    expect(validationResult.errors).toBeDefined();
    expect(validationResult.errors.name.message).toMatch(/maximum allowed length/); // Updated pattern to match Mongoose error message
  });

  it('should return an error if name is not provided', () => {
    const brand = new Brand({});
    const validationResult = brand.validateSync();
    expect(validationResult.errors).toBeDefined();
    expect(validationResult.errors.name.message).toMatch(/required/); // Updated pattern to match Mongoose error message
  });

  it('should validate a brand with whitespace trimmed', () => {
    const brand = new Brand({ name: '   TrimmedBrand   ' });
    const validationResult = brand.validateSync();
    expect(validationResult).toBeUndefined();
    expect(brand.name).toBe('TrimmedBrand'); // Check if whitespace is trimmed
  });

  it('should validate a brand with special characters in the name', () => {
    const brand = new Brand({ name: '!@#$%^&*()_+Brand' });
    const validationResult = brand.validateSync();
    expect(validationResult).toBeUndefined();
  });

  it('should return an error if name contains only spaces', () => {
    const brand = new Brand({ name: '     ' }); // Only spaces
    const validationResult = brand.validateSync();
    expect(validationResult.errors).toBeDefined();
    expect(validationResult.errors.name.message).toMatch(/required/); // Updated pattern to match Mongoose error message
  });
});
