import CsvTable from "./components/CsvTable";
import CsvLineGraph from "./components/CsvLineGraph";

const App = () => {
  return (
    <div className="p-8">
      <h1 className="text-xl font-medium py-4">Floqer Assignment</h1>

      <div className="flex flex-col space-y-12">
        <CsvLineGraph />
        <CsvTable />
      </div>
    </div>
  );
};

export default App;
