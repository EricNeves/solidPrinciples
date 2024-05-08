import { Bcrypt } from "../../../utils/bcrypt/features/Bcrypt";
import { IBcrypt } from "../../../utils/bcrypt/IBcrypt";
import { MockProxy, mock } from "jest-mock-extended";

describe("utils/bcrypt", () => {
  let bCryptHelper: MockProxy<IBcrypt>;

  beforeEach(() => {
    bCryptHelper = mock<IBcrypt>({
      hashPassword: jest.fn(),
      comparePassword: jest.fn(),
    });
  });

  it("should encrypt the password", async () => {
    (bCryptHelper.hashPassword as jest.Mock).mockResolvedValue(
      Promise.resolve("encrypted")
    );

    const bcrypt = new Bcrypt(bCryptHelper);

    const passwordEncrypted = await bcrypt.hashPassword("helloworld");

    expect(passwordEncrypted).toBeTruthy();
  });

  it("should compare and match password", async () => {
    (bCryptHelper.hashPassword as jest.Mock).mockResolvedValue(
      Promise.resolve(Promise.resolve("helloworld"))
    );

    (bCryptHelper.comparePassword as jest.Mock).mockResolvedValue(
      Promise.resolve(Promise.resolve(true))
    );

    const bcrypt = new Bcrypt(bCryptHelper);

    const password = await bcrypt.hashPassword("helloworld");

    const matchPassword = await bcrypt.comparePassword("helloworld", password);

    expect(matchPassword).toBeTruthy();
  });

  it("should compare password and not match", async () => {
    (bCryptHelper.hashPassword as jest.Mock).mockResolvedValue(
      Promise.resolve(Promise.resolve("helloworld"))
    );

    (bCryptHelper.comparePassword as jest.Mock).mockResolvedValue(
      Promise.resolve(Promise.resolve(false))
    );

    const bcrypt = new Bcrypt(bCryptHelper);

    const password = await bcrypt.hashPassword("helloworld");

    const matchPassword = await bcrypt.comparePassword("helloworld", password);

    expect(matchPassword).toBeFalsy();
  });
});
