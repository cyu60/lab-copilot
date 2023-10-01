import { PrismaClient } from '@prisma/client';
import { auth } from '@clerk/nextjs';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        // Uncomment this when you integrate authentication
        const { userId } = auth();
        if (!userId) {
            return new Response("Unauthorized", { status: 401 });
        }

        //const userId = "cll9mxl200000v338yxqhscps"; // Hardcoded for now

        const createdNotebooks = await prisma.notebook.findMany({
            where: {
                studentId: userId, 
            },
        });

        return new Response(JSON.stringify({ notebooks: createdNotebooks }), { status: 200 });

    } catch (error) {
        console.error('Error fetching notebook:', error);
        return new Response("Internal Server Error", { status: 500 });
    }
}
