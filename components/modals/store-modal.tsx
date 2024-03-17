"use client"
import {Modal} from "@/components/ui/modal";
import {useStoreModal} from "@/hooks/use-store-model";
import * as z from "zod";
import axios from "axios";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormMessage}
    from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {useState} from "react";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1),// qui oblige de donner un nom au store
});

export const  StoreModal = () => {
    const storeModal = useStoreModal();
    const [loading, setLoading] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues:{
            name:"",
        },
    });

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(values);
        // CREATING STORE
        try {
            setLoading(true);
            const response = await axios.post("/api/stores", values);

           window.location.assign(`/${response.data.id}`)
        }catch (error){
            toast.error("Something went wrong");
        }finally {
            setLoading(false);
        }
    }

    return (
        <Modal
            title="Create Store"
            description="Add new store to manage products and categories"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div className="space-y-4 py-2 pb-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading}
                                               placeholder="E-Commerce"
                                               {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div  className="pt-6 space-x-2 flex items-center justify-end">
                            <Button
                                disabled={loading}
                                variant="outline"
                                onClick={storeModal.onClose} >
                                Cancel
                            </Button>
                            <Button disabled={loading} type="submit">
                                Continue
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </Modal>
    );
};

// c'est la principale pour creer les boutique
// zod pour la validation