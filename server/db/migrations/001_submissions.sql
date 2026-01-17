CREATE TABLE IF NOT EXISTS submissions (
    id SERIAL PRIMARY KEY,
    package_type VARCHAR(50) NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_phone VARCHAR(50) NOT NULL,
    estimated_price DECIMAL(10, 2),
    rate VARCHAR(50),
    details JSONB,
    attachment_path VARCHAR(500),
    attachment_original_name VARCHAR(255),
    webhook_sent BOOLEAN DEFAULT FALSE,
    webhook_sent_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_submissions_package_type ON submissions(package_type);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at);
