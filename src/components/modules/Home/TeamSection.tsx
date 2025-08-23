import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  avatar: string;
}

interface Team1Props {
  heading?: string;
  subheading?: string;
  description?: string;
  members?: TeamMember[];
}

const TeamSection = ({
  heading = "Team",
  description = "Our diverse team of experts brings together decades of experience in design, engineering, and product development.",
  members = [
    {
      id: "member-1",
      name: "Sarah Chen",
      role: "CEO & Founder",
      avatar: "https://i.ibb.co.com/k6nzzrC/phiron-pic.jpg",
    },
    {
      id: "member-2",
      name: "Marcus Rodriguez",
      role: "CTO",
      avatar:
        "https://i.ibb.co.com/n0F1hzK/family-therapy-psychologist-office.jpg",
    },
    {
      id: "member-3",
      name: "Emily Watson",
      role: "Head of Design",
      avatar: "https://i.ibb.co.com/vx7v6sF9/1696.jpg",
    },
    {
      id: "member-4",
      name: "David Kim",
      role: "Lead Engineer",
      avatar: "https://i.ibb.co.com/ZzDDz94J/17517.jpg",
    },
    {
      id: "member-5",
      name: "Lisa Thompson",
      role: "Product Manager",
      avatar: "https://i.ibb.co.com/Vp3zDw0F/1121.jpg",
    },
    {
      id: "member-6",
      name: "Alex Johnson",
      role: "UX Designer",
      avatar: "https://i.ibb.co.com/hJsxd60H/4110.jpg",
    },
  ],
}: Team1Props) => {
  return (
    <section className="py-10">
      <div className="container flex flex-col items-center text-center">
        <h2 className="text-pretty text-2xl font-bold sm:text-3xl">
          {heading}
        </h2>
        <p className="mt-2 text-muted-foreground mb-4 max-w-3xl text-sm sm:text-base">
          {description}
        </p>
      </div>
      <div className="container mt-16 grid gap-x-8 gap-y-16 md:grid-cols-2 lg:grid-cols-3">
        {members.map((member) => (
          <div key={member.id} className="flex flex-col items-center">
            <Avatar className="mb-4 size-20 border md:mb-5 lg:size-24">
              <AvatarImage src={member.avatar} className="object-cover" />
              <AvatarFallback>{member.name}</AvatarFallback>
            </Avatar>
            <p className="text-center font-medium">{member.name}</p>
            <p className="text-muted-foreground text-center">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
