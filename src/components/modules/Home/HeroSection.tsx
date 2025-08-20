import { ArrowRight } from "lucide-react";
import deliveryImg from "@/assets/images/parcel-delivery-img.jpg";
import { Button } from "@/components/ui/button";

const HomeSection = () => {
  return (
    <section>
      <div className="bg-muted ">
        <div className="grid items-center gap-6 lg:grid-cols-2 max-w-7xl mx-auto px-4">
          <div
            className="flex flex-col items-center py-10
           text-center lg:items-start lg:text-left"
          >
            <p className="font-semibold lg:text-base text-sm">
              Send. Track. Receive. Anywhere, Anytime.
            </p>
            <h1 className="my-4 text-pretty text-3xl font-bold lg:text-5xl">
              Deliver<span className="text-primary">X</span> – Fast & Secure
              Delivery at Your Doorstep
            </h1>
            <p className="text-muted-foreground mb-8 max-w-xl text-sm lg:text-base">
              DeliverX is a modern parcel delivery platform that connects
              senders, receivers, and admins in one seamless system. Whether
              you’re sending a package across the city or managing bulk
              deliveries, our role-based dashboards make it easy.
            </p>
            <div className="flex w-full flex-col justify-center gap-2 sm:flex-row lg:justify-start">
              <Button>
                Deliver your parcel
                <ArrowRight className="size-4" />
              </Button>
            </div>
          </div>
          <div className="w-full h-full">
            <img
              src={deliveryImg}
              alt="placeholder hero"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeSection;
