import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { CreateRepositoryDto } from './dto/create-repository.dto';
import { UpdateRepositoryDto } from './dto/update-repository.dto';

@Injectable()
export class RepositoryService {
  constructor(@InjectModel(User.name) private repositoryModel: Model<UserDocument>) { }

  // test purposes, will be deleted later
  async findAllRepo(): Promise<User[]> {
    try {
      const result = await this.repositoryModel.find({ "repository": { $exists: true } }).exec()
      return result
    } catch (error) {
      throw (error)
    }
  }

  async findOneRepo(user_id: string, repo_id: string): Promise<User> {
    try {
      const findResult = await this.repositoryModel.findById(
        { "_id": user_id, "repository_.id": repo_id },
        {
          "repository": {
            $elemMatch: {
              "_id": repo_id
            }
          }
        }
      ).exec()
      return findResult
    } catch (error) {
      throw (error)
    }
  }

  async addRepo(user_id: string, repository: CreateRepositoryDto): Promise<User> {
    try {
      const addResult = await this.repositoryModel.findByIdAndUpdate(
        { "_id": user_id },
        { $push: { "repository": repository } },
        { new: true }
      )
      return addResult
    } catch (error) {
      throw (error)
    }
  }

  async updateRepo(user_id: string, repo_id: string, repository: UpdateRepositoryDto): Promise<User> {
    try {
      const updateResult = await this.repositoryModel.findOneAndUpdate(
        { "_id": user_id, "repository._id": repo_id },
        {
          $set: {
            "repository.$[repo].name": repository.name,
            "repository.$[repo].desc": repository.desc
          },
        },
        {
          arrayFilters: [{ 'repo._id': repo_id }],
          new: true,
        }
      )
      return updateResult
    } catch (error) {
      throw (error)
    }
  }

  async removeRepo(user_id: string, repo_id: string,): Promise<any> {
    try {
      const removeResult = await this.repositoryModel.findOneAndUpdate(
        { "_id": user_id },
        { $pull: { "repository": { "_id": repo_id } } },
        { new: true }
      )
      return removeResult
    } catch (error) {
      throw (error)
    }
  }
}
