import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { CreateCommitDto } from './dto/create-commit.dto';
import { UpdateCommitDto } from './dto/update-commit.dto';

@Injectable()
export class CommitService {
  constructor(@InjectModel(User.name) private commitedModel: Model<UserDocument>) { }

  // for testing purposes, will be disabled later
  async findAllCommit(): Promise<User[]> {
    try {
      const result = await this.commitedModel.find().exec()
      return result
    } catch (error) {
      throw (error)
    }
  }

  async addCommit(user_id: string, repo_id: string, commit: CreateCommitDto): Promise<User> {
    try {
      const addResult = await this.commitedModel.findByIdAndUpdate(
        { "_id": user_id, "repository._id": repo_id },
        { $push: { "repository.$[repo].commited": commit } },
        {
          arrayFilters: [{ "repo._id": repo_id }],
          // will test if multi is setted to be false because of deep nested doc
          multi: true,
          new: true
        }
      )
      return addResult
    } catch (error) {
      throw (error)
    }
  }

  async updateCommit(user_id: string, repo_id: string, commit_id: string, commit: UpdateCommitDto): Promise<User> {
    try {
      const updatedResult = await this.commitedModel.findOneAndUpdate(
        { "_id": user_id, "repository._id": repo_id, "commited._id": commit_id },
        {
          $set: {
            "repository.$[repo].commited.$[commit].title": commit.title,
            "repository.$[repo].commited.$[commit].desc": commit.desc,
            "repository.$[repo].commited.$[commit].file": commit.file,
          }
        },
        {
          arrayFilters: [
            { "repo._id": repo_id },
            { "commit._id": commit_id }
          ],
          new: true
        }
      )
      return updatedResult
    } catch (error) {
      throw (error)
    }
  }

  async removeCommit(user_id: string, repo_id: string, commit_id: string): Promise<any> {
    try {
      const removeResult = await this.commitedModel.findOneAndUpdate(
        { "_id": user_id, "repository._id": repo_id, "commited._id": commit_id },
        {
          $pull: {
            "repository.$[repo].commited": {
              "_id": commit_id
            }
          }
        },
        {
          arrayFilters: [{ "repo._id": repo_id }],
          new: true
        }
      )
      return removeResult
    } catch (error) {
      throw (error)
    }
  }

  // async setFile(user_id: string, repo_id: string, commit_id: string, commit: UpdateCommitDto): Promise<User> {
  //   try {
  //     const file = await this.commitedModel.findOneAndUpdate(
  //       { "_id": user_id, "repository._id": repo_id, "commited._id": commit_id },
  //       {
  //         $set: {
  //           "repository.$[repo].commited.$[commit].file": commit.file,
  //         }
  //       },
  //       {
  //         arrayFilters: [
  //           { "repo._id": repo_id },
  //           { "commit._id": commit_id }
  //         ],
  //         new: true
  //       }
  //     )
  //     return file
  //   } catch (error) {
  //     throw (error)
  //   }
  // }
}
