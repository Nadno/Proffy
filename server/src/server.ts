import express from "express";
import cors from "cors";
import routes from "./routes";
import checkJwt from "./middlewares/jwt";

const app = express();

app.use(cors());
app.use(express.json());
app.use(checkJwt);
app.use(routes);

app.listen(3333);
