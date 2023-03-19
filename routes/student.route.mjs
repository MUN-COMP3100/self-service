import { Router } from "express";

const router = Router()

// * Import Controller
import { create } from "../controllers/student.controller.mjs";

// * All Routes Goes Here ( GET, POST ETC... )
router.post('/', create)


export default router;