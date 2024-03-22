const auth = require("../../../middleware/auth"); // Corrected import statement
const jwt = require("jsonwebtoken");

describe("auth middleware", () => {
  let req;
  let res;
  let next;

  beforeEach(() => {
    req = {
      header: jest.fn().mockReturnValue("validToken"), // Mocking the header function to return a valid token
    };
    res = {
      status: jest.fn().mockReturnThis(), // Mocking the status method to return itself
      send: jest.fn(), // Mocking the send method
    };
    next = jest.fn(); // Mocking the next function
  });

  it("should set req.user if a valid JWT token is provided", () => {
    // Mocking a decoded JWT payload
    const decodedPayload = { _id: "userId", isAdmin: false };
    // Mocking the jwt.verify method
    jwt.verify = jest.fn().mockReturnValue(decodedPayload);

    auth(req, res, next);

    // Assert that req.user is set
    expect(req.user).toBeDefined();
    // Assert that req.user has the expected properties
    expect(req.user._id).toBe("userId");
    expect(req.user.isAdmin).toBeFalsy();
  });

  it("should call next middleware function if a valid JWT token is provided", () => {
    // Mocking a decoded JWT payload
    const decodedPayload = { _id: "userId", isAdmin: false };
    // Mocking the jwt.verify method
    jwt.verify = jest.fn().mockReturnValue(decodedPayload);

    auth(req, res, next);

    // Assert that next middleware function is called
    expect(next).toHaveBeenCalled();
  });

  it("should return 401 if no token is provided", () => {
    req.header.mockReturnValue(""); // Mocking the header function to return an empty token

    auth(req, res, next);

    // Assert that next middleware function is not called
    expect(next).not.toHaveBeenCalled();
    // Assert that response status is 401
    expect(res.status).toHaveBeenCalledWith(401);
    // Assert that response is sent with appropriate message
    expect(res.send).toHaveBeenCalledWith("Access denied. No token provided.");
  });

  it("should return 400 if an invalid JWT token is provided", () => {
    // Mocking the jwt.verify method to throw an error
    jwt.verify = jest.fn().mockImplementation(() => {
      throw new Error("Invalid token");
    });

    auth(req, res, next);

    // Assert that next middleware function is not called
    expect(next).not.toHaveBeenCalled();
    // Assert that response status is 400
    expect(res.status).toHaveBeenCalledWith(400);
    // Assert that response is sent with appropriate message
    expect(res.send).toHaveBeenCalledWith("Invalid token.");
  });
});
