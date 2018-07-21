'use strict'

const Task = use('App/Models/Task');
const {validate} = use('Validator');

class TaskController {
    async index({view}) {
        const tasks = await Task.all()
        var data = {
            tasks: tasks.toJSON()
        }
        return view.render('task', data);
    }

    async add({request, response, session}) {
        const validation = await validate(request.all(), {
            title: 'required'
        })

        if (validation.fails()) {
            session.withErrors(validation.messages())
                .flashAll();

            return response.redirect('back');
        }

        const task = new Task();
        task.title = request.input('title')
        task.save();

        session.flash({
            notification: 'Task added!'
        })

        return response.redirect('back');
    }

    async delete({params, session, response}) {
        const task = await Task.find(params.id)
        await task.delete()

        session.flash({
            notification: 'Task deleted!'
        })

        return response.redirect('back')
    }
}

module.exports = TaskController
