/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import registerImg from "@/assets/images/registerImg.jpg";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Password from "@/components/ui/Password";
import Logo from "@/assets/icons/Logo";
import z from "zod";
import { useRegisterMutation } from "@/redux/features/auth/auth.api";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";

const registerSchema = z.object({
  name: z
    .string("Name must be string")
    .min(2, "Name must be at least 2 characters long."),
  email: z.email({ message: "Invalid email address format." }),
  password: z
    .string("Password must be string")
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/^(?=.*[A-Z])/, {
      message: "Password must contain at least 1 uppercase letter.",
    })
    .regex(/^(?=.*[!@#$%^&*])/, {
      message: "Password must contain at least 1 special character.",
    })
    .regex(/^(?=.*\d)/, {
      message: "Password must contain at least 1 number",
    }),
  role: z.enum(["SENDER", "RECEIVER"], {
    message: "Please choose from SENDER, or RECEIVER.",
  }),
});

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const [buttonDisable, setButtonDisable] = useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      role: undefined,
      password: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    const toastId = toast.loading("Please wait...");
    setButtonDisable(true);
    console.log(data);
    try {
      const res = await register(data).unwrap();
      console.log(res);
      if (res.success) {
        toast.success("Register successfully", { id: toastId });
        navigate("/login", { replace: true });
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
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="bg-muted relative hidden md:block">
            <img
              src={registerImg}
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="p-6 md:p-8">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col items-center text-center">
                <Link to={"/"} replace={true}>
                  <Logo />
                </Link>
                <h1 className="text-xl font-bold mt-2">Create Account</h1>
                <p className="text-muted-foreground text-sm">
                  Create account in DeliverX Service
                </p>
              </div>
              <Form {...form}>
                <form
                  id="register-form"
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Obidy Hasan" {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your public display name.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="obidyhasan@gmail.com"
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
                    name="role"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Role</FormLabel>
                        <FormControl>
                          <Select
                            defaultValue={field.value}
                            onValueChange={field.onChange}
                            {...field}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Select a role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Role</SelectLabel>
                                <SelectItem value="SENDER">Sender</SelectItem>
                                <SelectItem value="RECEIVER">
                                  Receiver
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your role.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Password {...field} />
                        </FormControl>
                        <FormDescription className="sr-only">
                          This is your account password.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </form>
              </Form>
              <Button
                disabled={buttonDisable}
                form="register-form"
                type="submit"
                className="w-full"
              >
                Register
              </Button>

              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link
                  to="/login"
                  replace={true}
                  className="underline underline-offset-4"
                >
                  Login
                </Link>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
