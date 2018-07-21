'use strict'

const Task = use('App/Models/Task');

class TaskController {
    async index({view}) {
        const tasks = await Task.all()
        var data = {
            tasks: tasks.toJSON()
        }
        return view.render('task', data);
    }
}

module.exports = TaskController
