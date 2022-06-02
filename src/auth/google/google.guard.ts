import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class googleGuard extends AuthGuard('google') {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const can = await super.canActivate(context)
        if (can) {
            const req = context.switchToHttp().getRequest()
            super.logIn(req)
        }
        return true
    }
}