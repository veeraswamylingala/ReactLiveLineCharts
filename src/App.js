import logo from './logo.svg';
import './App.css';

import { Line,Chart } from "react-chartjs-2";
import React, { Component } from "react";
import LineChart from "chart.js";
import "chartjs-plugin-zoom";
import { ScrollView } from "react-native";
import ReactDOM from "react-dom";
import   EcilWebGraph from  './ecilGraph';
import  Hospital from  './hospital';
import  UseStateB from  './useState';
import {Link} from 'react-router-dom'

//import   "chartjs-plugin-streaming"


export default class App extends React.Component {



  render(){
    return(
      <div><EcilWebGraph/> </div>
    )
  }

  }