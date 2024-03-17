import {NextResponse} from "next/server";
import {auth} from "@clerk/nextjs";
import prismadb from '@/lib/prismadb';

export async function POST(
    req: Request,
)
{
    try {
        const {userId} = auth();
        const body = await req.json();
        const { name }: any = body;

        if(!userId) {
            return new NextResponse("Unauthorized", {status: 401})
        }
        if(!name) {
            return new NextResponse("Name is required", {status: 400})
        }

        const store = await prismadb.store.create({
            data:{
                name,
                userId
            }
            });// this is going to create our store
        return NextResponse.json(store)

    }catch(error) {
        console.log('[STORES_POST]', error); // qui va afficher l'erreur dans la console
        return new NextResponse("Internal Error", {status: 500});
    }
}