import 'dotenv/config'
import * as bcrypt from 'bcrypt'
import { PrismaClient } from './generated/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! })
const prisma = new PrismaClient({ adapter })

async function main() {

    await prisma.thread.deleteMany();
    await prisma.user.deleteMany();

    console.log('Seeding users...')
    const passwordHash = await bcrypt.hash('password123', 10)

    await prisma.user.createMany({
        data: [
            {
                "id": "U001",
                "username": "johndoe",
                "email": "johndoe@example.com",
                "password_hash": passwordHash,
                "created_at": "2026-04-20T10:00:00Z"
            },
            {
                "id": "U002",
                "username": "janedoe",
                "email": "jane@example.com",
                "password_hash": passwordHash,
                "created_at": "2026-04-21T14:30:00Z"
            }
        ]
    });

    await prisma.thread.createMany({
        data: [
            {
                "id": "T101",
                "user_id": "U001",
                "title": "How do I set up environment variables in Node.js?",
                "content": "I am new to backend development and confused about how to hide my API keys. Could someone explain how to use dotenv?",
                "created_at": "2026-04-22T08:15:00Z",
                "updated_at": "2026-04-22T08:15:00Z"
            },
            {
                "id": "T102",
                "user_id": "U002",
                "title": "When should I use PostgreSQL vs MongoDB?",
                "content": "For a medium-scale e-commerce project, which database is more recommended and why?",
                "created_at": "2026-04-22T09:45:00Z",
                "updated_at": "2026-04-22T10:00:00Z"
            },
            {
                "id": "T103",
                "user_id": "U001",
                "title": "Getting a CORS error when hitting the API from React",
                "content": "I keep getting an 'Access-Control-Allow-Origin' error. How do I handle this on the Express.js side?",
                "created_at": "2026-04-22T11:20:00Z",
                "updated_at": "2026-04-22T11:20:00Z"
            }
        ],
    });

    console.log('Seed completed');
}

main()
.catch((e) => {
    console.error('Seed failed', e);
    process.exit(1);
})
.finally(async () => {
    await prisma.$disconnect();
});