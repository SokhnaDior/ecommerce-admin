"use client"

import { ColumnDef } from "@tanstack/react-table";
import {CellAction} from "@/app/(dashboard)/[storeId]/(routes)/billboards/components/cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type CategoryColumn = {
    id: string
   label: string
    createdAt: string
}

export const columns: ColumnDef<CategoryColumn>[] = [
    {
        accessorKey: "label",
        header: "Label",
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        id: "actions",
        cell: ({row}) => <CellAction data={row.original}/>
    }
]
// this is copied from chadcn ui