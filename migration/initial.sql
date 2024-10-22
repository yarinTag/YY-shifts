-- create 2 departments Admins and Demi Moked

INSERT INTO department (id, name, active, address)
VALUES ('286ed84e-18ee-44ca-9a9d-45833337f217', 'Admins', true, NULL);

INSERT INTO department (id, name, active, address)
VALUES ('86936222-7e4e-409e-8466-93462cd7c3f9', 'Demi Moked', true, NULL);

-- create users: admin, manager and employees

INSERT INTO "user" (id, name, email, phone, password, gender, role, active,department_id)
VALUES (uuid_generate_v4(), 'Israel Admin', 'Admin@example.com', '+972123456789', 'password123', 'male', 'ADMIN', true,'286ed84e-18ee-44ca-9a9d-45833337f217');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Israel Manager', 'Manager@example.com', '+972123456799', 'password123', 'male', 'MANAGER', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'John Doe', 'johndoe@example.com', '+972012345678', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Jane Smith', 'janesmith@example.com', '+972987654321', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Michael Brown', 'michaelbrown@example.com', '+972555666777', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Emily Davis', 'emilydavis@example.com', '+972333444555', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'David Wilson', 'davidwilson@example.com', '+972999888777', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Sarah Johnson', 'sarahjohnson@example.com', '+972444555666', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Daniel Martinez', 'danielmartinez@example.com', '+972222333444', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Emma Garcia', 'emmagarcia@example.com', '+972666777888', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'James Lee', 'jameslee@example.com', '+972888999000', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Olivia Kim', 'oliviakim@example.com', '+972555111222', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');