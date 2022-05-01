import { PartialType } from '@nestjs/mapped-types';
import { CreateCommitDto } from './create-commit.dto';

export class UpdateCommitDto extends PartialType(CreateCommitDto) {}
