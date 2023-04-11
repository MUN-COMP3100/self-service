import { Router } from "express";
import auth from "../middlewares/auth.mjs"

const router = Router()

// * Import Controller
import { create, drop, register } from "../controllers/student.controller.mjs";

// * All Routes Goes Here ( GET, POST ETC... )
router.post('/', create)

// * Register Course
router.post('/course/:id', auth, register)
router.delete('/course/:id', auth, drop)


export default router;