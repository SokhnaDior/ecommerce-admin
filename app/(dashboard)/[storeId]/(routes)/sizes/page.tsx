import {SizeClient} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/client";
import prismadb from "@/lib/prismadb";
import {SizeColumns} from "@/app/(dashboard)/[storeId]/(routes)/sizes/components/columns";
import {format} from "date-fns";

const SizesPage = async ({
                                  params
                              }: {
    params: { storeId: string }
}) => {
    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedSizes: SizeColumns[] = sizes.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <SizeClient data={formattedSizes}/>
            </div>
        </div>
    );
};
export default SizesPage;

// apres la creation de billboard dans le fichier prisma, puis on cree un label dans main-nav
// on cree la page billboard ici