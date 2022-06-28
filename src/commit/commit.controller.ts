import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile, UseGuards } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from 'src/user/schema/user.schema';
import { CommitService } from './commit.service';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UpdateCommitDto } from './dto/update-commit.dto';
import { changeFileName, fileTypeFilter } from './utils/filetype.utils';
import * as fs from 'fs'
import * as path from 'path'
import { diskStorage } from 'multer';
import { jwtGuard } from 'src/auth/jwt/jwt.guard';

@UseGuards(jwtGuard)
@Controller('commit')
export class CommitController {
  constructor(private readonly commitService: CommitService) { }

  @Get()
  async findAllCommit(): Promise<User[]> {
    return await this.commitService.findAllCommit()
  }

  @Post('/:user_id/:repo_id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: changeFileName
    }),
    fileFilter: fileTypeFilter
  }))
  async addCommit(
    @Res() res,
    @Param('user_id') user_id: string,
    @Param('repo_id') repo_id: string,
    @Body() newCommit: CreateCommitDto,
    @UploadedFile() file: CreateCommitDto["file"]
  ): Promise<User> {
    Object.assign(newCommit, { file: file.filename })
    const response = await this.commitService.addCommit(user_id, repo_id, newCommit);
    return res.status(HttpStatus.CREATED).json({ response });
  }

  @Patch('/:user_id/:repo_id/:commited_id')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './files',
      filename: changeFileName
    }),
    fileFilter: fileTypeFilter
  }))
  async updateCommit(
    @Res() res,
    @Param('user_id') user_id: string,
    @Param('repo_id') repo_id: string,
    @Param('commited_id') commited_id: string,
    @Body() updatedCommit: UpdateCommitDto,
    @UploadedFile() file: UpdateCommitDto["file"]
  ): Promise<User> {
    Object.assign(updatedCommit, {
      file: file?.filename,
      createdAt: false,
      updatedAt: Date.now
    })
    const response = await this.commitService.updateCommit(user_id, repo_id, commited_id, updatedCommit)
    return res.status(HttpStatus.OK).json({ response })
  }

  @Delete('/:user_id/:repo_id/:commited_id/:file')
  async deleteCommit(
    @Res() res,
    @Param('user_id') user_id: string,
    @Param('repo_id') repo_id: string,
    @Param('commited_id') commited_id: string,
    @Param('file') file: string,
  ): Promise<any> {
    const response = await this.commitService.removeCommit(user_id, repo_id, commited_id)
    await res.status(HttpStatus.OK).json({ response })
    return fs.unlink(path.join('files', file), err => { if (err) return err })
  }

  @Get('/:file')
  async downloadFile(
    @Res() res,
    @Param('file') file: string
  ): Promise<any> {
    res.sendFile(file, { root: './files' })
  }
}