-- create 2 departments Admins and Demi Moked

INSERT INTO department (id, name, active, address)
VALUES ('286ed84e-18ee-44ca-9a9d-45833337f217', 'Admins', true, NULL);

INSERT INTO department (id, name, active, address)
VALUES ('86936222-7e4e-409e-8466-93462cd7c3f9', 'Demi Moked', true, NULL);

-- create users: admin, manager and employees

INSERT INTO "user" (id, name, email, phone, password, gender, role, active,department_id)
VALUES (uuid_generate_v4(), 'Israel Admin', 'Admin@example.com', '+972523456780', 'password123', 'male', 'ADMIN', true,'286ed84e-18ee-44ca-9a9d-45833337f217');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Israel Manager', 'Manager@example.com', '+972523456781', 'password123', 'male', 'MANAGER', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'John Doe', 'johndoe@example.com', '+972523456790', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Jane Smith', 'janesmith@example.com', '+972523456791', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Michael Brown', 'michaelbrown@example.com', '+972523456792', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Emily Davis', 'emilydavis@example.com', '+972523456793', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'David Wilson', 'davidwilson@example.com', '+972523456794', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Sarah Johnson', 'sarahjohnson@example.com', '+972523456795', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Daniel Martinez', 'danielmartinez@example.com', '+972523456796', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Emma Garcia', 'emmagarcia@example.com', '+972523456797', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'James Lee', 'jameslee@example.com', '+972523456798', 'password123', 'male', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role, active ,department_id)
VALUES (uuid_generate_v4(), 'Olivia Kim', 'oliviakim@example.com', '+972523456799', 'password123', 'female', 'EMPLOYEE', true,'86936222-7e4e-409e-8466-93462cd7c3f9');