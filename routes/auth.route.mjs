import { Router } from "express";

const router = Router()

// * Import Controller
import {login, me} from '../controllers/student.controller.mjs'
import auth from "../middlewares/auth.mjs";

// * All Routes Goes Here ( GET, POST ETC... )
router.get('/me', auth, me)
router.post('/login', login)


export default router;