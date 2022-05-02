import { CreateCommitDto as Commit } from "src/commit/dto/create-commit.dto";

export class CreateRepositoryDto {
    readonly name: string;
    readonly desc: string;
    readonly commited: Commit;
}
