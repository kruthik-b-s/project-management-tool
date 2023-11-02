export interface LeaveDto {
  leave_application_employee_id: number;
  leave_type: string;
  from_date: Date;
  till_date: Date;
  reason: string;
//status-pending by default
}
