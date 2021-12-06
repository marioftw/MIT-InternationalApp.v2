import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthTokenService} from "./auth-token.service";

@Injectable()

// This Interceptor intercepts any Http requests and adds a Json web token as a header
export class AuthInterceptor implements  HttpInterceptor {

    constructor(private token: AuthTokenService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.token.authJwtToken) {

            const cloned = req.clone({
                headers: req.headers
                    .set("Authorization", this.token.authJwtToken)
            });

            return next.handle(cloned);
        }
        else {
            return next.handle(req);
        }
    }

}
