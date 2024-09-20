// Define the type for each row of the CSV data
export interface SalariesData {
  work_year: string; // Initially it's string from CSV
  company_location: string;
  company_size: string;
  employee_residence: string;
  employment_type: string;
  experience_level: string;
  job_title: string;
  remote_ratio: string;
  salary: string;
  salary_currency: string;
  salary_in_usd: string; // Initially it's string from CSV
  work_type: string;
}

// Define the type for the aggregated data by year
export interface AggregatedDataByYear {
  year: number;
  total_jobs: number;
  avg_salary_usd: number; // string since it's formatted with `toFixed()`
}

// Define the type for aggregated job titles
export interface JobTitleAggregation {
  job_title: string;
  count: number;
}
