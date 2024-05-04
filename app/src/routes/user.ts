import { Router } from "express";

import { isAuthenticated } from '../middlewares/isAuthenticated'

import { CreateUserFactory } from "../useCases/users/createUser/CreateUserFacotry";
import { AuthUserFactory } from "../useCases/users/authUser/AuthUserFactory";
import { FetchUserFactory } from "../useCases/users/fetchUser/FetchUserFactory";

const router = Router();

const createUserController = CreateUserFactory.generateInstance();
const authUserController = AuthUserFactory.generateInstance();
const fetchUserController = FetchUserFactory.generateInstance();

router.post("/create", createUserController.handle.bind(createUserController));
router.post("/auth", authUserController.handle.bind(authUserController));
router.get("/fetch", isAuthenticated, fetchUserController.handle.bind(fetchUserController));

export default router;
