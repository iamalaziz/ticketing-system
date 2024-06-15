import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

import { AuthService } from '../auth.service';
import { AuthLoginDto } from '../dto/auth.dto';
// import { User } from '../../user/entities/user.entity';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
        });
    }
    async validate(email: string, password: string) {
        const user = await this.authService.validateLogin({ email, password });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}
