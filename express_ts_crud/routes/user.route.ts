import { Router } from 'express'
import { findAll, findById, create, update, remove } from '../controllers/user.controller'

export const router = Router()

router.get("/list",findAll)
router.get("/list/:id",findById)
router.post("/create",create)
router.patch("/update/:id",update)
router.delete("/delete/:id",remove)


