const adminMiddleware = require("../../../middleware/admin");

describe("admin middleware", () => {
  let mockReq;
  let mockRes;
  let nextFunction = jest.fn();

  beforeEach(() => {
    mockReq = { user: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    };
    nextFunction.mockReset();
  });

  it("should return 403 if user is not an admin", () => {
    mockReq.user.isAdmin = false;

    adminMiddleware(mockReq, mockRes, nextFunction);

    expect(mockRes.status).toHaveBeenCalledWith(403);
    expect(mockRes.send).toHaveBeenCalledWith("Access denied.");
    expect(nextFunction).not.toHaveBeenCalled();
  });

  it("should call next if user is an admin", () => {
    mockReq.user.isAdmin = true;

    adminMiddleware(mockReq, mockRes, nextFunction);

    expect(nextFunction).toHaveBeenCalled();
  });
});
