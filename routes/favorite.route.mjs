import { Router } from "express"

const router = Router()

// * Import Controller
import { add, remove } from "../controllers/favorite.controller.mjs"

// * All Routes Goes Here ( GET, POST ETC... )
router.post("/:id", add)
router.delete("/:id", remove)

export default router
