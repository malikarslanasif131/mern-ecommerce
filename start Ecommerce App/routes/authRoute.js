import express from "express";
import {
  registerCtrl,
  loginCtrl,
  forgotPasswordCtrl,
} from "../controllers/authCtrl.js";
import { isAdmin, requireSignin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/register", registerCtrl);

router.post("/login", loginCtrl);

router.post("/forget-password", forgotPasswordCtrl);

router.get("/", requireSignin, (req, res) => {
  res.send("Hello World!");
});

export default router;
