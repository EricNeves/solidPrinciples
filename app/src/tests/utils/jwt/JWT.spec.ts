import { Jwt } from "../../../utils/jwt/features/Jwt";
import { MockProxy, mock } from "jest-mock-extended";
import { IJwt } from "../../../utils/jwt/IJwt";

process.env.JWT_SECRET_KEY = "admin";

describe("utils/jwt", () => {
  let jwtHelper: MockProxy<IJwt>;

  beforeEach(() => {
    jwtHelper = mock<IJwt>({
      generate: jest.fn(),
      verify: jest.fn(),
    });
  });

  it("should generate token jwt", () => {
    (jwtHelper.generate as jest.Mock).mockResolvedValue("hash");

    const jwt = new Jwt(jwtHelper as IJwt);

    const token = jwt.generate({ id: 1, name: "John Joe" });

    expect(token).toBeTruthy();
  });

  it("should return a empty string", () => {
    (jwtHelper.generate as jest.Mock).mockResolvedValue("");

    const jwt = new Jwt(jwtHelper as IJwt);

    const token = jwt.generate(false);

    expect(token).toBeFalsy();
  });

  it("should verify token and return user data", () => {
    (jwtHelper.generate as jest.Mock).mockReturnValue("hash");

    (jwtHelper.verify as jest.Mock).mockReturnValue({
      id: 1,
      name: "John Joe",
    });

    const jwt = new Jwt(jwtHelper);

    const token = jwt.generate({ id: 1, name: "John Joe" });

    const data = jwt.verify(token);

    expect(data).toHaveProperty("id", 1);
    expect(token).toBe("hash");
  });

  it("should return null if token is not valid", () => {
    (jwtHelper.generate as jest.Mock).mockReturnValue("hash");

    (jwtHelper.verify as jest.Mock).mockReturnValue(null);

    const jwt = new Jwt(jwtHelper);

    const token = jwt.generate({ id: 1, name: "John Joe" });

    const data = jwt.verify(token);

    expect(data).toBeNull();
  });
});
