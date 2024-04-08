// test/integration/routes/types.test.js
const { Type } = require("../../../models/type"); // Update the path

describe('Type Validation', () => {
  it('should validate a properly formatted type', () => {
    const type = new Type({ name: 'ValidTypeName' });
    const validationResult = type.validateSync();
    expect(validationResult).toBeUndefined();
  });

  it('should return an error if name is too short', () => {
    const type = new Type({ name: '' }); // Empty string, less than min length
    const validationResult = type.validateSync();
    expect(validationResult.errors).toBeDefined();
    expect(validationResult.errors.name.message).toMatch(/required/); // Updated pattern to match Mongoose error message
  });

  it('should return an error if name is too long', () => {
    const name = new Array(52).join('a'); // Creates a string of 51 'a's, exceeding max length
    const type = new Type({ name });
    const validationResult = type.validateSync();
    expect(validationResult.errors).toBeDefined();
    expect(validationResult.errors.name.message).toMatch(/maximum allowed length/); // Updated pattern to match Mongoose error message
  });

  it('should return an error if name is not provided', () => {
    const type = new Type({});
    const validationResult = type.validateSync();
    expect(validationResult.errors).toBeDefined();
    expect(validationResult.errors.name.message).toMatch(/required/); // Updated pattern to match Mongoose error message
  });

  it('should validate a type with whitespace trimmed', () => {
    const type = new Type({ name: '   TrimmedType   ' });
    const validationResult = type.validateSync();
    expect(validationResult).toBeUndefined();
    expect(type.name).toBe('TrimmedType'); // Check if whitespace is trimmed
  });

  it('should validate a type with special characters in the name', () => {
    const type = new Type({ name: '!@#$%^&*()_+Type' });
    const validationResult = type.validateSync();
    expect(validationResult).toBeUndefined();
  });

  it('should return an error if name contains only spaces', () => {
    const type = new Type({ name: '     ' }); // Only spaces
    const validationResult = type.validateSync();
    expect(validationResult.errors).toBeDefined();
    expect(validationResult.errors.name.message).toMatch(/required/); // Updated pattern to match Mongoose error message
  });
});
