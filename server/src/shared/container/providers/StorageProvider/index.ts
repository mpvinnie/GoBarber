import { container } from 'tsyringe'

import DiskStorageProvider from '../StorageProvider/implementations/DiskStorageProvider'
import IStorageProvider from '../StorageProvider/models/IStorageProvider'

const providers = {
  disk: DiskStorageProvider
}

container.registerSingleton<IStorageProvider>('StorageProvider', providers.disk)
