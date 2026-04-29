import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateThreadDto } from './dto/create-thread.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateThreadDto } from './dto/update-thread.dto';

@Injectable()
export class ThreadsService  {
    constructor(private prisma: PrismaService) {}

    async findAll() {
        return this.prisma.thread.findMany({
            include: { user: {select: { id: true, username: true }}},
            orderBy: { created_at: 'desc' }
        })
    }

    async findById(id: string) {
        const thread = await this.prisma.thread.findUnique({ 
            where: { id },
            include: { user: { select: { id: true, username: true }}},
        })

        if (!thread) throw new NotFoundException('Thread not found')
            return thread;
    }

    async findMyThreads(userId: string) {
        return this.prisma.thread.findMany({
            where: { user_id: userId },
            orderBy: {created_at: 'desc'},
        })
    }

    async create(dto: CreateThreadDto, userId: string) {
        return this.prisma.thread.create({
            data: {
                id: uuidv4(),
                title: dto.title,
                content: dto.content,
                user_id: userId,
            },
        })
    }

    async update(id: string, dto: UpdateThreadDto, userId: string) {
        const thread = await this.prisma.thread.findUnique({
            where: { id } })

        if (!thread) throw new NotFoundException('Thread not found')
        if (thread.user_id!== userId) throw new ForbiddenException('You are not the owner')

        return this.prisma.thread.update({
            where: { id }, data: dto
        })
    }

    async remove(id: string, userId: string) {
        const thread = await this.prisma.thread.findUnique({ where: { id } })

        if (!thread) throw new NotFoundException('Thread not found')
        if (thread.user_id!== userId) throw new ForbiddenException('You are not the owner')

        await this.prisma.thread.delete({ where: { id } })
        return { message: 'Thread deleted successfully' }
    }
}