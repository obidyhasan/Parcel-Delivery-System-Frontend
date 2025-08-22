import AboutSection from "@/components/modules/Home/AboutSection";
import MissionSection from "@/components/modules/Home/MissionSection";
import TeamSection from "@/components/modules/Home/TeamSection";

const About = () => {
  return (
    <div className="max-w-7xl mx-auto px-4">
      <AboutSection />
      <MissionSection />
      <TeamSection />
    </div>
  );
};

export default About;
