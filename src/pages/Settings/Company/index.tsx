import { useCompany } from "@/services/Company.ts";
import CompanyForm from "@/pages/Settings/Company/components/CompanyForm.tsx";

const Company = () => {
  const { data: company } = useCompany();

  return <div>{company && <CompanyForm data={company} />}</div>;
};

export default Company;
