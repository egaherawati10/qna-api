import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";
import { UsersService } from "./users.service";

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get(':id')
  @ApiOperation({ summary: "Get a user's public profile by ID" })
  @ApiParam({ name: 'id', description: 'User ID (UUID)', example: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890' })
  @ApiResponse({ status: 200, description: 'User profile found', schema: { example: { id: 'a1b2c3d4-e5f6-7890-abcd-ef1234567890', username: 'johndoe', email: 'johndoe@example.com', created_at: '2026-04-20T10:00:00.000Z' } } })
  @ApiResponse({ status: 404, description: 'User not found', schema: { example: { statusCode: 404, message: 'User not found', error: 'Not Found' } } })
  @ApiResponse({ status: 500, description: 'Internal server error', schema: { example: { statusCode: 500, message: 'Something went wrong', error: 'Internal Server Error' } } })
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }
}