export const formatCurrency = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const handleNumericInput = (
  value: string,
  setter: (v: string) => void,
) => {
  if (value === "" || value === "0") {
    setter(value);
    return;
  }
  const num = Number(value);
  if (!isNaN(num) && num >= 0) {
    setter(value);
  }
};

export const computeRightsizing = (
  employees: number,
  currentDesks: number,
  peakUtilization: number,
  rentPerSqft: number,
  sqftPerDesk: number,
) => {
  const recommended = Math.ceil(employees * (peakUtilization / 100));
  const saved = Math.max(0, currentDesks - recommended);
  const savings = saved * rentPerSqft * sqftPerDesk;
  return {
    recommendedDesks: recommended,
    desksSaved: saved,
    annualSavings: savings,
  };
};
