import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useSearchParams } from "react-router";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function UsersFilters() {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedRole = searchParams.get("role") || undefined;

  const handleRoleChange = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("role", value);
    setSearchParams(params);
  };

  const handleClearFilter = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("role");
    setSearchParams(params);
  };

  return (
    <div className="flex items-center gap-1">
      <Select
        onValueChange={(value) => handleRoleChange(value)}
        value={selectedRole ? selectedRole : ""}
      >
        <SelectTrigger>
          <SelectValue placeholder="Filter by Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Role</SelectLabel>
            <SelectItem value="SENDER">Sender</SelectItem>
            <SelectItem value="RECEIVER">Receiver</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
      <Button size="icon" variant="outline" onClick={handleClearFilter}>
        <X />
      </Button>
    </div>
  );
}
