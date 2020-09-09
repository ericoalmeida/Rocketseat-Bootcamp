import fs from 'fs';
import { resolve } from 'path';
import aws, { S3 } from 'aws-sdk';

import uploadConfig from '@config/upload';
import IStorageProvider from '@shared/container/Providers/StorageProvider/models/IStorageProvider';

class S3StorageProvider implements IStorageProvider {
  private clientStorage: S3;

  constructor() {
    this.clientStorage = new aws.S3({ region: 'us-east-1' });
  }

  public async saveFile(file: string): Promise<string> {
    const originalPath = resolve(uploadConfig.tmpFolder, file);

    const fileContent = await fs.promises.readFile(originalPath, {
      encoding: 'utf-8',
    });

    await this.clientStorage
      .putObject({
        Bucket: 'aws-app-gobarber',
        Key: file,
        ACL: 'public-read',
        Body: fileContent,
      })
      .promise();

    return file;
  }

  public async deleteFile(file: string): Promise<void> {}
}

export default S3StorageProvider;
