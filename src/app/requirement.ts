// define new interface for RequirementType
export interface RequirementType {
  id: number;
  name: string;
}

// inquiry
export interface Requirement {
  id: number;
  title: string;
  contactMobileNo: string;
  status: string | null;
  requirementType?: RequirementType; // add new field
  tags: string[];
}

