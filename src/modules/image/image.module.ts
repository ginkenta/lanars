import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Image } from '../../models/image.entity';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Image]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        storage: diskStorage({
          destination: configService.get<string>('MULTER_DEST'),
          filename: (req, file, cb) => {
            const ext = extname(file.originalname);
            const uniqueSuffix =
              Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, uniqueSuffix + '-' + ext);
          },
        }),
        fileFilter: (req, file, cb) => {
          const availExt = ['.jpg', '.jpeg', '.gif', '.png'];
          const ext = extname(file.originalname);

          if (!availExt.includes(ext)) return cb(null, false);
          return cb(null, true);
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [ImageService],
  controllers: [ImageController],
  exports: [ImageService],
})
export class ImageModule {}
