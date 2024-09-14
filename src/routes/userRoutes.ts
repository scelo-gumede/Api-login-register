import express from "express"
import { Register,Login } from "../controllers/authUser"
import { auth } from "../middleware/authMiddleawre"
const router = express.Router()


router.route("/Register").post(Register)
router.route("/Login").post(Login)

export default router