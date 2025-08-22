import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

import {
  Timeline,
  TimelineContent,
  TimelineDate,
  TimelineHeader,
  TimelineIndicator,
  TimelineItem,
  TimelineSeparator,
  TimelineTitle,
} from "@/components/ui/timeline";
import { CheckIcon } from "lucide-react";

/* eslint-disable @typescript-eslint/no-explicit-any */
const ParcelDeliveryCard = ({ parcel }: any) => {
  return (
    <div className="border p-4 rounded-sm">
      <div className="border-b">
        <div className="flex justify-between items-center gap-2">
          <Badge>{parcel?.currentStatus}</Badge>
          <span className="text-xs">
            {format(new Date(parcel?.createdAt || new Date()), "MMMM dd, yyyy")}
          </span>
        </div>
        <div className="my-2 flex justify-between gap-2 items-center">
          <h1 className="font-semibold ">{parcel?.title}</h1>
          <h1 className="text-sm">{parcel?.trackingId}</h1>
        </div>
      </div>

      <Timeline
        defaultValue={parcel?.statusLogs?.length}
        className="-space-y-5 mt-4"
      >
        {parcel?.statusLogs?.map((item: any, idx: number) => (
          <TimelineItem
            key={idx}
            step={idx}
            className="group-data-[orientation=vertical]/timeline:ms-10"
          >
            <TimelineHeader>
              <TimelineSeparator className="group-data-[orientation=vertical]/timeline:-left-7 group-data-[orientation=vertical]/timeline:h-[calc(100%-1.5rem-0.25rem)] group-data-[orientation=vertical]/timeline:translate-y-6.5" />
              <TimelineDate>
                {format(new Date(item.timestamp), "MMMM dd, yyyy - hh:mm a")}
              </TimelineDate>
              <TimelineTitle>{item.status}</TimelineTitle>
              <TimelineIndicator className="group-data-completed/timeline-item:bg-primary group-data-completed/timeline-item:text-primary-foreground flex size-6 items-center justify-center group-data-completed/timeline-item:border-none group-data-[orientation=vertical]/timeline:-left-7">
                <CheckIcon
                  className="group-not-data-completed/timeline-item:hidden"
                  size={16}
                />
              </TimelineIndicator>
            </TimelineHeader>
            <TimelineContent>{item.note}</TimelineContent>
          </TimelineItem>
        ))}
      </Timeline>
    </div>
  );
};

export default ParcelDeliveryCard;
