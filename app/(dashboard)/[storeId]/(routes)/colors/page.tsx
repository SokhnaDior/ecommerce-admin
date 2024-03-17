import {ColorsClient} from "@/app/(dashboard)/[storeId]/(routes)/colors/components/client";
import prismadb from "@/lib/prismadb";
import {ColorColumns} from "@/app/(dashboard)/[storeId]/(routes)/colors/components/columns";
import {format} from "date-fns";

const ColorsPage = async ({
                                  params
                              }: {
    params: { storeId: string }
}) => {
    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    });

    const formattedColors: ColorColumns[] = colors.map((item) => ({
        id: item.id,
        name: item.name,
        value: item.value,
        createdAt: format(item.createdAt, "MMMM do, yyyy")
    }))

    return(
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <ColorsClient data={formattedColors}/>
            </div>
        </div>
    );
};
export default ColorsPage;

// apres la creation de billboard dans le fichier prisma, puis on cree un label dans main-nav
// on cree la page billboard ici