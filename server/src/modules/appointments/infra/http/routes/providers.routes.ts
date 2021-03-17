import { Router } from 'express'

import ProvidersController from '../controllers/ProvidersController'
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated'

const providersRouter = Router()
const providersControllers = new ProvidersController()

providersRouter.use(ensureAuthenticated)

providersRouter.get('/', providersControllers.index)

export default providersRouter
