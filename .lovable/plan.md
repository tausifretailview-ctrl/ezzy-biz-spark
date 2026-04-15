

# Seed a Test Admin User

## What
Create one admin login credential in the `work_report_users` table by invoking the existing `work-report-auth` Edge Function with the `register` action.

## Test Credentials
- **User ID:** `admin`
- **Password:** `admin123`
- **Name:** Admin User
- **Role:** admin
- **Department:** Management

## How
1. Call the `work-report-auth` Edge Function with:
   ```json
   { "action": "register", "user_id": "admin", "password": "admin123", "name": "Admin User", "role": "admin", "department": "Management" }
   ```
2. Verify the user was created by querying `work_report_users`.
3. Test login at `/work-report` with `admin` / `admin123`.

No code or schema changes needed -- just one Edge Function call to seed data.

