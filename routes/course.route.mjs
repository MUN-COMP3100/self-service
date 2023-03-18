import { Router } from "express";

const router = Router()

// * Import Controller
import { getAll, getById, create, update, remove } from "../controllers/course.controller.mjs";

// * All Routes Goes Here ( GET, POST ETC... )
router.get('/', getAll)
router.get('/:id', getById)
router.post('/', create)
router.put('/:id', update)
router.delete('/:id', remove)

export default router;