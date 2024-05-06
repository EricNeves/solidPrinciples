import { Validator } from '../../../utils/validation/features/Validator'
import Joi from "joi";

describe('utils/validation', () => {
  it('should throws Error if name does not exists', () => {
    try {
      const userSchema = Joi.object({
        name: Joi.string().required()
      })
  
      const validator = new Validator(userSchema);
  
      validator.validate({ name: "" })
    } catch(error: any) {
      expect(error).toBeInstanceOf(Error)
    }
  })
});