export class CreateCommitDto {
    readonly title: string;
    readonly desc: string;
    readonly file?: any;
    readonly createdAt: Date;
    readonly updatedAt: Date;
}
