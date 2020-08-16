import express, { response } from "express";

import UsersControllers from './controllers/UsersController';
import ClassesController from "./controllers/ClassesControllers";
import ConnectionsController from "./controllers/ConnectionsController";

const routes = express.Router();

const usersControllers = new UsersControllers();
const classesControllers = new ClassesController();
const connectionsControllers = new ConnectionsController();

routes.post("/sign-up", usersControllers.create);
routes.post("/sign-in", usersControllers.index);

routes.get("/classes", classesControllers.index);
routes.post("/classes", classesControllers.create);

routes.get("/connections", connectionsControllers.index);
routes.post("/connections", connectionsControllers.create);

export default routes;
