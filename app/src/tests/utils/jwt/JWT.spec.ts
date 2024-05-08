import { Jwt } from "../../../utils/jwt/features/Jwt";
import { IJwt } from "../../../utils/jwt/IJwt";

process.env.JWT_SECRET_KEY = "admin";

describe("utils/jwt", () => {
  it("should generate token jwt", () => {
    const jwtHelper: Partial<IJwt> = {
      generate: jest.fn().mockResolvedValue("hash"),
    };

    const jwt = new Jwt(jwtHelper as IJwt);

    const token = jwt.generate({ id: 1, name: "John Joe" });

    expect(token).toBeTruthy();
  });

  it("should return a empty string", () => {
    const jwtHelper: Partial<IJwt> = {
      generate: jest.fn().mockResolvedValue(""),
    };

    const jwt = new Jwt(jwtHelper as IJwt);

    const token = jwt.generate(false);

    expect(token).toBeFalsy();
  });

  it("should verify token and return user data", () => {
    const jwtHelper: IJwt = {
      generate: jest.fn().mockReturnValue("hash"),
      verify: jest.fn().mockReturnValue({ id: 1, name: "John Joe" }),
    };

    const jwt = new Jwt(jwtHelper);

    const token = jwt.generate({ id: 1, name: "John Joe" });

    const data = jwt.verify(token);

    expect(data).toHaveProperty("id", 1);
    expect(token).toBe("hash");
  });

  it("should return null if token is not valid", () => {
    const jwtHelper: IJwt = {
      generate: jest.fn().mockReturnValue("hash"),
      verify: jest.fn().mockReturnValue(null),
    };

    const jwt = new Jwt(jwtHelper);

    const token = jwt.generate({ id: 1, name: "John Joe" });

    const data = jwt.verify(token);

    expect(data).toBeNull();
  });
});
