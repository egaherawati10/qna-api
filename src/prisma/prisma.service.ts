import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "src/generated/prisma/client";

@Injectable()
export class PrismaService 
    extends PrismaClient
    implements OnModuleInit, OnModuleDestroy
{
    constructor() {
        const adapter = new PrismaPg({
            connectionString: process.env.DATABASE_URL,
        })

        super({ adapter })
    }
    
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