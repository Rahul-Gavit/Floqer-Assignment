import { Table } from "antd";
import { useSalaries } from "../hooks/useSalaries";

import { AggregatedDataByYear } from "../salaries";

const CsvTable = () => {
  const { data, onRowClick, selectedYear, jobTitles } = useSalaries();
  // Define columns with sorter functionality
  const columns = [
    {
      title: "Year",
      dataIndex: "year",
      key: "year",
      sorter: (a: AggregatedDataByYear, b: AggregatedDataByYear) =>
        a.year - b.year,
    },
    {
      title: "Number of total jobs",
      dataIndex: "total_jobs",
      key: "total_jobs",
      sorter: (a: AggregatedDataByYear, b: AggregatedDataByYear) =>
        a.total_jobs - b.total_jobs,
    },
    {
      title: "Average salary in USD",
      dataIndex: "avg_salary_usd",
      key: "avg_salary_usd",
      sorter: (a: AggregatedDataByYear, b: AggregatedDataByYear) =>
        a.avg_salary_usd - b.avg_salary_usd,
    },
  ];

  // Second table columns (job titles and count)
  const jobTitleColumns = [
    {
      title: "Job Title",
      dataIndex: "job_title",
      key: "job_title",
    },
    {
      title: "No Of Jobs",
      dataIndex: "count",
      key: "count",
    },
  ];

  return (
    <div className="">
      <div className="shadow-md rounded-md border p-4">
        <h2 className="text-lg text-violet-500 underline font-medium p-6">
          Main Table
        </h2>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          rowKey="work_year"
          onRow={(record: AggregatedDataByYear) => ({
            onClick: () => onRowClick(record), // Handle row click
          })}
        />
      </div>

      {selectedYear && (
        <div className="shadow-md rounded-md border mt-12 p-4">
          <h3 className="text-lg text-violet-500 underline font-medium p-6">
            Jobs in {selectedYear}
          </h3>
          <Table
            columns={jobTitleColumns}
            dataSource={jobTitles}
            pagination={{ pageSize: 10 }}
            rowKey="job_title"
          />
        </div>
      )}
    </div>
  );
};

export default CsvTable;
