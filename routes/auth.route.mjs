import { Router } from "express";

const router = Router()

// * Import Controller
import {login} from '../controllers/student.controller.mjs'

// * All Routes Goes Here ( GET, POST ETC... )
router.post('/login', login)


export default router;