import { Router } from "express";

import { isAuthenticated } from "../middlewares/isAuthenticated";

import { CreateUserFactory } from "../useCases/users/createUser/CreateUserFacotry";
import { AuthUserFactory } from "../useCases/users/authUser/AuthUserFactory";
import { FetchUserFactory } from "../useCases/users/fetchUser/FetchUserFactory";
import { EditUserFactory } from "../useCases/users/editUser/EditUserFactory";

const router = Router();

const createUserController = CreateUserFactory.generateInstance();
const authUserController = AuthUserFactory.generateInstance();
const fetchUserController = FetchUserFactory.generateInstance();
const editUserController = EditUserFactory.generateInstance();

router.post("/create", createUserController.handle.bind(createUserController));
router.post("/auth", authUserController.handle.bind(authUserController));
router.get(
  "/fetch",
  isAuthenticated,
  fetchUserController.handle.bind(fetchUserController)
);
router.put(
  "/edit",
  isAuthenticated,
  editUserController.handle.bind(editUserController)
);

export default router;
