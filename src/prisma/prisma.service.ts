import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "generated/prisma/client";

@Injectable()
export class PrismaService 
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    async onModuleInit() {
        try {
            await this.$connect()
            console.log('Database connected')
        } catch (error) {
            console.error('Database connection failed:', error)
            throw error
        }
    }

    async onModuleDestroy() {
        await this.$disconnect()
        console.log('Database disconnected')
    }
}