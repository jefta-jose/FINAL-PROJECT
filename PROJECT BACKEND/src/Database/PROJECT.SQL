CREATE DATABASE PROJECTX
USE PROJECTX

CREATE TABLE Employees(
    EmployeeID VARCHAR(100) PRIMARY KEY,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Address VARCHAR(255),
    BirthDate DATE,
    ContactInfo VARCHAR(20),
    Gender VARCHAR(10),
    Position VARCHAR(255),
    imageUrl VARCHAR(255),
    Email VARCHAR(100) UNIQUE NOT NULL,
    Password VARCHAR(255) NOT NULL,
    HourlyRate DECIMAL(10,2),
    GrossPay DECIMAL(10,2),
    NHIFDeduction DECIMAL(10,2),
    NSSFDeduction DECIMAL(10,2),
    HELBDeduction DECIMAL(10,2),
    Role VARCHAR(20) NOT NULL DEFAULT 'Employee',
    ClockInTime TIME DEFAULT '08:00',
    ClockOutTime TIME DEFAULT '17:00',
);

SELECT * FROM Employees
DROP TABLE Employees


CREATE TABLE Attendance (
    RecordID VARCHAR(100) PRIMARY KEY,
    EmployeeID VARCHAR(100),
    ClockInTime TIME DEFAULT '08:00',
    ClockOutTime TIME DEFAULT '17:00',
    HoursWorked DECIMAL(10,2),
    Overtime DECIMAL(10,2),
    Rate DECIMAL(10,2),
    Date DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE CASCADE
);
-- Selecting the hours worked for Monday
SELECT SUM(HoursWorked) AS TotalHoursWorked
FROM Attendance
WHERE DATEPART(dw, Date) = 2; -- 2 represents Monday (1 for Sunday, 2 for Monday, ..., 7 for Saturday)

-- Selecting the hours worked for Tuesday
SELECT SUM(HoursWorked) AS TotalHoursWorked
FROM Attendance
WHERE DATEPART(dw, Date) = 3; -- 3 represents Tuesday (1 for Sunday, 2 for Monday, ..., 7 for Saturday)

-- Selecting the hours worked for Wednesday
SELECT SUM(HoursWorked) AS TotalHoursWorked
FROM Attendance
WHERE DATEPART(dw, Date) = 4; -- 4 represents Wednesday (1 for Sunday, 2 for Monday, ..., 7 for Saturday)

-- Selecting the hours worked for Thursday
SELECT SUM(HoursWorked) AS TotalHoursWorked
FROM Attendance
WHERE DATEPART(dw, Date) = 5; -- 5 represents Thursday (1 for Sunday, 2 for Monday, ..., 7 for Saturday)

-- Selecting the hours worked for Friday
SELECT SUM(HoursWorked) AS TotalHoursWorked
FROM Attendance
WHERE DATEPART(dw, Date) = 6; -- 6 represents Friday (1 for Sunday, 2 for Monday, ..., 7 for Saturday)

-- Selecting the hours worked for Saturday
SELECT SUM(HoursWorked) AS TotalHoursWorked
FROM Attendance
WHERE DATEPART(dw, Date) = 7; -- 7 represents Saturday (1 for Sunday, 2 for Monday, ..., 7 for Saturday)

-- Selecting the hours worked for Sunday
SELECT SUM(HoursWorked) AS TotalHoursWorked
FROM Attendance
WHERE DATEPART(dw, Date) = 1; -- 1 represents Sunday (1 for Sunday, 2 for Monday, ..., 7 for Saturday)


SELECT * FROM Attendance
DROP TABLE Attendance

SELECT TR.RecordID, E.FirstName, E.LastName, TR.ClockInTime, TR.ClockOutTime, TR.HoursWorked, TR.Overtime
FROM Attendance TR
JOIN Employees E ON TR.EmployeeID = E.EmployeeID;

-----------------------------------------------------------
CREATE TABLE Payroll (
    PayrollID VARCHAR(100) PRIMARY KEY,
    EmployeeID VARCHAR(100),
    GrossPay DECIMAL(10,2),
    NHIFDeduction DECIMAL(10,2),
    NSSFDeduction DECIMAL(10,2),
    HELBDeduction DECIMAL(10,2),
    OvertimeBonus DECIMAL(10,2),
    Advance DECIMAL(10,2),
    NetPay DECIMAL(10,2),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE CASCADE
);


SELECT * FROM Payroll
DROP TABLE Payroll

-----------------------------------------------------------------------
CREATE TABLE Advance(
    AdvanceID VARCHAR(100) PRIMARY KEY,
    EmployeeID VARCHAR(100),
    Amount DECIMAL(10,2),
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE CASCADE
);

SELECT * FROM Advance
DROP TABLE Advance

-----------------------------------------
CREATE TABLE Schedule (
    ScheduleID VARCHAR(100) PRIMARY KEY,
    EmployeeID VARCHAR(100),
    OnLeave BIT DEFAULT 0, 
    LeaveDays INT DEFAULT 0 ,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE CASCADE
);

SELECT * FROM Schedule
DROP TABLE Schedule
-----------------------------------------------

CREATE TABLE Email (
    EmailiD VARCHAR(100) PRIMARY KEY,
    EmployeeID VARCHAR(100),
    EmailSubject VARCHAR(100),
    EmailContent VARCHAR(100),
    Emailbody VARCHAR(100),
    Date DATE,
    FOREIGN KEY (EmployeeID) REFERENCES Employees(EmployeeID) ON DELETE CASCADE
);

SELECT * FROM Email
DROP TABLE Email