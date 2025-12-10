import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { verifyToken } from '../constants/auth.constant';
import { Reflector } from '@nestjs/core'; 
import { IS_PUBLIC_KEY } from '../decorator/public.decorator';

@Injectable()
export class AuthGuard implements CanActivate { 
  constructor(private reflector: Reflector){}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> { 
    
    const isPublic =  this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]) 
     if(isPublic){
       return true
     }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Authorization header missing');
    }

    try {
      const decode = verifyToken(token) as any;

      if (decode?.exp && decode.exp < Date.now() / 1000) {
        throw new UnauthorizedException('Token expired');
      }
      request.user = decode;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
