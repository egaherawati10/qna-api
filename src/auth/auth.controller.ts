import { Controller, Post, Body, HttpCode } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'
import { AuthService } from './auth.service'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('register')
    @ApiOperation({ summary: 'Register a new user' })
    @ApiBody({ type: RegisterDto })
    @ApiResponse({ status: 201, description: 'User registered successfully', schema: { example: { message: 'User registered successfully', userId: 'uuid-string' } } })
    @ApiResponse({ status: 400, description: 'Validation error (empty input / invalid email format)', schema: { example: { statusCode: 400, message: ['email must be an email'], error: 'Bad Request' } } })
    @ApiResponse({ status: 409, description: 'Email or username already taken', schema: { example: { statusCode: 409, message: 'Email or username already taken', error: 'Conflict' } } })
    @ApiResponse({ status: 500, description: 'Internal server error', schema: { example: { statusCode: 500, message: 'Something went wrong', error: 'Internal Server Error' } } })
    register(@Body() dto: RegisterDto) {
        return this.authService.register(dto)
    }

    @Post('login')
    @HttpCode(200)
    @ApiOperation({ summary: 'Login and get JWT token' })
    @ApiBody({ type: LoginDto })
    @ApiResponse({ status: 200, description: 'Login successful, returns JWT token', schema: { example: { access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' } } })
    @ApiResponse({ status: 400, description: 'Validation error (empty input / invalid email format)', schema: { example: { statusCode: 400, message: ['email must be an email'], error: 'Bad Request' } } })
    @ApiResponse({ status: 401, description: 'Invalid credentials', schema: { example: { statusCode: 401, message: 'Invalid credentials', error: 'Unauthorized' } } })
    @ApiResponse({ status: 500, description: 'Internal server error', schema: { example: { statusCode: 500, message: 'Something went wrong', error: 'Internal Server Error' } } })
    login(@Body() dto: LoginDto) {
        return this.authService.login(dto)
    }
}