import { CreateRepositoryDto as Repository } from "src/repository/dto/create-repository.dto";

export class CreateUserDto {
  readonly firstname: string;
  readonly lastname: string;
  readonly email: string;
  readonly googleId: string;
  readonly repository: Repository
}
