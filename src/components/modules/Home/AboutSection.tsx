import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/images/about_img1.jpg";
import aboutImg2 from "@/assets/images/about_img2.jpg";
import logo from "@/assets/icons/logo_icon.svg";

interface About3Props {
  title?: string;
  description?: string;
  mainImage?: {
    src: string;
    alt: string;
  };
  secondaryImage?: {
    src: string;
    alt: string;
  };
  breakout?: {
    src: string;
    alt: string;
    title?: string;
    description?: string;
    buttonText?: string;
    buttonUrl?: string;
  };
  companiesTitle?: string;
  companies?: Array<{
    src: string;
    alt: string;
  }>;
  achievementsTitle?: string;
  achievementsDescription?: string;
  achievements?: Array<{
    label: string;
    value: string;
  }>;
}

const defaultAchievements = [
  { label: "Parcels Delivered", value: "10,000+" },
  { label: "Active Users", value: "2,500+" },
  { label: "Cities Covered", value: "50+" },
  { label: "On-Time Delivery", value: "99%" },
];

const AboutSection = ({
  title = "About DeliverX",
  description = "DeliverX is a modern parcel delivery system connecting senders, receivers, and admins for fast, secure, and reliable deliveries.",
  mainImage = {
    src: "",
    alt: "Parcel delivery illustration",
  },
  secondaryImage = {
    src: "",
    alt: "Delivery dashboard illustration",
  },
  breakout = {
    src: "",
    alt: "Service illustration",
    title: "Fast, Secure, and Easy Parcel Management",
    description:
      "Create, track, and manage parcels efficiently with real-time updates and role-based dashboards for senders, receivers, and admins.",
    buttonText: "Learn More",
    buttonUrl: "#services",
  },
  achievementsTitle = "Our Achievements",
  achievementsDescription = "We take pride in delivering parcels quickly, safely, and reliably.",
  achievements = defaultAchievements,
}: About3Props = {}) => {
  return (
    <section className="py-10">
      <div>
        <div className="mb-10 text-center">
          <h1 className="text-2xl sm:text-3xl font-semibold">{title}</h1>

          <p className="mx-auto mt-2 text-muted-foreground mb-4 max-w-3xl text-sm sm:text-base">
            {description}
          </p>
        </div>

        <div className="grid gap-7 lg:grid-cols-3">
          <img
            src={aboutImg}
            alt={mainImage.alt}
            className="size-full max-h-[620px] rounded-xl object-cover lg:col-span-2"
          />
          <div className="flex flex-col gap-7 md:flex-row lg:flex-col">
            <div className="flex flex-col justify-between gap-6 rounded-xl bg-muted p-7 md:w-1/2 lg:w-auto">
              <img src={logo} alt={breakout.alt} className="mr-auto h-12" />
              <div>
                <p className="mb-2 text-lg font-semibold">{breakout.title}</p>
                <p className="text-muted-foreground text-sm sm:text-base">
                  {breakout.description}
                </p>
              </div>
              <Button variant="outline" className="mr-auto" asChild>
                <a href={breakout.buttonUrl}>{breakout.buttonText}</a>
              </Button>
            </div>
            <img
              src={aboutImg2}
              alt={secondaryImage.alt}
              className="grow basis-0 rounded-xl object-cover md:w-1/2 lg:min-h-0 lg:w-auto"
            />
          </div>
        </div>

        <div className="mt-10 relative overflow-hidden rounded-xl bg-muted p-10 md:p-16">
          <div className="flex flex-col gap-4 text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-semibold">
              {achievementsTitle}
            </h2>
            <p className="max-w-xl text-muted-foreground sm:text-base text-sm">
              {achievementsDescription}
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 text-center">
            {achievements.map((item, idx) => (
              <div className="flex flex-col gap-4" key={item.label + idx}>
                <p>{item.label}</p>
                <span className="text-4xl font-semibold md:text-5xl">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
