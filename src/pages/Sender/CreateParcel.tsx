/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useParcelRequestMutation } from "@/redux/features/Parcel/parcel.api";
import { useGetMeQuery } from "@/redux/features/User/user.api";
import { setLoading } from "@/redux/features/loadingSlice";
import { useAppDispatch } from "@/redux/hook";
import { useNavigate } from "react-router";

const parcelSchema = z.object({
  title: z.string("Parcel Title Required").min(1, "Parcel title required."),
  type: z.enum(["Document", "Package", "Fragile", "Other"], {
    message: "Parcel Type Required.",
  }),
  weight: z.string("Parcel weight required").refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    },
    { message: "Weight must be greater than 0" }
  ),
  fee: z.string("Parcel fee required").refine(
    (val) => {
      const num = Number(val);
      return !isNaN(num) && num > 0;
    },
    { message: "Fee must be greater than 0" }
  ),
  receiverEmail: z.email("Invalid receiver email."),
  pickupAddress: z
    .string("Pickup Address Required.")
    .min(1, { message: "Pickup Address Required." }),
  deliveryAddress: z
    .string("Delivery Address Required.")
    .min(1, { message: "Delivery Address Required." }),
});

const CreateParcel = () => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [parcelRequest] = useParcelRequestMutation();
  const { data: user = {}, isLoading } = useGetMeQuery(undefined);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof parcelSchema>>({
    resolver: zodResolver(parcelSchema),
    defaultValues: {
      title: "",
      weight: undefined,
      fee: undefined,
      type: undefined,
      pickupAddress: "",
      deliveryAddress: "",
      receiverEmail: "",
    },
  });

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const onSubmit = async (data: z.infer<typeof parcelSchema>) => {
    const toastId = toast.loading("Please wait...");
    setButtonDisable(true);

    const parcelInfo = {
      title: data?.title,
      type: data?.type,
      weight: Number(data?.weight),
      fee: Number(data?.fee),
      senderId: user?._id,
      receiverEmail: data?.receiverEmail,
      pickupAddress: data?.pickupAddress,
      deliveryAddress: data?.deliveryAddress,
    };

    try {
      const res = await parcelRequest(parcelInfo).unwrap();

      if (res.success) {
        toast.success("Parcel create successfully", { id: toastId });
        navigate("/sender/parcels");
        form.reset();
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
        id: toastId,
      });
    } finally {
      setButtonDisable(false);
    }
  };
  return (
    <div>
      <h1 className="text-lg font-bold mb-4">Create Parcel Request</h1>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Parcel Title" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your Parcel Title.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Parcel Weight"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your public display email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fee</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Parcel Fee"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your Parcel Fee.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Type</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} {...field}>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Type</SelectLabel>
                            <SelectItem value="Document">Document</SelectItem>
                            <SelectItem value="Package">Package</SelectItem>
                            <SelectItem value="Fragile">Fragile</SelectItem>
                            <SelectItem value="Other">Other</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your Parcel Type.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="receiverEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Receiver Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="obidyhasan@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your sender display email.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
              <FormField
                control={form.control}
                name="pickupAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pickup Address</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter Pickup Address" {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your pickup address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deliveryAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Delivery Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Delivery Address"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is delivery address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button disabled={buttonDisable} type="submit" className="">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateParcel;
