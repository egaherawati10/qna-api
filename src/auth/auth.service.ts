import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { PrismaService } from '../prisma/prisma.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) {}

    async register(dto: RegisterDto) {
        const existing = await this.prisma.user.findFirst({
            where: { OR: [{ email: dto.email }, { username: dto.username }] },
        })

        if (existing) throw new ConflictException('Email or username already taken')

        const password_hash = await bcrypt.hash(dto.password, 10)

        const user = await this.prisma.user.create({
            data: {
                id: uuidv4(),
                username: dto.username,
                email: dto.email,
                password_hash,
            },
        })

        return { message: 'User registered successfully', userId: user.id }
    }

    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({ where: { email: dto.email } })

        if (!user) throw new UnauthorizedException('Invalid credentials')

        const valid = await bcrypt.compare(dto.password, user.password_hash)
        if (!valid) throw new UnauthorizedException('Invalid credentials')

        const token = this.jwtService.sign({
            sub: user.id,
            username: user.username,
        })

        return { access_token: token }
    }
}