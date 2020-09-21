import express from 'express'
import cors from 'cors'
import { todoController } from '../controllers'

const router = express.Router()

router.use(cors())
router.use(express.json())

router.get('/todos', todoController.get)
router.post('/todos', todoController.post)

export default router
