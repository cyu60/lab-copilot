import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export default async function POST(req: Request) {
    try {

        //get notebook connected to the slug and the userId, then use the notebook id as the referential
        //figure out how many params gives you a unique notebook

        //include the slug in the actual query request to get it

        //const { userId } = auth();
        //if (!userId) {
            //return new NextResponse("Unauthorized", { status: 401 });
        //}

        const userId = "cll9mxl200000v338yxqhscps"
        
        const body = await req.json()
        const {name} = body

        //check if notebook is created already:
        /*
        const notebookExists = await prisma.notebook.findFirst({
            where: {
                name,
            }
        })

        if (notebookExists) {
            return new Response('Notebook already exists', {status: 409})
        }
        */

        const notebook = await prisma.notelist.create({
            data: {
                notebookId: userId, 
                name: name,
            },
        });

        console.log(notebook)
        return new Response(JSON.stringify(notebook),{status: 201})

    } catch (error) {
        console.error('Error creating notebook:', error);
    }
}
}