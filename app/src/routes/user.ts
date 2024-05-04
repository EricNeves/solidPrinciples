import { Router } from "express";

import { CreateUserFactory } from "../useCases/users/createUser/CreateUserFacotry";
import { AuthUserFactory } from "../useCases/users/authUser/AuthUserFactory";

const router = Router();

const createUserController = CreateUserFactory.generateInstance();
const authUserController = AuthUserFactory.generateInstance();

router.post("/create", createUserController.handle.bind(createUserController));
router.post("/auth", authUserController.handle.bind(authUserController));

export default router;
