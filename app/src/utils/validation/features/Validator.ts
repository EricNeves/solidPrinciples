import { User } from "../../../entities/User";
import { IValidator } from "../IValidator";

import Joi from "joi";

export class Validator implements IValidator {
  constructor(private joi: Joi.ObjectSchema<any>) {}

  validate(user: User): any {
    const { error } = this.joi.validate(user);

    if (error) {
      throw new Error(error.details[0].message);
    }
  }
}
