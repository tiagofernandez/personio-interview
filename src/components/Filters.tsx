import * as React from "react";
import { Select, SelectOption } from "@highlight-ui/select";
import { Input } from "@highlight-ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

export const positions = [
  {
    label: "Agent",
    value: "Agent",
  },
  {
    label: "Orchestrator",
    value: "Orchestrator",
  },
  {
    label: "Technician",
    value: "Technician",
  },
  {
    label: "Engineer",
    value: "Engineer",
  },
  {
    label: "Designer",
    value: "Designer",
  },
  {
    label: "Sales person",
    value: "Sales person",
  },
  {
    label: "Manager",
    value: "Manager",
  },
];

const Filters: React.FunctionComponent<{
  onPositionFilterChange: Function;
  onSearchChange: Function;
}> = ({ onPositionFilterChange, onSearchChange }) => {
  const [selectedPositions, setSelectedPositions] = React.useState<any>([]);

  return (
    <div className="flex items-center justify-between m-8">
      <div className="flex gap-5">
        <Select
          data-testid="position-applied-select"
          enableFlowTriggers
          closeOnSelect
          options={positions}
          onSelect={(selected) => {
            setSelectedPositions(selected);
            onPositionFilterChange(selected[0].value);
          }}
          selectedOptions={selectedPositions}
          triggerLabel="Position Applied"
          variant="inline"
        />
      </div>
      <Input
        autoFocus
        data-testid="search-by-name-input"
        placeholder="Search by name"
        prefix={<MagnifyingGlassIcon className="h-4 w-4" />}
        onChange={debounce(({ target: { value } }: any) => {
          onSearchChange(value);
        }, 50)}
      />
    </div>
  );
};

const debounce = (callback: Function, wait: number) => {
  let timeoutId: number | undefined = undefined;

  return (...args: any) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback(...args);
    }, wait);
  };
};

export default Filters;
