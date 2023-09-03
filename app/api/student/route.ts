import { PrismaClient } from '@prisma/client'
import { parse } from 'path';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        
        const students = await prisma.student.findMany({
            where: {
                name: "Test"
            },
            include: {
                notebooks: true,
            },
        })

        return new Response(JSON.stringify(students))
    } catch (error) {
        return new Response('Could not fetch student', {status: 500})
    }
}