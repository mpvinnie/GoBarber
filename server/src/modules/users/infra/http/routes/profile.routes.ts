import { Router } from 'express'

import ProfileController from '../controllers/ProfileController'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'

const profileRouter = Router()
const profieController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.put('/', profieController.update)
profileRouter.get('/', profieController.show)

export default profileRouter
