import {
  Controller,
  HttpCode,
  HttpStatus,
  Headers,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  FileTypeValidator,
  MaxFileSizeValidator,
  Req,
} from '@nestjs/common';
import { TaskReportServices } from './report.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('apps-internal/activity/task/report')
export class TaskReportController {
  constructor(private readonly TaskReportService: TaskReportServices) {}

  @Post()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('photos'))
  async create(
    @Headers() headers: any,
    @Req() req: any,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
        ],
      }),
    )
    photos: Express.Multer.File,
    // @Res({ passthrough: true }) response: Response,
  ) {
    return await this.TaskReportService.taskReporting(headers, photos);
  }
}
