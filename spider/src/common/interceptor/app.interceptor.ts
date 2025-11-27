import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable,tap } from "rxjs";

export class AppInterceptor implements NestInterceptor{
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        let req = context.switchToHttp().getRequest();
        console.log("Req Data: ",req.body)
        console.log("request started ...")
        return next.handle().pipe(
            tap(()=>{
               console.log("after")
            })
        );
    }
}