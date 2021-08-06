import logo from './logo.svg';
import './App.css';

import { Line,Chart } from "react-chartjs-2";
import React, { Component } from "react";
import LineChart from "chart.js";
import "chartjs-plugin-zoom";
import {Link} from 'react-router-dom'
import { ScrollView } from "react-native";
import ReactDOM from "react-dom";
import axios from    'axios';
//import   "chartjs-plugin-streaming";


export default class Hospital extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
    this.state = {
        Students :[],
        CheckBoxValues :[],
     }
    
  }


  componentDidMount() {

    axios.get('https://jsonplaceholder.typicode.com/todos').then(res=>{
        console.log("Success");
       
        this.setState({
            Students : res.data
        })

      

    })


   

}


  hiddenOnClick = (e) =>{
    console.log("hidden Selected");
    console.log(e);

    console.log(e);

    console.log(this.state.Students[e].completed);

    var val =  this.state.Students;
 
  val[e].completed = !val[e].completed ;


    this.setState({
       Students : val
    })

    console.log(this.state.Students[e].completed);
  }




  panOnClick = (e) =>{

    console.log("Update Clicked");
  }




  render() {

    return (
      <div style={{width:"400"}}>

          <table >
              <th>Name</th>
              <th>View</th>
              <th>Edit</th>
              <th>Read</th>
              <th>Delete</th>

          {this.state.Students.map((student,i) => (

                   <tr id={student.id}>
                  <td>{student.id}</td>
                   <td><input type="checkbox"  checked = {this.state.Students[i].completed}  id={ student.name + " Andrew"}  onChange={() => this.hiddenOnClick(i)}></input> </td> 
                   <td><input type="checkbox"  checked = {this.state.Students[i].completed}  id="{student.name}-view-Checkbox" onChange={() => this.hiddenOnClick(i)}></input></td>
                   <td><input type="checkbox"  checked = {this.state.Students[i].completed} id="{student.name}-view-Checkbox" onChange={() => this.hiddenOnClick(i)}></input></td> 
                   <td><input type="checkbox"  checked = {this.state.Students[i].completed} id="{student.name}-view-Checkbox" onChange={() => this.hiddenOnClick(i)}></input></td>
                   
                    </tr>

          ))}

          </table>


<br></br><br></br>
          <div>
        <button   className="btn btn-primary" onClick={this.panOnClick}>Update</button></div>




    
   </div>

    );
  }
}



