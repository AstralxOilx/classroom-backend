import { Body, Controller, Post,UseGuards ,Request} from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { SigninDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { RefreshJwtGuard } from './guards/refresh.guard';  

@Controller('auth')
export class AuthController {
    constructor(
        private userService: UserService,
        private authService: AuthService
    ) { }

    @Post('signup')
    async signupUser(@Body() dto: CreateUserDto) {
        return await this.userService.create(dto);
    }


    @Post('signin')
    async signinUser(@Body() dto: SigninDto) {
        return await this.authService.signin(dto);
    }

    @UseGuards(RefreshJwtGuard)
    @Post('refresh')
    async refreshToken(@Request() req){
        return await this.authService.refreshToken(req.user);
    }
}
