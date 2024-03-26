import { numberOfEmailsService , getEmailService,  getEmailByIdService, createEmailService } from "../Service/emailService.js";

export const getEmails = async (req, res) => {
    try {
        const emails = await getEmailService();
        res.status(200).json(emails);
    } catch (error) {
        console.error("Error occurred while fetching emails:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

export const numberOfEmails = async (req, res) =>{
    try {
        const result = await numberOfEmailsService();
        console.log(result);
    } catch (error) {
        console.log("error calculating emails", error)
    }

}

export const createEmail = async (req, res) => {
    const emailContent = {
        EmployeeID: req.body.EmployeeID,
        EmailSubject: req.body.EmailSubject,
        EmailContent: req.body.EmailContent,
        Emailbody: req.body.Emailbody

    };
    console.log("Request Body:", emailContent);

    try {
        const result = await createEmailService(emailContent.EmployeeID, emailContent.EmailSubject, emailContent.EmailContent, emailContent.Emailbody);
        res.status(201).json({ message: result });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



export const getEmailById = async (req, res) => {
    const EmployeeID = req.params.id;
    console.log(`getEmailById called with EmployeeID: ${EmployeeID}`);

    try {
        const email = await getEmailByIdService(EmployeeID);
        console.log(`getEmailByIdService returned:`, email);
        if (!email) {
            return res.status(404).json({ message: 'Email not found for the specified employee ID' });
        }
        res.status(200).json(email);
    } catch (error) {
        console.error("Error getting time by employee ID:", error);
        res.status(500).json({ error: error.message });
    }
}
