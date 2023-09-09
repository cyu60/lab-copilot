import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: Request) {
    try {

        //const { userId } = auth();
        //if (!userId) {
            //return new NextResponse("Unauthorized", { status: 401 });
        //}

        const body = await req.json()
        const {name} = body

        //check if notebook is created already under the user:
        /*
        const notebookExists = await prisma.notebook.findFirst({
            where: {
                studentId: userId
                name,
            }
        })

        if (notebookExists) {
            return new Response('Notebook already exists', {status: 409})
        }
        */

        const notebook = await prisma.notebook.create({
            data: {
                studentId: "cll9mxl200000v338yxqhscps", 
                name: name,
            },
        });

        console.log(notebook)
        return new Response(JSON.stringify(notebook),{status: 201})

    } catch (error) {
        console.error('Error creating notebook:', error);
    }
}