import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
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
        const { name } = body

        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug")

        const currNotebook = await prisma.notebook.findFirst({
            where: {
                studentId: userId,
                name: slug as string,
            }
        })

        let currNotebookId = ""

        if (currNotebook) {
            currNotebookId = currNotebook.id
        } else {
            return new Response("Notebook does not exist", { status: 500});
        }

        /*
        if (notebookExists) {
            return new Response('Notebook already exists', {status: 409})
        }
        */

        const notelist = await prisma.notelist.create({
            data: {
                notebookId: currNotebookId, 
                name: name,
                report: ""
            },
        });

        console.log(notelist)
        return new Response(JSON.stringify(notelist), {status: 201})

    } catch (error) {
        console.error('Error creating notelist:', error);
    }
}