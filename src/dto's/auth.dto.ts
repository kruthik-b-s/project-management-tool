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

export interface CreateProjectDto {
  project_name: string;
  client: string;
  start_date: string;
  end_date: string;
  project_url?: string;
  login_name?: string;
  login_password?: string;
  tech_stack?: string;
}
