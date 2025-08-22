import {
  ClipboardList,
  Clock,
  Headset,
  Lock,
  Truck,
  Users,
} from "lucide-react";

const ServiceSection = () => {
  const services = [
    {
      icon: <Truck className="h-6 w-6" />,
      title: "Fast Delivery",
      description:
        "Quick and reliable parcel delivery across the city, ensuring your packages reach on time.",
      items: ["Same-Day Delivery", "Express Shipping", "Scheduled Pickup"],
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Real-Time Tracking",
      description:
        "Track your parcels in real-time with unique tracking IDs and get live updates.",
      items: [
        "Parcel Tracking",
        "Status Notifications",
        "Live Location Updates",
      ],
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Secure & Safe",
      description:
        "Your packages are handled with care and delivered safely with secure authentication.",
      items: ["Safe Handling", "Verified Delivery", "Encrypted Data"],
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Role-Based Dashboard",
      description:
        "Tailored dashboards for senders, receivers, and admins to manage parcels efficiently.",
      items: ["Sender Dashboard", "Receiver Dashboard", "Admin Panel"],
    },
    {
      icon: <ClipboardList className="h-6 w-6" />,
      title: "Delivery History & Reports",
      description:
        "Access past deliveries and detailed reports to monitor trends and parcel status.",
      items: ["Delivery History", "Status Reports", "Monthly Trends"],
    },
    {
      icon: <Headset className="h-6 w-6" />,
      title: "Customer Support",
      description:
        "Our team is always ready to assist you with any parcel delivery queries or issues.",
      items: ["24/7 Support", "Live Chat", "Inquiry Form Assistance"],
    },
  ];

  return (
    <section className="py-16">
      <div className="">
        <div className="mx-auto max-w-7xl space-y-12 px-4">
          <div className="space-y-2 text-center">
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">
              Our Key Services
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mx-auto max-w-xl tracking-tight">
              Explore the features that make DeliverX fast, secure, and easy to
              use for senders, receivers, and admins.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {services.map((service, index) => (
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
                <div className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex items-center gap-2">
                      <div className="bg-foreground h-1.5 w-1.5 rounded-full" />
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceSection;
