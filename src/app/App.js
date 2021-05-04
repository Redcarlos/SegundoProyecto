import { Mongoose } from 'mongoose';
import React, { Component } from 'react';
import task from '../models/task';

class App extends Component{
constructor(){
    super();
    this.state = {
        title: '',
        description: '',
        tasks: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
}
addTask(e){
    fetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(this.state),
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.json())
    .then(data => {
        console.log(data)
        M.toast({html:'Tarea guardada'})
        this.setState({title: '', description: ''});
    })
    .catch(err => console.error(err));
    e.preventDefault();
}

componentDidMount(){
    this.fetchTasks();
}

fetchTasks(){
    fetch('/api/tasks')
    .then(res => res.json())
    .then(data => {
        console.log(data);
        this.setState({tasks:data});
    });
}

handleChange(e){
    const {name, value} = e.target;
    this.setState({
        [name]: value
    });
}
    render(){
        return (
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a className="brand-logo" href="/">Tareas 1</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                    <form onSubmit={this.addTask}>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <input name="title" onChange={this.handleChange} value={this.state.title} type="text" placeholder="Titulo de la tarea"/>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className="input-field col s12">
                                                <textarea name="description" onChange={this.handleChange} value={this.state.description} placeholder="Descripcion" className="materialize-textarea"></textarea>
                                            </div>
                                        </div>
                                        <button type="submit" className="btn btn-light darken-4">
                                            Guardar
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Titulo</th>
                                        <th>Descripción</th>
                                        <th>Editar</th>
                                        <th>Eliminar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => {
                                            return(
                                                <tr>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td></td>
                                                    <td></td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;