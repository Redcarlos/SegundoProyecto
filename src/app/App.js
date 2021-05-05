import { Mongoose } from 'mongoose';
import React, { Component } from 'react';
import task from '../models/task';
import axios from 'axios';
import regeneratorRuntime from "regenerator-runtime";


class App extends Component{
constructor(){
    super();
    this.state = {
        title: '',
        description: '',
        tasks: [],
        _id: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.addTask = this.addTask.bind(this);
}
async addTask(e){
    if(this.state._id){
        const response = await axios.put(`/api/tasks/${this.state._id}`, this.state);
        console.log(response);
        M.toast({html: 'Tarea Modificada'});
        this.setState({title: '', description: ''});
        //this.axiosTasks();
    }else{
        const response = await axios.post('/api/tasks', this.state);
        console.log(response);
        M.toast({html: 'Tarea guardada'});
        this.setState({title: '', description: ''});
        this.axiosTasks();
    }
    e.preventDefault();
}

componentDidMount(){
    this.axiosTasks();
}

async axiosTasks(){

    const response = await axios.get('/api/tasks');
    console.log(response);
    this.setState({tasks: response.data});
}

async deleteTask(id){
    if(confirm('Estas seguro de eliminar la tarea?')){
        const response = await axios.delete(`/api/tasks/${id}`)
        console.log(response);
        M.toast({html: 'Tarea eliminada'});
        this.axiosTasks();
    }
}

async editTask(id){
    const response = await axios.get(`/api/tasks/${id}`)
    console.log(response.data);
    this.setState({
        title: response.data.title,
        description: response.data.description,
        _id: response.data._id
    })
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
                                                <tr key={task._id}>
                                                    <td>{task.title}</td>
                                                    <td>{task.description}</td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.editTask(task._id)}><i className="material-icons">edit</i></button>
                                                    </td>
                                                    <td>
                                                        <button className="btn light-blue darken-4" onClick={() => this.deleteTask(task._id)}><i className="material-icons">delete</i></button>
                                                    </td>
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