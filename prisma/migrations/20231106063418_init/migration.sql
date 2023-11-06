-- CreateTable
CREATE TABLE "Employee" (
    "employee_id" SERIAL NOT NULL,
    "employee_name" TEXT NOT NULL,
    "department" TEXT,
    "email" TEXT NOT NULL,
    "phone_number" TEXT,
    "employee_role_id" INTEGER NOT NULL,
    "reporting_to_employee_id" INTEGER,

    CONSTRAINT "Employee_pkey" PRIMARY KEY ("employee_id")
);

-- CreateTable
CREATE TABLE "Role" (
    "role_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,
    "permissions" TEXT[],

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Performance" (
    "performance_id" SERIAL NOT NULL,
    "rating" INTEGER NOT NULL,
    "comments" TEXT NOT NULL,
    "given_by_employee_id" INTEGER NOT NULL,
    "for_month" INTEGER NOT NULL,
    "for_year" INTEGER NOT NULL,
    "performance_employee_id" INTEGER,

    CONSTRAINT "Performance_pkey" PRIMARY KEY ("performance_id")
);

-- CreateTable
CREATE TABLE "Project" (
    "project_id" SERIAL NOT NULL,
    "project_name" TEXT NOT NULL,
    "client" TEXT NOT NULL,
    "start_date" DATE NOT NULL,
    "end_date" DATE NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'on-going',

    CONSTRAINT "Project_pkey" PRIMARY KEY ("project_id")
);

-- CreateTable
CREATE TABLE "ProjectDetail" (
    "project_detail_id" SERIAL NOT NULL,
    "project_url" TEXT NOT NULL,
    "login_name" TEXT NOT NULL,
    "login_password" TEXT NOT NULL,
    "tech_stack" TEXT[],
    "notes" TEXT NOT NULL,
    "project_details_project_id" INTEGER NOT NULL,

    CONSTRAINT "ProjectDetail_pkey" PRIMARY KEY ("project_detail_id")
);

-- CreateTable
CREATE TABLE "Leave" (
    "leave_id" SERIAL NOT NULL,
    "casual_leaves" INTEGER NOT NULL,
    "sick_leaves" INTEGER NOT NULL,
    "floater_leaves" INTEGER NOT NULL,
    "employee_leave_id" INTEGER NOT NULL,

    CONSTRAINT "Leave_pkey" PRIMARY KEY ("leave_id")
);

-- CreateTable
CREATE TABLE "LeaveApplication" (
    "leave_application_id" SERIAL NOT NULL,
    "leave_type" TEXT NOT NULL,
    "from_date" TIMESTAMP(3) NOT NULL,
    "till_date" TIMESTAMP(3) NOT NULL,
    "reason" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "comments" TEXT,
    "leave_application_employee_id" INTEGER,

    CONSTRAINT "LeaveApplication_pkey" PRIMARY KEY ("leave_application_id")
);

-- CreateTable
CREATE TABLE "_EmployeeToProject" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Employee_email_key" ON "Employee"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Role_role_name_key" ON "Role"("role_name");

-- CreateIndex
CREATE UNIQUE INDEX "Project_project_name_key" ON "Project"("project_name");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDetail_project_url_key" ON "ProjectDetail"("project_url");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectDetail_project_details_project_id_key" ON "ProjectDetail"("project_details_project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Leave_employee_leave_id_key" ON "Leave"("employee_leave_id");

-- CreateIndex
CREATE UNIQUE INDEX "_EmployeeToProject_AB_unique" ON "_EmployeeToProject"("A", "B");

-- CreateIndex
CREATE INDEX "_EmployeeToProject_B_index" ON "_EmployeeToProject"("B");

-- AddForeignKey
ALTER TABLE "Employee" ADD CONSTRAINT "Employee_employee_role_id_fkey" FOREIGN KEY ("employee_role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Performance" ADD CONSTRAINT "Performance_performance_employee_id_fkey" FOREIGN KEY ("performance_employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectDetail" ADD CONSTRAINT "ProjectDetail_project_details_project_id_fkey" FOREIGN KEY ("project_details_project_id") REFERENCES "Project"("project_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leave" ADD CONSTRAINT "Leave_employee_leave_id_fkey" FOREIGN KEY ("employee_leave_id") REFERENCES "Employee"("employee_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LeaveApplication" ADD CONSTRAINT "LeaveApplication_leave_application_employee_id_fkey" FOREIGN KEY ("leave_application_employee_id") REFERENCES "Employee"("employee_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToProject" ADD CONSTRAINT "_EmployeeToProject_A_fkey" FOREIGN KEY ("A") REFERENCES "Employee"("employee_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EmployeeToProject" ADD CONSTRAINT "_EmployeeToProject_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("project_id") ON DELETE CASCADE ON UPDATE CASCADE;
