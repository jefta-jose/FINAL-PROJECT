import { poolRequest, sql } from '../Utils/dbConnect.js';
import { v4 as uuidv4 } from 'uuid';

export const getEmailService = async () => {
    try {
        const result = await poolRequest().query(`SELECT * FROM Email`);
        return result.recordset;
    } catch (error) {
        console.error("Error occurred while fetching emails:", error); // Log the error for debugging purposes
        throw error; // Rethrow the error to be caught by the caller
    }
};

export const numberOfEmailsService = async () => {
    try {
        const result = await poolRequest().query(`
            SELECT COUNT(*) AS totalEmails
            FROM Email
        `);

        const totalEmails = result.recordset[0].totalEmails;
        return totalEmails;
    } catch (error) {
        return error;
    }
};


export const createEmailService = async (EmployeeID, EmailSubject, EmailContent, Emailbody) => {
    try {
        const EmailID = uuidv4();
        const query = `
            INSERT INTO Email ( EmailID ,EmployeeID, EmailSubject, EmailContent,Emailbody , Date)
            VALUES ( @EmailID ,@EmployeeID, @EmailSubject, @EmailContent,@Emailbody, @Date)
        `;
        await poolRequest()
            .input('EmailID', sql.VarChar, EmailID)
            .input('EmployeeID', sql.VarChar, EmployeeID)
            .input('EmailSubject', sql.VarChar, EmailSubject)
            .input('EmailContent', sql.VarChar, EmailContent)
            .input('Emailbody', sql.VarChar, Emailbody)
            .input('Date', sql.Date, new Date().toISOString().split('T')[0]) // Current date
            .query(query);

        return "email created successfully";
    } catch (error) {
        throw error;
    }
}

export const getEmailByIdService = async (EmployeeID) => {
    try {
        console.log("Getting email for EmployeeID:", EmployeeID);
        const query = `
            SELECT * FROM Email
            WHERE EmployeeID = @EmployeeID
        `;
        const result = await poolRequest()
            .input('EmployeeID', sql.VarChar, EmployeeID)
            .query(query);

        console.log("Result recordset:", result.recordset);
        return result.recordset;
    } catch (error) {
        console.error("Error in getEmailByIdService:", error);
        throw error;
    }
}

