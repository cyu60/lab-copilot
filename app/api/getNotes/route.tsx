import { Note, PrismaClient} from "@prisma/client";

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

        //current notebook information could maybe be cached
        const { searchParams } = new URL(req.url);
        const slug = searchParams.get("slug")

        const currNotelist = await prisma.notelist.findFirst({
            where: {
                id: slug as string,
            },
            include: {
                notes: true,
            }
        })

        let notes: Note[] = []

        if (currNotelist) {
            notes = currNotelist.notes
        } else {
            return new Response("Notelist does not exist", { status: 500});
        }

        console.log(notes)
        return new Response(JSON.stringify(notes), {status: 201})

    } catch (error) {
        console.error('Error fetching notes:', error);
    }
}