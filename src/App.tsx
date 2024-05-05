import * as React from "react";
import Filters from "./components/Filters";
import Table from "./components/Table";
import useApplications, { ApplicationResponse } from "./useApplications";

const App: React.FunctionComponent = () => {
  const { data: rawData, isLoading } = useApplications();

  const [data, setData] = React.useState<ApplicationResponse[]>([]);

  const [name, setName] = React.useState("");
  const [position, setPosition] = React.useState("");

  React.useEffect(() => {
    const allRecords = rawData ? [...rawData] : [];

    const filteredRecords = filterData(allRecords, {
      name,
      position,
    });

    setData(filteredRecords);
  }, [rawData, name, position, setData]);

  if (isLoading || !rawData) {
    return <div>Loading...</div>;
  }
  return (
    <div className="App">
      <Filters onPositionFilterChange={setPosition} onSearchChange={setName} />
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

export default App;
