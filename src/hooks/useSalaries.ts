import { useEffect, useState } from "react";
import Papa from "papaparse";
import {
  SalariesData,
  AggregatedDataByYear,
  JobTitleAggregation,
} from "../salaries";

// Custom hook to fetch and manage salary data
export const useSalaries = () => {
  const [data, setData] = useState<AggregatedDataByYear[]>([]);
  const [allData, setAllData] = useState<SalariesData[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [jobTitles, setJobTitles] = useState<JobTitleAggregation[]>([]);

  // Function to fetch and parse the CSV data
  const fetchData = async () => {
    const response = await fetch("/salaries.csv");
    const reader = response.body?.getReader();
    const decoder = new TextDecoder("utf-8");
    const result = await reader?.read();
    const csv = decoder.decode(result?.value);

    // Parse the CSV file using PapaParse
    Papa.parse<SalariesData>(csv, {
      header: true, // Treat the first row as headers
      skipEmptyLines: true, // Skip any empty lines
      complete: (result) => {
        const parsedData = result.data as SalariesData[];
        setAllData(parsedData);
        const aggregatedData = aggregateDataByYear(parsedData);
        setData(aggregatedData); // Set the aggregated data by year
      },
    });
  };

  // Function to aggregate the data by year
  const aggregateDataByYear = (
    data: SalariesData[]
  ): AggregatedDataByYear[] => {
    const yearMap: Record<
      number,
      { total_jobs: number; total_salary: number }
    > = {};

    data.forEach((row) => {
      const year = parseInt(row.work_year, 10);
      const salary = parseFloat(row.salary_in_usd);

      if (!yearMap[year]) {
        yearMap[year] = { total_jobs: 0, total_salary: 0 };
      }

      yearMap[year].total_jobs += 1;
      yearMap[year].total_salary += salary;
    });

    // Convert the yearMap object to an array of AggregatedDataByYear
    return Object.keys(yearMap).map((year) => ({
      year: parseInt(year, 10),
      total_jobs: yearMap[parseInt(year, 10)].total_jobs,
      avg_salary_usd: (
        yearMap[parseInt(year, 10)].total_salary /
        yearMap[parseInt(year, 10)].total_jobs
      ).toFixed(2), // Format the salary to 2 decimal places
    }));
  };

  // Function to aggregate job titles for the selected year
  const aggregateJobTitlesByYear = (year: number) => {
    const filteredData = allData.filter(
      (row) => parseInt(row.work_year, 10) === year
    );
    const jobCountMap: Record<string, number> = {};

    filteredData.forEach((row) => {
      const jobTitle = row.job_title;

      if (!jobCountMap[jobTitle]) {
        jobCountMap[jobTitle] = 0;
      }

      jobCountMap[jobTitle] += 1;
    });

    const aggregatedData: JobTitleAggregation[] = Object.keys(jobCountMap).map(
      (title) => ({
        job_title: title,
        count: jobCountMap[title],
      })
    );

    setJobTitles(aggregatedData);
  };

  // Handle row click to display the second table for the selected year
  const onRowClick = (record: AggregatedDataByYear) => {
    setSelectedYear(record.year);
    aggregateJobTitlesByYear(record.year);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    allData,
    selectedYear,
    jobTitles,
    onRowClick,
    fetchData,
    setSelectedYear,
  };
};
