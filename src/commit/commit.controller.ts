import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import { User } from 'src/user/schema/user.schema';
import { CommitService } from './commit.service';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UpdateCommitDto } from './dto/update-commit.dto';
import { changeFileName, fileTypeFilter } from './utils/filetype.utils';
import fs from 'fs'

@Controller('commit')
export class CommitController {
  constructor(private readonly commitService: CommitService) { }

  @Get()
  async findAllCommit(): Promise<User[]> {
    return await this.commitService.findAllCommit()
  }

  @Get('/:user_id/:repo_id/:commited_id')
  async findOneCommit(
    @Res() res,
    @Param('user_id') user_id: string,
    @Param('repo_id') repo_id: string,
    @Param('commited_id') commited_id: string
  ): Promise<User> {
    const response = await this.commitService.findOneCommit(user_id, repo_id, commited_id)
    return res.status(HttpStatus.OK).json({ response })
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
    Object.assign(newCommit, { file: file.path })
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
      file: file.path,
      createdAt: false,
      updatedAt: Date.now
    })
    console.log(updatedCommit);
    const response = await this.commitService.updateCommit(user_id, repo_id, commited_id, updatedCommit)
    return res.status(HttpStatus.OK).json({ response })
  }
}
