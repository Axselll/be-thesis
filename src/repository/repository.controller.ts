import { Controller, Get, Post, Body, Patch, Param, Delete, Res, HttpStatus } from '@nestjs/common';
import { RepositoryService } from './repository.service';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';
import { User } from 'src/user/schema/user.schema';

@Controller('repository')
export class RepositoryController {
  constructor(private readonly repositoryService: RepositoryService) { }

  @Get()
  async findAllRepo(): Promise<User[]> {
    return await this.repositoryService.findAllRepo();
  }

  @Get('/:user_id/:repo_id')
  async findOneRepo(@Res() res,
    @Param('user_id') user_id,
    @Param('repo_id') repo_id): Promise<User> {
    const response = await this.repositoryService.findOneRepo(user_id, repo_id)
    return res.status(HttpStatus.OK).json({ response })
  }

  @Post('/:user_id')
  async addRepo(@Res() res,
    @Param('user_id') user_id,
    @Body() newRepo: CreateRepositoryDto): Promise<User> {
    const response = await this.repositoryService.addRepo(user_id, newRepo)
    return res.status(HttpStatus.CREATED).json({ response })
  }

  @Patch('/:user_id/:repo_id')
  async updateRepo(@Res() res,
    @Param('user_id') user_id,
    @Param('repo_id') repo_id,
    @Body() updatedRepo: UpdateRepositoryDto): Promise<User> {
    const response = await this.repositoryService.updateRepo(user_id, repo_id, updatedRepo)
    return res.status(HttpStatus.OK).json({ response })
  }

  @Delete('/:user_id/:repo_id')
  async deleteRepo(@Res() res,
    @Param('user_id') user_id,
    @Param('repo_id') repo_id): Promise<User> {
    const response = await this.repositoryService.removeRepo(user_id, repo_id)
    return res.status(HttpStatus.OK).json({ response })
  }
}
