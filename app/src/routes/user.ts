import { Router } from "express";

import { CreateUserFactory } from "../useCases/users/createUser/CreateUserFacotry";

const router = Router();

const createUserController = CreateUserFactory.generateInstance();

router.post("/create", createUserController.handle.bind(createUserController));

export default router;
