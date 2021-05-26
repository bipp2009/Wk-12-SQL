USE employee;

INSERT into department(name)
values ("IT"), ("Finance");

INSERT into role (title, salary, department_id)
values ("analyst", 12000, 1 ), ("technician", 15000, 2), ("DB manager", 20000, 2);

INSERT into employee(first_name, last_name, role_id, manager_id)
 values ("John", "Smith", 1, null), ("Neville", "Brown", 1, 1);
