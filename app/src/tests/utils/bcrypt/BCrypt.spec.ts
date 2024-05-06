import { Bcrypt } from "../../../utils/bcrypt/features/Bcrypt";
import { BCryptHelper } from "../../../utils/bcrypt/features/";

describe("utils/bcrypt", () => {
  it("should encrypt the password", async () => {
    const bcrypt = new Bcrypt(new BCryptHelper());

    const passwordEncrypted = await bcrypt.hashPassword("helloworld")

    expect(passwordEncrypted).toBeTruthy()
  });
});
