import * as React from "react";
import Filters from "./components/Filters";
import Table from "./components/Table";
import useApplications, { ApplicationResponse } from "./useApplications";

const App: React.FunctionComponent = () => {
  const { data: rawData, isLoading } = useApplications();
  const positionOptions = rawData ? getPositionOptions(rawData) : [];

  const [data, setData] = React.useState<ApplicationResponse[]>([]);

  const [name, setName] = React.useState("");
  const [position, setPosition] = React.useState(getPositionFromSearchParams());

  React.useEffect(() => {
    const allRecords = rawData ? [...rawData] : [];

    const filteredRecords = filterData(allRecords, {
      name,
      position,
    });
    setData(filteredRecords);
  }, [rawData, name, position, setData]);

  React.useEffect(() => {
    syncSearchParams(position);
  }, [position]);

  if (isLoading || !rawData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Filters
        positionOptions={positionOptions}
        selectedPosition={position}
        onPositionFilterChange={(position: string) => {
          const data = filterData(rawData, {
            name,
            position,
          });
          setData(data);
          setPosition(position);
        }}
        onSearchChange={setName}
      />
      <Table data={data} />
    </div>
  );
};

type FilterOptions = {
  name: string;
  position: string;
};

const filterData = (
  allRecords: ApplicationResponse[],
  { name, position }: FilterOptions
) => {
  name = name.trim();
  position = position.trim();

  let filteredRecords = [...allRecords];

  if (position !== "") {
    filteredRecords = filteredRecords.filter(
      (candidate) => candidate.position_applied === position
    );
  }
  if (name !== "") {
    filteredRecords = filteredRecords.filter((candidate) =>
      candidate.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
    );
  }
  return filteredRecords;
};

const getPositionOptions = (data: ApplicationResponse[]) => {
  const positions = new Set();
  data.forEach((candidate) => {
    positions.add(candidate.position_applied);
  });
  return Array.from(positions).map((p) => ({ label: p, value: p }));
};

const getPositionFromSearchParams = () => {
  const params = new URLSearchParams(location.search);
  const position = params.get("position");
  return position || "";
};

const syncSearchParams = (position: string) => {
  let url = new URL(location.href);
  url.searchParams.set("position", position);
  history.pushState({}, "", url.href);
};

export default App;
