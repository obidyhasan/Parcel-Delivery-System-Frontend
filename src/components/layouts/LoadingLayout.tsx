import { selectLoading } from "@/redux/features/loadingSlice";
import { useAppSelector } from "@/redux/hook";

const LoadingLayout = () => {
  const loading = useAppSelector(selectLoading);

  if (!loading) return null; // don't render if false

  return (
    <div className="fixed inset-0 bg-background bg-opacity-40 flex items-center justify-center z-[9999]">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
};

export default LoadingLayout;
