import { container } from 'tsyringe';

import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';

import DiskStorage from '@shared/container/Providers/StorageProvider/implementations/DiskStorageProvider';
import S3StorageProvider from '@shared/container/Providers/StorageProvider/implementations/S3StorageProvider';

const providers = {
  disk: DiskStorage,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers.disk,
);
