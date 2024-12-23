import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SigninDto } from './dto/auth.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';


const EXPIRE_TIME = 20 * 1000;

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    async signin(dto: SigninDto) {
        const user = await this.validateUser(dto);
        const payload = {
            id: user.id,
            sub: {
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                roleId: user.role.id, 
                identification: user.identification
            },
        };

        return {
            user:{
                ...user,
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                roleId: user.role.id,
                roleName: user.role.name,
                identification: user.identification
            },
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    secret: process.env.jwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey,
                }),
                
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
            }

        }

    }

    async validateUser(dto: SigninDto) {
        const user = await this.userService.findByEmail(dto.email)

        if (user && (await compare(dto.password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        throw new UnauthorizedException('รหัสผ่าน หรือ อีเมล ไม่ถูกต้อง!');
    }


    async refreshToken(user: any) {
        const payload = {
            id: user.id,
            sub: {
                email: user.email,
                fname: user.fname,
                lname: user.lname,
                roleId: user.role.id, 
                identification: user.identification
            },
        };

        return {
            backendTokens: {
                accessToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '1h',
                    secret: process.env.jwtSecretKey,
                }),
                refreshToken: await this.jwtService.signAsync(payload, {
                    expiresIn: '7d',
                    secret: process.env.jwtRefreshTokenKey,
                }), 
                
                expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
            }
        }
    }
}
