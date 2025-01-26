import { Controller, Post, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { Express } from 'express';

@Controller('file-upload')
export class FileUploadController {
  @Post('upload')
  @UseInterceptors(FileUploadService.getFileInterceptor()) // Use the static method directly
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new Error('File upload failed');
    }
    return { message: 'File uploaded successfully', file };
  }
}
