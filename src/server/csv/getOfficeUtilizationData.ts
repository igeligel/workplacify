import { parse } from "csv-parse/sync";
import { readFile } from "fs/promises";
import path from "path";

export type LocationData = {
  city: string;
  country: string;
  region: string;
  attendance_low_percentage: string;
  attendance_high_percentage: string;
  util_peak_low_percentage: string;
  util_peak_high_percentage: string;
  hybrid_work_trend_2025: string;
  prime_rent_usd_sqft: string;
  est_savings_usd_per_emp: string;
};

export const getOfficeUtilizationData = async () => {
  // src/assets/office-utilization-in-city.csv
  // Read the CSV file
  console.log("Getting office utilization data", {
    currentWorkingDirectory: process.cwd(),
  });
  const assetsDir = path.join(process.cwd(), "src", "assets");
  const csv = await readFile(
    path.join(assetsDir, "office-utilization-in-city.csv"),
    "utf8",
  );
  const records = parse<LocationData>(csv, {
    columns: true,
    skip_empty_lines: true,
  });
  return records;
};
