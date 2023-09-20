import { PrismaClient} from "@prisma/client";

const prisma = new PrismaClient();


//may move this to getNotebooks and cache it there; will keep like this for now
export async function GET(req: Request) {
    try {

        //get notebook connected to the slug and the userId, then use the notebook id as the referential
        //figure out how many params gives you a unique notebook

        //include the slug in the actual query request to get it

        //const { userId } = auth();
        //if (!userId) {
            //return new NextResponse("Unauthorized", { status: 401 });
        //}

        const userId = "cll9mxl200000v338yxqhscps"


        //current notebook information could maybe be cached
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug")

        const currNotebook = await prisma.notebook.findFirst({
            where: {
                studentId: userId,
                name: slug as string,
            },
            include: {
                pages: true,
            }
        })

        let notelistNames: string[] = []

        if (currNotebook) {
            notelistNames = currNotebook.pages.map((nl) => nl.name)
        } else {
            return new Response("Notebook does not exist", { status: 500});
        }

        console.log(notelistNames)
        return new Response(JSON.stringify(notelistNames), {status: 201})

    } catch (error) {
        console.error('Error fetching notelist:', error);
    }
}