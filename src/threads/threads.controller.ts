import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ThreadsService } from './threads.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';

@ApiTags('Threads')
@Controller('threads')
export class ThreadsController {
  constructor(private threadsService: ThreadsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all threads from all users (public)' })
  @ApiResponse({ status: 200, description: 'List of all threads', schema: { example: [{ id: 'T101', title: 'How do I use dotenv?', content: 'I am confused about env vars...', created_at: '2026-04-22T08:15:00.000Z', updated_at: '2026-04-22T08:15:00.000Z', user: { id: 'U001', username: 'johndoe' } }] } })
  @ApiResponse({ status: 500, description: 'Internal server error', schema: { example: { statusCode: 500, message: 'Something went wrong', error: 'Internal Server Error' } } })
  findAll() {
    return this.threadsService.findAll()
  }

  @Get('my-threads')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all threads belonging to the logged-in user' })
  @ApiResponse({ status: 200, description: 'List of threads owned by the current user', schema: { example: [{ id: 'T101', title: 'How do I use dotenv?', content: 'I am confused about env vars...', created_at: '2026-04-22T08:15:00.000Z', updated_at: '2026-04-22T08:15:00.000Z' }] } })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid', schema: { example: { statusCode: 401, message: 'Unauthorized' } } })
  @ApiResponse({ status: 500, description: 'Internal server error', schema: { example: { statusCode: 500, message: 'Something went wrong', error: 'Internal Server Error' } } })
  myThreads(@Request() req) {
    return this.threadsService.findMyThreads(req.user.id)
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific thread by ID (public)' })
  @ApiParam({ name: 'id', description: 'Thread ID', example: 'T101' })
  @ApiResponse({ status: 200, description: 'Thread detail found', schema: { example: { id: 'T101', title: 'How do I use dotenv?', content: 'I am confused about env vars...', created_at: '2026-04-22T08:15:00.000Z', updated_at: '2026-04-22T08:15:00.000Z', user: { id: 'U001', username: 'johndoe' } } } })
  @ApiResponse({ status: 404, description: 'Thread not found', schema: { example: { statusCode: 404, message: 'Thread not found', error: 'Not Found' } } })
  @ApiResponse({ status: 500, description: 'Internal server error', schema: { example: { statusCode: 500, message: 'Something went wrong', error: 'Internal Server Error' } } })
  findOne(@Param('id') id: string) {
    return this.threadsService.findById(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a new thread (requires auth)' })
  @ApiResponse({ status: 201, description: 'Thread created successfully', schema: { example: { id: 'uuid-string', title: 'My new question', content: 'Here is my detailed question...', user_id: 'U001', created_at: '2026-05-18T10:00:00.000Z', updated_at: '2026-05-18T10:00:00.000Z' } } })
  @ApiResponse({ status: 400, description: 'Validation error (empty input / title too short)', schema: { example: { statusCode: 400, message: ['title must be longer than or equal to 5 characters'], error: 'Bad Request' } } })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid', schema: { example: { statusCode: 401, message: 'Unauthorized' } } })
  @ApiResponse({ status: 500, description: 'Internal server error', schema: { example: { statusCode: 500, message: 'Something went wrong', error: 'Internal Server Error' } } })
  create(@Body() dto: CreateThreadDto, @Request() req) {
    return this.threadsService.create(dto, req.user.id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a thread by ID (only accessible by thread creator)' })
  @ApiParam({ name: 'id', description: 'Thread ID to update', example: 'T101' })
  @ApiResponse({ status: 200, description: 'Thread updated successfully', schema: { example: { id: 'T101', title: 'Updated title', content: 'Updated content here...', user_id: 'U001', created_at: '2026-04-22T08:15:00.000Z', updated_at: '2026-05-18T10:00:00.000Z' } } })
  @ApiResponse({ status: 400, description: 'Validation error (empty input / title too short)', schema: { example: { statusCode: 400, message: ['title must be longer than or equal to 5 characters'], error: 'Bad Request' } } })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid', schema: { example: { statusCode: 401, message: 'Unauthorized' } } })
  @ApiResponse({ status: 403, description: 'Forbidden - you are not the owner of this thread', schema: { example: { statusCode: 403, message: 'You are not the owner', error: 'Forbidden' } } })
  @ApiResponse({ status: 404, description: 'Thread not found', schema: { example: { statusCode: 404, message: 'Thread not found', error: 'Not Found' } } })
  @ApiResponse({ status: 500, description: 'Internal server error', schema: { example: { statusCode: 500, message: 'Something went wrong', error: 'Internal Server Error' } } })
  update(@Param('id') id: string, @Body() dto: UpdateThreadDto, @Request() req) {
    return this.threadsService.update(id, dto, req.user.id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a thread by ID (only accessible by thread creator)' })
  @ApiParam({ name: 'id', description: 'Thread ID to delete', example: 'T101' })
  @ApiResponse({ status: 200, description: 'Thread deleted successfully', schema: { example: { message: 'Thread deleted successfully' } } })
  @ApiResponse({ status: 401, description: 'Unauthorized - JWT token missing or invalid', schema: { example: { statusCode: 401, message: 'Unauthorized' } } })
  @ApiResponse({ status: 403, description: 'Forbidden - you are not the owner of this thread', schema: { example: { statusCode: 403, message: 'You are not the owner', error: 'Forbidden' } } })
  @ApiResponse({ status: 404, description: 'Thread not found', schema: { example: { statusCode: 404, message: 'Thread not found', error: 'Not Found' } } })
  @ApiResponse({ status: 500, description: 'Internal server error', schema: { example: { statusCode: 500, message: 'Something went wrong', error: 'Internal Server Error' } } })
  remove(@Param('id') id: string, @Request() req) {
    return this.threadsService.remove(id, req.user.id)
  }
}