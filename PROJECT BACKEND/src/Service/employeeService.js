import { poolRequest, sql } from '../Utils/dbConnect.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';




export const loginEmployeeService = async (email, password) => {
    try {
        const result = await poolRequest()
            .input('Email', sql.VarChar, email)
            .input('Password', sql.VarChar, password)
            .query("SELECT * FROM Employees WHERE Email = @Email AND Password = @Password");

        return result.recordset;
    } catch (error) {
        return error;
    }
}



export const addEmployeeService = async (employee) => {
    try {
        const {
            FirstName,
            LastName,
            Email,
            Password,
            Address,
            BirthDate,
            ContactInfo,
            Gender,
            Position,
            imageUrl,
            HourlyRate,
            GrossPay,
            NHIFDeduction,
            NSSFDeduction,
            HELBDeduction,
            Role,
        } = employee;

        // Generate UUID for EmployeeID
        const EmployeeID = uuidv4();

        // Hash the password
        const hashedPassword = await bcrypt.hash(Password, 5); // 10 is the saltRounds

        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar, EmployeeID)
            .input('FirstName', sql.VarChar, FirstName)
            .input('LastName', sql.VarChar, LastName)
            .input('Email', sql.VarChar, Email)
            .input('Password', sql.VarChar, hashedPassword)
            .input('Address', sql.VarChar, Address)
            .input('BirthDate', sql.Date, BirthDate)
            .input('ContactInfo', sql.VarChar, ContactInfo)
            .input('Gender', sql.VarChar, Gender)
            .input('Position', sql.VarChar, Position)
            .input('imageUrl', sql.VarChar, imageUrl)
            .input('HourlyRate', sql.Decimal(10, 2), HourlyRate)
            .input('GrossPay', sql.Decimal(10, 2), GrossPay)
            .input('NHIFDeduction', sql.Decimal(10, 2), NHIFDeduction)
            .input('NSSFDeduction', sql.Decimal(10, 2), NSSFDeduction)
            .input('HELBDeduction', sql.Decimal(10, 2), HELBDeduction)
            .input('Role', sql.VarChar, Role)
            .query(`
                    INSERT INTO Employees (EmployeeID, FirstName, LastName, Email, Password, Address, BirthDate, ContactInfo, Gender, Position, imageUrl, HourlyRate, GrossPay , NHIFDeduction, NSSFDeduction, HELBDeduction, Role)
                    VALUES (@EmployeeID, @FirstName, @LastName, @Email, @Password, @Address, @BirthDate, @ContactInfo, @Gender, @Position, @imageUrl, @HourlyRate, @GrossPay , @NHIFDeduction, @NSSFDeduction, @HELBDeduction, @Role);
        `);

        return result.recordset;
    } catch (error) {
        return error;
    }
};


export const getAllEmployeesService = async (users) => {
    try {
        const allUsers = await poolRequest().query(`SELECT * FROM Employees`)
        return allUsers
    } catch (error) {
        return error
    }
}


export const getEmployeeByIdService = async (id) => {
    try {
        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar, id)
            .query("SELECT * FROM Employees where EmployeeID = @EmployeeID");
        return result.recordset;
    } catch (error) {
        return error.message;
    }
}

export const fireEmployeeService = async (id) => {
    try {
        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar, id)
            .query("DELETE FROM Employees WHERE EmployeeID = @EmployeeID");

        return result;
    } catch (error) {
        return error;
    }
}

/////////////////////
export const updateEmployeeService = async (id, updatedFields) => {
    try {
        // Initialize an array to store SET parts of the query
        const setParts = [];

        // Check if each field is defined and add it to the query if so
        const queryParams = {};
        Object.keys(updatedFields).forEach(fieldName => {
            if (updatedFields[fieldName] !== undefined) {
                setParts.push(`${fieldName} = @${fieldName}`);
                queryParams[fieldName] = updatedFields[fieldName];
            }
        });

        // Construct the SET clause of the query
        const setClause = setParts.join(", ");

        // Construct the final query string
        const queryString = `UPDATE Employees SET ${setClause} WHERE EmployeeID = @EmployeeID;`;

        // Create a new pool request
        const request = poolRequest();

        // Add EmployeeID parameter to the request
        request.input('EmployeeID', sql.VarChar(100), id);

        // Add parameters for other fields
        Object.entries(queryParams).forEach(([fieldName, fieldValue]) => {
            let sqlType;
            switch (fieldName) {
                case 'HourlyRate':
                case 'GrossPay':
                case 'NHIFDeduction':
                case 'NSSFDeduction':
                case 'HELBDeduction':
                    sqlType = sql.Decimal(10, 2);
                    break;
                default:
                    sqlType = sql.NVarChar;
            }
            request.input(fieldName, sqlType, fieldValue);
        });

        // Execute the query
        const result = await request.query(queryString);

        console.log("Update Result:", result);

        return result;
    } catch (error) {
        console.error("Failed to update employee:", error);
        throw error; // Rethrow the error to be caught by the caller
    }
};

