import { Router } from 'express'
import { getDaysHoursByEmployeeID, getDaysHours, hoursWorked , getBestEmployee, getTimeByEmployeeID, updateTime, getTime, createTime } from '../Controllers/timeController.js'

const timeRouter = Router();

timeRouter.post('/updateTime', updateTime);
timeRouter.get('/getTime', getTime);
timeRouter.post('/createTime', createTime);
timeRouter.get('/getTimeByEmployeeID/:employeeID', getTimeByEmployeeID);
timeRouter.get('/bestemployee', getBestEmployee);
timeRouter.get('/hoursworked', hoursWorked);
timeRouter.get('/days', getDaysHours);
timeRouter.get('/days/:employeeId', getDaysHoursByEmployeeID);



export default timeRouter;