const Task = require('../model/task');
const mongoose  = require('mongoose');

exports.get_all_tasks = (req,res,next)=>{
    Task.find()
        .select('_id name isCompleted')
        .exec()
        .then((result) => {
            const response = {
                count : result.length,
                Tasks : result.map(doc => {
                    return {
                        _id : doc._id,
                        name : doc.name,
                        isCompleted : doc.isCompleted,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:3000/tasks/'+doc._id
                        }
                    }
                })
            }
            res.status(200);
            res.json({response});
        }).catch((err) => {
            res.status(500).json({
                error:err
            });
        });
};

exports.get_task = (req,res,next) =>{
    const id = req.params.taskId;
    Task.findById({_id:id})
        .exec()
        .then((result) => {
            if(result){
                const response = {
                    count : result.length,
                    Task : {
                        _id : result._id,
                        name: result.name,
                        isCompleted: result.isCompleted,
                        request : {
                            type : 'GET',
                            url : 'http://localhost:3000/tasks/'
                        }
                    }
                }
                res.status(200).json(response);
            }
            else{
                res.status(404).json({
                    Message : "NO task Found for specified ID"
                })
            }
        }).catch((err) => {
            
        });
};

exports.add_task = (req,res,next)=>{
    let _name = req.body.name;
    console.log(_name)
    let isCompleted = false;
    const task = new Task({
        _id :  new mongoose.Types.ObjectId(),
        name : req.body.name,
        isCompleted : isCompleted
    });
    task.save()
        .then(result => {
            res.status(200).json({
                message: "Task Saved Successfully",
                Task : {
                    id : result._id,
                    name : result.name,
                    isCompleted : result.isCompleted,
                    request : {
                        type : 'GET',
                        url : 'http://localhost:3000/tasks/'+result._id
                    }
                }   
            });
        }).catch(err => {
            res.status(500).json({
                error:err
            })
        });
};

exports.update_task = (req,res,next)=>{
    const id = req.params.taskId;   
    const _name = req.body.name;
    console.log(_name+"   "+id);
    let update = {
        name: _name
    }
    Task.updateOne({_id : id},{$set : update})
        .exec()
        .then((result) => {
            res.status(200).json(
                {
                    message :"Task Updated",
                    request : {
                        type : 'GET',
                        url : 'http://localhost:3000/tasks/'+id
                }
                }
            );
        }).catch((err) => {
            res.status(500).json({
                error : err
            });
        });

};

exports.update_status = (req,res,next) =>{
    const id = req.params.taskId;
    const _isCompleted  = req.body.isCompleted;
    let update = {
        isCompleted: _isCompleted
    }
    Task.updateOne({_id:id},{$set : update})
        .exec()
        .then((result) => {
            res.status(200).json(
                {
                    message :"Task Status Updated",
                    request : {
                        type : 'GET',
                        url : 'http://localhost:3000/tasks/'+id
                }
                }
            );
        }).catch((err) => {
            res.status(500).json({
                error : err
            });
        });

};

exports.delete_task = (req,res,next) =>{
    const id = req.params.taskId;
    Task.deleteOne({_id:id})
        .exec()
        .then((result) => {
            res.status(200).json({
                message: "Task Deleted",
                request : {
                    type : 'GET',
                    url : 'http://localhost:3000/tasks/'
                }
            });
        }).catch((err) => {
            res.status(500).json({
                error : err
            });
        });
}