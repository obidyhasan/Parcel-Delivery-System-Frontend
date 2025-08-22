import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setLoading } from "@/redux/features/loadingSlice";
import { useParcelTrackQuery } from "@/redux/features/Parcel/parcel.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ParcelDeliveryCard from "@/components/modules/Receiver/ParcelDeliveryCard";

const trackingSchema = z.object({
  trackingId: z.string().min(1, { message: "Tracking id required." }),
});

const ParcelTrack = () => {
  const [openTimeline, setOpenTimeline] = useState(false);
  const [trackingId, setTrackingId] = useState<undefined | string>(undefined);
  const {
    data: parcel,
    isLoading,
    isError,
  } = useParcelTrackQuery(trackingId, {
    skip: !trackingId,
  });

  const form = useForm<z.infer<typeof trackingSchema>>({
    resolver: zodResolver(trackingSchema),
    defaultValues: {
      trackingId: "",
    },
  });

  useEffect(() => {
    if (parcel) {
      setOpenTimeline(true);
    }
  }, [parcel]);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  console.log(parcel);

  const onSubmit = (data: z.infer<typeof trackingSchema>) => {
    setTrackingId(data.trackingId);
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center my-7">
        <h1 className="font-bold text-lg sm:text-2xl text-center ">
          Track You Parcel
        </h1>
        <p className="text-sm mt-2 text-muted-foreground">
          Enter your parcel tracking Id and Track you parcel Delivery status
        </p>
      </div>

      <div className="max-w-lg mx-auto mb-10">
        <div className="*:not-first:mt-2">
          <div className="flex gap-2">
            <Form {...form}>
              <form
                className="flex gap-2 w-full"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="flex-1">
                  <FormField
                    control={form.control}
                    name="trackingId"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            placeholder="TRK-1753947866569-339"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your tracking id.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <div className="pb-10">
        {!trackingId ? (
          <p className="text-muted-foreground text-center py-16 px-4 border-dashed border">
            Please enter a tracking ID
          </p>
        ) : isLoading ? (
          <p>Loading...</p>
        ) : isError ? (
          <p className=" text-center py-16 px-4 border-dashed border">
            Tracking ID not found
          </p>
        ) : openTimeline && parcel ? (
          <ParcelDeliveryCard parcel={parcel} />
        ) : (
          <p className="text-muted-foreground">No parcel data found</p>
        )}
      </div>
    </div>
  );
};

export default ParcelTrack;
