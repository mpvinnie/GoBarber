import { Router } from 'express'

import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import ProfileController from '../controllers/ProfileController'

const profileRouter = Router()
const profileController = new ProfileController()

profileRouter.use(ensureAuthenticated)

profileRouter.put('/profile', profileController.update)

export default profileRouter
