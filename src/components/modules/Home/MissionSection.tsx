import { Clock, Globe, Lock, Truck } from "lucide-react";

const MissionSection = () => {
  const missions = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast & Reliable Delivery",
      description:
        "Ensure parcels reach their destination quickly and safely, every time.",
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-Time Tracking",
      description:
        "Keep customers informed at every step with live parcel updates.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure & Safe Handling",
      description:
        "Handle every parcel with care and maintain strict security standards.",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: "Nationwide Coverage",
      description:
        "Connect senders and receivers across multiple cities seamlessly.",
    },
  ];

  return (
    <section className="py-10">
      <div className="">
        <div className="mx-auto max-w-7xl space-y-12 px-4">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Our Mission
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mx-auto max-w-3xl tracking-tight">
              Explore the features that make DeliverX fast, secure, and easy to
              use for senders, receivers, and admins.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {missions.map((service, index) => (
              <div
                key={index}
                className="border-border space-y-6 rounded-lg border p-8 transition-shadow hover:shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="bg-muted rounded-full p-3">
                    {service.icon}
                  </div>
                  <h3 className="text-lg font-semibold">{service.title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionSection;
