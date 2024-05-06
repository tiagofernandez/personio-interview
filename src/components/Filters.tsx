import * as React from "react";
import { Select, SelectOption } from "@highlight-ui/select";
import { Input } from "@highlight-ui/input";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";

type FilterProps = {
  positionOptions: Array<any>;
  onPositionFilterChange: Function;
  onSearchChange: Function;
  selectedPosition: string;
};

const Filters: React.FunctionComponent<FilterProps> = ({
  positionOptions,
  onPositionFilterChange,
  onSearchChange,
  selectedPosition,
}) => {
  const [selectedOptions, setSelectedOptions] = React.useState<any>([]);

  React.useEffect(() => {
    setSelectedOptions([{ label: selectedPosition, value: selectedPosition }]);
  }, [selectedPosition]);

  return (
    <div className="flex items-center justify-between m-8">
      <div className="flex gap-5">
        <Select
          data-testid="position-applied-select"
          enableFlowTriggers
          closeOnSelect
          options={positionOptions}
          onSelect={(selected) => {
            setSelectedOptions(selected);
            onPositionFilterChange(selected[0].value);
          }}
          selectedOptions={selectedOptions}
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
