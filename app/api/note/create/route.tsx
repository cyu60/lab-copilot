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

        //add stuff for adding post content

        const userId = "cll9mxl200000v338yxqhscps"
        

        //need to connect each block with an ID so we can update the correct one
        const body = await req.json()
        const { notelistId, content } = body

        /*
        if (notebookExists) {
            return new Response('Notebook already exists', {status: 409})
        }
        */

        const note = await prisma.note.create({
            data: {
                notelistId, 
                content,
            },
        });

        console.log(note)
        return new Response(JSON.stringify(note), {status: 201})

    } catch (error) {
        console.error('Error creating note:', error);
    }
}