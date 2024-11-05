-- Create the 'availability' table if it doesn't exist
CREATE TABLE IF NOT EXISTS availability (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    shift_id UUID NOT NULL,
    memo TEXT NOT NULL DEFAULT '', -- Set a default value for memo
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Add created_at column
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Add updated_at column
    created_by UUID DEFAULT NULL, -- Add created_by column
    updated_by UUID DEFAULT NULL, -- Add updated_by column
    deleted_at TIMESTAMP DEFAULT NULL, -- Add deleted_at column for soft delete
    FOREIGN KEY (user_id) REFERENCES "user"(id),
    FOREIGN KEY (shift_id) REFERENCES "shift"(id),
    UNIQUE (user_id, shift_id) -- Ensure unique user-shift pairs
);

-- Insert availabilities for each employee user and shift
INSERT INTO availability (user_id, shift_id, memo)
SELECT u.id, s.id, '' -- Providing a default value for memo
FROM "user" u
CROSS JOIN "shift" s
WHERE u.role = 'EMPLOYEE' -- Only include users with the role 'employee'
ORDER BY u.id, s.id;