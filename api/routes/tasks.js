const express = require('express');
const router = express.Router();

const TaskController = require('../controller/tasks');

router.get('/',TaskController.get_all_tasks);

router.get('/:taskId',TaskController.get_task)

router.post('/addTask',TaskController.add_task);

router.patch('/updateTask/:taskId',TaskController.update_task);

router.patch('/updateStatus/:taskId', TaskController.update_status);

router.delete('/deleteTask/:taskId', TaskController.delete_task);

module.exports = router;
