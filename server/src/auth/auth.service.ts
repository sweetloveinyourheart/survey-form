import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { LoginDTO } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';
import { User } from 'src/user/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UserRoles } from 'src/user/entities/role.entity';

export interface AuthenticatedUser {
    phone: string
    roles: UserRoles[]
    sub: number
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) { }

    public async validateUser(data: LoginDTO): Promise<User | null> {
        const user = await this.userService.getUserByPhone(data.phone)
        if (!user) return null

        const password = user.password
        const isValidPass = await bcrypt.compare(data.password, password)
        if (!isValidPass) return null

        return user
    }

    public async login(user: User, res: Response) {
        const payload = { phone: user.phone, sub: user.id, roles: user.roles };
        // Generate JWT
        const accessToken = await this.jwtService.sign(payload)
        const refreshToken = await this.jwtService.sign(payload, { secret: process.env.REFRESH_TOKEN_SECRET, expiresIn: '7d' })

        return res
            .status(200)
            .cookie('refreshToken', refreshToken, { httpOnly: true, domain: process.env.FRONTEND_DOMAIN })
            .json({
                accessToken
            })
    }

    public async refreshToken(refreshToken: string | undefined) {
        if(!refreshToken) throw new UnauthorizedException("No refreshToken found !")

        const isValid = await this.jwtService.verify(refreshToken, { secret: process.env.REFRESH_TOKEN_SECRET })
        if (!isValid) throw new UnauthorizedException("Refresh token is not valid !")

        const decoded: any = await this.jwtService.decode(refreshToken)
        const payload = { phone: decoded.phone, sub: decoded.sub, roles: decoded.roles };
        
        const accessToken = await this.jwtService.sign(payload)

        return {
            accessToken
        }
    }

    public async logout(res: Response) {
        return res.clearCookie('refreshToken', { httpOnly: true, domain: process.env.FRONTEND_DOMAIN }).json({ success: true })
    }
}
