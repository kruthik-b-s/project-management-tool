export interface CreateEmployeeDto {
  employee_name: string;
  email: string;
  department: string;
  role: string;
  phone_number?: string;
  reporting_employee_id?: string;
}

export interface CreateNotes {
  notes: string;
}
