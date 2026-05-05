import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ThreadsService } from './threads.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CreateThreadDto } from './dto/create-thread.dto';
import { UpdateThreadDto } from './dto/update-thread.dto';

@Controller('threads')
export class ThreadsController {
  constructor(private threadsService: ThreadsService) {}

  @Get()
  findAll() {
    return this.threadsService.findAll()
  }

  @Get('my-threads')
  @UseGuards(JwtAuthGuard)
  myThreads(@Request() req) {
    return this.threadsService.findMyThreads(req.user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.threadsService.findById(id)
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  create(@Body() dto: CreateThreadDto, @Request() req) {
    return this.threadsService.create(dto, req.user.id)
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  update(@Param('id') id: string, @Body() dto: UpdateThreadDto, @Request() req) {
    return this.threadsService.update(id, dto, req.user.id)
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  remove(@Param('id') id: string, @Request() req) {
    return this.threadsService.remove(id, req.user.id)
  }
}
