/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { setLoading } from "@/redux/features/loadingSlice";
import {
  parcelApi,
  useGetParcelRequestQuery,
  useParcelCancelMutation,
  useUpdateParcelMutation,
} from "@/redux/features/Parcel/parcel.api";
import { useAppDispatch } from "@/redux/hook";
import { useEffect, useState } from "react";
import StatusUpdateAlertDialog from "./StatusUpdateAlertDialog";
import { toast } from "sonner";
import { ViewStatusLogsDialog } from "./ViewStatusLogsDialog";
import { Link, useSearchParams } from "react-router";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import ParcelFilters from "../Parcels/ParcelFilters";

export function AllParcelTable() {
  // Filter
  const [searchParams] = useSearchParams();
  const status = searchParams.get("status") || undefined;

  // search
  const [searchTitle, setSearchTitle] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(5);

  const { data, isLoading } = useGetParcelRequestQuery({
    searchTerm: searchTitle,
    currentStatus: status,
    page: currentPage,
    limit,
  });
  const parcels = data?.data || [];
  const [updateParcel] = useUpdateParcelMutation();
  const [parcelCancel] = useParcelCancelMutation();

  const [openDeleteDialog, setDeleteOpenDialog] = useState(false);
  const [selectedDeleteId, setSelectedDeleteId] = useState<string | null>(null);

  const [openViewStatusDialog, setOpenViewStatusDialog] = useState(false);
  const [selectedTrackingId, setSelectedTrackingId] = useState<string | null>(
    null
  );

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [isLoading, dispatch]);

  const handleStatusUpdate = async (value: string, id: string) => {
    const toastId = toast.loading("Updating status...");
    try {
      const res = await updateParcel({
        parcelInfo: { currentStatus: value },
        id,
      }).unwrap();
      if (res.success) {
        toast.success("Status updated successfully", { id: toastId });
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const handleParcelDelete = async () => {
    const toastId = toast.loading("Parcel canceling...");
    try {
      const res = await parcelCancel(selectedDeleteId).unwrap();
      if (res.success) {
        toast.success("Parcel cancel successfully", { id: toastId });
        dispatch(parcelApi.util.resetApiState());
      }
    } catch (error: any) {
      console.error(error);
      toast.error(error.data.message || error.data || "Something went wrong", {
        id: toastId,
      });
    }
  };

  const totalPage = data?.meta?.totalPage || 1;

  return (
    <>
      <div className="flex items-center justify-between gap-2 my-2 pb-5">
        <h1 className="text-lg font-bold mb-4">Parcels</h1>
        <div className="flex gap-2 items-center flex-wrap">
          <div className="*:not-first:mt-2">
            <div className="relative">
              <Input
                onChange={(e) => setSearchTitle(e.target.value)}
                className="peer ps-9  max-w-44"
                placeholder="Title, TrackingId"
                type="search"
              />
              <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
                <SearchIcon size={16} />
              </div>
            </div>
          </div>
          <ParcelFilters />
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Weight</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Tracking Id</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Receiver</TableHead>

            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parcels?.map((parcel: any) => (
            <TableRow key={parcel?._id}>
              <TableCell className="font-medium">{parcel?.title}</TableCell>
              <TableCell>{parcel?.fee}</TableCell>
              <TableCell>{parcel?.weight}</TableCell>
              <TableCell>{parcel?.type}</TableCell>
              <TableCell>{parcel?.trackingId}</TableCell>
              <TableCell>
                <Select
                  defaultValue={parcel?.currentStatus}
                  onValueChange={(value) => {
                    setSelectedValue(value);
                    setSelectedId(parcel?._id || null);
                    setOpenDialog(true);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Status</SelectLabel>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Confirm">Confirm</SelectItem>
                      <SelectItem value="Picked">Picked</SelectItem>
                      <SelectItem value="In Transit">In Transit</SelectItem>
                      <SelectItem value="Cancelled">Cancelled</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="font-medium">
                <div>
                  <p className="font-medium">{parcel?.receiverId?.name}</p>
                  <span className="text-xs text-foreground/60">
                    {parcel?.receiverId?.email}
                  </span>
                </div>
              </TableCell>

              <TableCell className="text-right flex gap-2 justify-end">
                <Button
                  onClick={() => {
                    setSelectedTrackingId(parcel?.trackingId);
                    setOpenViewStatusDialog(true);
                  }}
                  variant={"outline"}
                  size={"sm"}
                >
                  Status Logs
                </Button>
                <Button asChild size={"sm"}>
                  <Link to={`/sender/parcel/${parcel?.trackingId}`}>View</Link>
                </Button>

                {parcel?.currentStatus !== "Cancelled" && (
                  <Button
                    onClick={() => {
                      setSelectedDeleteId(parcel?._id);
                      setDeleteOpenDialog(true);
                    }}
                    size={"sm"}
                  >
                    Cancel
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <div className="flex justify-end my-8">
        <div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className={
                    currentPage === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                (page) => (
                  <PaginationItem
                    key={page}
                    onClick={() => setCurrentPage(page)}
                  >
                    <PaginationLink isActive={currentPage === page}>
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                )
              )}
              <PaginationItem>
                <PaginationNext
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className={
                    currentPage === totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>

      {/* Logout confirm dialog */}
      <AlertDialog open={openDeleteDialog} onOpenChange={setDeleteOpenDialog}>
        <AlertDialogContent className="w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Cancel</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to cancel this parcel?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                handleParcelDelete();
                setOpenDialog(false);
              }}
            >
              Yes, Cancel
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <StatusUpdateAlertDialog
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
        selectedValue={selectedValue}
        selectedId={selectedId}
        onConfirm={handleStatusUpdate}
        title={"Confirm Status Update"}
      />
      <ViewStatusLogsDialog
        openDialog={openViewStatusDialog}
        setOpenDialog={setOpenViewStatusDialog}
        trackingId={selectedTrackingId}
      />
    </>
  );
}
