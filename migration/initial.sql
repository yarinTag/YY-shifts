-- create 2 departments Admins and Demi Moked

INSERT INTO department (id, name, address)
VALUES ('286ed84e-18ee-44ca-9a9d-45833337f217', 'Admins', NULL);

INSERT INTO department (id, name, address)
VALUES ('86936222-7e4e-409e-8466-93462cd7c3f9', 'Demi Moked', NULL);

-- create users: admin, manager and employees
-- PASSWORD: password123

INSERT INTO "user" (id, name, email, phone, password, gender, role,department_id)
VALUES (uuid_generate_v4(), 'Israel Admin', 'Admin@example.com', '+972523456780', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'male', 'ADMIN','286ed84e-18ee-44ca-9a9d-45833337f217');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'Israel Manager', 'Manager@example.com', '+972523456781', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'male', 'MANAGER','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'John Doe', 'johndoe@example.com', '+972523456790', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'male', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'Jane Smith', 'janesmith@example.com', '+972523456791', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'female', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'Michael Brown', 'michaelbrown@example.com', '+972523456792', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'male', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'Emily Davis', 'emilydavis@example.com', '+972523456793', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'female', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'David Wilson', 'davidwilson@example.com', '+972523456794', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'male', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'Sarah Johnson', 'sarahjohnson@example.com', '+972523456795', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'female', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'Daniel Martinez', 'danielmartinez@example.com', '+972523456796', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'male', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'Emma Garcia', 'emmagarcia@example.com', '+972523456797', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'female', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'James Lee', 'jameslee@example.com', '+972523456798', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'male', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');

INSERT INTO "user" (id, name, email, phone, password, gender, role ,department_id)
VALUES (uuid_generate_v4(), 'Olivia Kim', 'oliviakim@example.com', '+972523456799', '$2b$10$/gbt8fReYrKsKalwg0m9KuXUggbDCY7T5yr6wMYQeiaB9TA5U0cIe', 'female', 'EMPLOYEE','86936222-7e4e-409e-8466-93462cd7c3f9');