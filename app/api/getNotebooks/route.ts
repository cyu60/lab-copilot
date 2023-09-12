import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: Request) {
    try {
        //const { userId } = auth();
        //if (!userId) {
            //return new NextResponse("Unauthorized", { status: 401 });
        //}

        const userId = "cll9mxl200000v338yxqhscps";

        let createdNotebookNames: string[] = []

        const createdNotebooks = await prisma.notebook.findMany({
            where: {
                studentId: "cll9mxl200000v338yxqhscps", 
            },
        });

        createdNotebookNames = createdNotebooks.map((nb) => nb.name)

        return new Response(JSON.stringify(createdNotebookNames), { status: 201 })

    } catch (error) {
        console.error('Error fetching notebook:', error);
    }
}