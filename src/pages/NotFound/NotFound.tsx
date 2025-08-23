import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 flex items-center justify-center flex-col gap-3 min-h-screen">
      <h2 className="text-4xl font-semibold">404</h2>
      <h1 className="font-semibold text-xl">Route not found!</h1>
      <Button>
        <Link to={"/"}>Go To Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
