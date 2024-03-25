import { Router } from 'express'
import { hoursWorked , getBestEmployee, getTimeByEmployeeID, updateTime, getTime, createTime } from '../Controllers/timeController.js'

const timeRouter = Router();

timeRouter.post('/updateTime', updateTime);
timeRouter.get('/getTime', getTime);
timeRouter.post('/createTime', createTime);
timeRouter.get('/getTimeByEmployeeID/:employeeID', getTimeByEmployeeID);
timeRouter.get('/bestemployee', getBestEmployee);
timeRouter.get('/hoursworked', hoursWorked);


export default timeRouter;