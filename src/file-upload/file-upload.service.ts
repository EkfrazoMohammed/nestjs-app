import { Injectable } from '@nestjs/common';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';

@Injectable()
export class FileUploadService {
  // Logic for file handling can be added here if needed (like saving file info to DB)

  static getStorageConfig() {
    return diskStorage({
      destination: './uploads', // The folder to store files
      filename: (req, file, callback) => {
        const filename = `${uuidv4()}${path.extname(file.originalname)}`;
        callback(null, filename); // Generate a unique filename
      },
    });
  }

  static getFileInterceptor() {
    return FileInterceptor('file', {
      storage: FileUploadService.getStorageConfig(),
      limits: {
        fileSize: 5 * 1024 * 1024, // Limit file size to 5MB
      },
    });
  }
}
