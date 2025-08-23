/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Contact2Props {
  title?: string;
  description?: string;
  phone?: string;
  email?: string;
  web?: { label: string; url: string };
}

const ContactSection = ({
  title = "Contact Us",
  description = "We are available for questions, feedback, or collaboration opportunities. Let us know how we can help!",
  phone = "(123) 34567890",
  email = "email@example.com",
  web = { label: "deliverx.com", url: "https://shadcnblocks.com" },
}: Contact2Props) => {
  const handleOnSubmitForm = (e: any) => {
    e.preventDefault();
    toast.success("Send Message Successfully");
    e.target.reset();
  };

  return (
    <section className="py-16">
      <div className="">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 lg:flex-row ">
          <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5">
            <div className=" lg:text-left">
              <h1 className="mb-2 sm:text-3xl text-2xl  font-semibold lg:mb-1">
                {title}
              </h1>
              <p className="text-muted-foreground text-sm sm:text-base">
                {description}
              </p>
            </div>
            <div className="">
              <h3 className="mb-6 text-xl font-semibold lg:text-left">
                Contact Details
              </h3>
              <ul className="ml-4 list-disc">
                <li>
                  <span className="font-bold">Phone: </span>
                  {phone}
                </li>
                <li>
                  <span className="font-bold">Email: </span>
                  <a href={`mailto:${email}`} className="underline">
                    {email}
                  </a>
                </li>
                <li>
                  <span className="font-bold">Web: </span>
                  <a className="underline">{web.label}</a>
                </li>
              </ul>
            </div>
          </div>
          <form onSubmit={handleOnSubmitForm}>
            <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-lg border p-4">
              <div className="flex gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="firstname">First Name</Label>
                  <Input
                    type="text"
                    id="firstname"
                    placeholder="Jon"
                    required
                  />
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="lastname">Last Name</Label>
                  <Input type="text" id="lastname" placeholder="Deo" required />
                </div>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  placeholder="jondeo@gmail.com"
                  required
                />
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  placeholder="Subject"
                  required
                />
              </div>
              <div className="grid w-full gap-1.5">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  placeholder="Type your message here."
                  id="message"
                  required
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
