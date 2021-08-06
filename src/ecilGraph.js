import logo from './logo.svg';
import './App.css';

import { Line,Chart } from "react-chartjs-2";
import React, { Component } from "react";
import LineChart from "chart.js";
import "chartjs-plugin-zoom";
import { ScrollView } from "react-native";
import ReactDOM from "react-dom";
import {Link} from 'react-router-dom'
import './hospital'
import Popup from 'reactjs-popup';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css' 
//import   "chartjs-plugin-streaming";

export default class EcilWebGraph extends React.Component {
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();

   
    this.state = {
      timerInterval: 1000,
      isOn:true,
      currentDate:new Date().toLocaleString(),
        windowWidth: window.innerWidth ,
        //120 mSeconds -- 2Min - Default Window Span
        currentWindowSpan: 120,
        singlePoint: 10,
        graphWidth: 10,
        pan :false,
        zoom:true,
      
   }
  }


  componentDidMount() {
  this.hoverValue = "Value";

    this.myChart = new Chart(this.chartRef.current, {
      type: 'line',
      options: {
        responsive: true,
        maintainAspectRatio: false,
        zoomEnabled: true,
        animationEnabled: true,
        scales: {
          xAxes: [{
            type: "time",
            distribution: 'linear',
            time: {
              unit:"second",
              displayFormats: {
                millisecond: "hh:mm:ss"
              }
            }

          }],
          yAxes: [
            {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'chart0',
            ticks:{
              display:true,
              fontColor: "Black",
              max:100,
              min:0,
            },
          //   gridLines: {
          //     display: true,
          //     drawBorder: true
          // },
          //   scaleLabel: {
          //     display: true,
            //}
           },
            {
              type: 'linear',
              display: true,
              position: 'right',
              id: 'chart1',
              scaleLabel: {
                display: true,
              },
              ticks:{
                display:true,
                fontColor: "green",
                max:100,
                min:0,
              },
          },
          {
            type: 'linear',
            display: true,
            position: 'left',
            ticks:{
              display:false,
              fontColor: "green",
            },
            scaleLabel: {
              display: false,
            }
        },
       
        ]
        },
         animation: {
            duration: 1500,
          },
        pan: {
          enabled: this.state.pan,
          drag: true,
          mode: "x",
          // speed: 10,
          // threshold: 10
        },
        zoom: {
          enabled: this.state.zoom,
          drag: true,
          mode: "x",
          limits: {
            // max: 10,
            // min: 0.5
          },
          rangeMin: {
            // x: 0,
            // y: 0
          },
          rangeMax: {
            // x: 5,
            // y: 5
          }
        },
        legend: {
          display: false,
          position: 'bottom',
          labels: {
            usePointStyle: true,
              fontColor: '#333'
          }
        },
        tooltips :{
          enabled:true,
          intersect: false,
         mode: 'x'
        }, 
        hover: {
          mode: 'nearest',
          intersect: true,
          onHover: function (e, item) {
              if (item.length) {
                   this.hoverValue = item[0]._chart.config.data.datasets[1].data[item[0]._index];
                 // const data1 = item[1]._chart.config.data.datasets[1].data[item[1]._index];
                  console.log("Hover");
                  console.log(item);
                  console.log(this.hoverValue);
                //  this.setState()
                  //console.log(data1);
              }
          }
      }
      },
      data: {
        labels: [],
        datasets: [
          {
            label: "Chart",
            data: [0],
            fill: "none",
            backgroundColor: "Black",
            pointRadius: 2,
            borderColor: "Black",
            borderWidth: 1,
            lineTension: 0.5,
            hidden:false,
            yAxisID: 'chart0'
          },
          {
            label: "Chart1",
            data: [0],
            fill: "none",
            backgroundColor: "Green",
            pointRadius: 2,
            borderColor: "Green",
            borderWidth: 1,
            lineTension: 0.5,
            hidden:false,
            yAxisID: 'chart1'
          }
        ]
      },
    });

    
  

    this.componentDidUpdate();
   this.timer = setInterval(() => this.componentDidUpdate(), this.state.timerInterval);

 //setTimeout(this.componentDidUpdate(), this.state.timerInterval);
  }

  singlepoint(){
    //Graph Width----
    this.maxWidth = this.chartRef.current?.parentElement.offsetWidth;

    //Single POint----
    const point = this.maxWidth/ this.state.currentWindowSpan ;
    this.setState({singlePoint:point});
    console.log("Single POint----------"+point)
  }

  componentDidUpdate() {

    if(this.state.currentDate != new Date().toLocaleString())
    {
     // this.setState({currentDate:new Date().toLocaleString()});
    }
  
     this.date = new Date().toLocaleString();

    const min = 1;
    const max = 100;

    const rand = min + Math.random() * (max - min);
    const rand1 = min + Math.random() * (max - min);

    // const rand = 45;
    // const rand1 = 80;
    this.myChart.data.labels.push(new Date().getTime());
    this.myChart.data.datasets[0].data.push(rand);
    this.myChart.data.datasets[1].data.push(rand1);
   
    //this is to find the width of the Graph Screen-----
  
  // this.singlepoint() 
  this.maxWidth = this.chartRef.current?.parentElement.offsetWidth;

    //Single POint----
    const point = this.maxWidth/ this.state.currentWindowSpan ;
   // this.setState({singlePoint:point});
    console.log("Single POint----------"+point)

   // This is to scroll the graph after the currentWindowSpan
    // if (this.myChart.data.labels.length > this.state.currentWindowSpan) {
  
    // const tempwidth = this.myChart.data.labels.length*this.state.singlePoint

    //      var width = tempwidth + this.state.singlePoint ;
        
    //      console.log(this.chartRef.current?.parentElement.style.width)
    //      console.log(this.scrollView)
    //      console.log(this.chartRef)

    //      this.chartRef.current.parentElement.width = width +"px" ;

    //  this.setState({graphWidth:width});

    //  this.scrollView.scrollTo({ x: width });
      
    // }

     //Graph Width----
 
     //Single POint----
     
    if (this.myChart.data.labels.length > this.state.currentWindowSpan) {
      //this.myChart.data.datasets[0].data.shift();
      //this.myChart.data.datasets[1].data[0].remove();
      try{
      this.maxWidth = this.chartRef.current.parentElement.offsetWidth;

      const point = this.state.windowWidth / this.state.currentWindowSpan ;

      const tempwidth = this.myChart.data.labels.length*point ;

      var width = tempwidth + point ;
     
      if(this.chartRef.current.parentElement)
    
        this.chartRef.current.parentElement .style.width = width + "px" ;
      }
      catch{

        console.log("Parent Error")
      }
     
      this.scrollView.scrollTo({ x: width });
    }
     this.myChart.update();
    //setTimeout(this.componentDidUpdate(), this.state.timerInterval);
    //    this.scrollToBottom();
  }


  //Stop and Resume Graph-------
 handleClick = (e) =>  {
    console.log("Button Clicked");
    if(this.state.isOn == true)
    {
      clearInterval(this.timer);
      this.setState({isOn: false});
    }else{
      this.timer = setInterval(() => this.componentDidUpdate  (), this.state.timerInterval);
      this.setState({isOn: true})
    }
  }

  //Select Sample Rate DropDown-------
  handleChange = (e) => {
    const val = e.target.value;  
    console.log("DropDown Selected");
    clearInterval(this.timer);
    this.setState({ timerInterval: val*1000 }, () => {
      console.log(this.state.timerInterval);
      this.timer = setInterval(() => this.componentDidUpdate(), this.state.timerInterval);

    }); 
  }

  
//ResetGraph--------------------------------------------
  ResetGraphhandleClick = (e) => {
    console.log("Reset Graph Clicked");
    clearInterval(this.timer);
    
    this.myChart.resetZoom();
    this.scrollView.scrollTo({ x: this.state.graphWidth });
    this.timer = setInterval(() => this.componentDidUpdate(), this.state.timerInterval);
  }


    //Select Window Span DropDown-------
    windowSpanHandleChange = (e) => {
      const val = e.target.value;  
      console.log("DropDown Selected");
          clearInterval(this.timer);
      this.setState({ currentWindowSpan: val*60 }, () => {
        console.log(this.state.currentWindowSpan);
       // this.singlepoint();
        this.timer = setInterval(() => this.componentDidUpdate(), this.state.timerInterval);
  
      }); 
    }


    //Hidden----------------------------------------
    hiddenOnClick = (e) =>{
      console.log("hidden Selected");

      console.log(e);
      this.myChart.data.datasets[e].hidden  = !this.myChart.data.datasets[e].hidden
    }


  
    tagEditing = (e) =>{
     console.log("Tag Click");
    this.myChart.options.scales.yAxes[0].ticks.max = 90;
    this.myChart.options.scales.yAxes[0].ticks.min =  20
   //this.myChart.options.scales.yAxes[1].display = false

    this.myChart.options.scales.yAxes.map((value,i)=>{
      if(i!=0)
      {
        value.display = false;
      }else{
        value.display = true;
        value.ticks.display = false;
      }
   
    })

    this.myChart.update();
    }
    
    tagEditing1 = (e) =>{
      console.log("Tag1 Click");
     this.myChart.options.scales.yAxes[1].ticks.max = 150;
     this.myChart.options.scales.yAxes[1].ticks.min =  50
     //this.myChart.options.scales.yAxes[0].display = false
     
    this.myChart.options.scales.yAxes.map((value,i)=>{
      if(i!=1)
      {
        value.display = false;
      }else{
        value.display = true;
        value.ticks.display = false;
      }
    })
     this.myChart.update();
     }


    handleCheckBoxChange = (e) =>{
      console.log(e);
      console.log("CheckBoxClicked");
      // this.myChart?.data.datasets[e].hidden = !this.myChart?.data.datasets[e].hidden;
    }

    //OnClick Zoom or Pan 
    panOnClick = (e) => {
      console.log("Pan Clicked");

      this.myChart.options.pan.enabled = !this.myChart.options.pan.enabled
      this.setState({
        pan:!this.state.pan
      })
    
      this.myChart.options.zoom.enabled = !this.myChart.options.zoom.enabled
      this.setState({
        zoom:!this.state.zoom
      })

    }

    // zoomOnClick = (e) => {
    //   console.log("Zoom Clicked");
    //   this.myChart.options.pan.enabled = !this.state.pan 
    //   this.myChart.options.zoom.enabled = !this.state.zoom 
    //   this.setState({pan: !this.state.pan} );
    //   this.setState({zoom: !this.state.zoom} );
    // }

    PopupExample = () => {
      confirmAlert({
        // title: 'Try Again !',
        // message: 'No Data Available in betwean those Dates for selected Group ..!',
        customUI: ({ title, message, onClose }) => {
          return (
            <div className='custom-ui' style={{
              border: '3px solid red',
            width: 500, height: 150, padding:10,
            borderRadius: 15, backgroundColor: "lightgrey",}} >
              <h1>Try Again !</h1>
              <p>No Data Available in betwean those Dates for selected Group ..!</p>
              <button onClick={onClose}>OK</button>
        
            </div>
          );
        },
        // buttons: [
        //   {
        //     label: 'Ok',
        //    // onClick: () => alert('Click Yes')
        //   },
         
        // ]
      })
    };

    // PopupExample = () => alert('No Data Available in betwean  those Dates fro selected Group ..!')
    

  render() {

    let start = (this.state.isOn == true) ?
      <button   className="btn btn-primary" onClick={this.handleClick}>Stop Graph</button> :
      <button  className="btn btn-primary" onClick={this.handleClick}>Resume Graph</button>



    let  pan =   <button   className="btn btn-primary" onClick={this.panOnClick} style={{backgroundColor:this.state.pan == true ? "green" : "red"}}>Pan</button>
    let zoom  =  <button   className="btn btn-primary" onClick={this.panOnClick} style={{backgroundColor:this.state.zoom == true ? "green" : "red"}}>Zoom</button>
    return (
      <div style={{width:"100"}}>
        <br/>
        
        <div style={{border: '2px solid black',marginLeft:'10'}}> 
        <ScrollView
         ref={(ref) => {
          this.scrollView = ref;
        } }
        >
         <canvas id="chart" width="00px" height="250px" ref={this.chartRef}></canvas>
        </ScrollView>
        </div>

        <row>
      <p>Screen Width :{this.state.windowWidth}</p>
      <p>Date & Time : {this.state.currentDate}</p>
      <p> Sample Rate -{this.state.timerInterval}</p>

      {/* <p>Hover Value :-{this.hoverValue}</p> */}
      
      

<column>
     <p>Sample time</p>
<select id="timerInterval" onChange={this.handleChange}>
<option value="1">1 sec</option>
<option value="2">2 sec</option>
<option value="3">3 sec</option>
<option value="5">5 sec</option>
<option value="10">10 sec</option>
</select></column>
<column>
    <p>Window Span</p>
      
         <select id="WindowInterval" onChange={this.windowSpanHandleChange}>
        <option value="1">1 Min</option>
        <option value="2">2 Min</option>
        <option value="3">3 Min</option>
        <option value="5">5 Min</option>
        <option value="10">10 Min</option>
     </select></column>
      
          {start}
         
       {/* // <input type="checkbox" checked={item.value} onChange={this.handleChange.bind(this, index)}/> */}
       <input type="checkbox"  checked = {!this.myChart?.data.datasets[0].hidden} onChange={() => this.hiddenOnClick('0')}  / >
       <input type="checkbox"  checked = {!this.myChart?.data.datasets[1].hidden} onChange={() => this.hiddenOnClick('1')}  / >
       {/* <input type="checkbox"  checked = {this.myChart?.data.datasets[0].hidden} onChange={this.hiddenOnClick(1)}  / > */}

        {/* <div>
        <button   className="btn btn-primary" onClick={this.hiddenOnClick}>Hidden</button></div> */}


        <button   className="btn btn-primary" onClick={this.ResetGraphhandleClick}>Reset Graph</button>
      
        {pan}
        
        {zoom}
        <br/><br/>

        {/* <button   className="btn btn-primary" onClick={this.PopupExample}>OPen Popup</button> */}

        <button   className="btn btn-primary" onClick={this.tagEditing}>Click-90-20</button>
        <button   className="btn btn-primary" onClick={this.tagEditing1}>Click-150-50</button>
        <br/><br/>
       
       </row>

    




       {/* <table>
         <th>fValue</th>
         <th>HIgh</th>
         <th>Low</th>
         <tr>
           <td>{this.myChart.data.datasets[0].data[0] ? "hi" : null }</td>
           <td>ee</td>
           <td>ee</td>
           <td> <button   className="btn btn-primary" onClick={this.panOnClick}>Edit</button></td>
           
           
           </tr>
           <tr>
           <td>{ this.myChart.data.datasets[0].data[0] ? "hi" : null }</td>
           <td>ee</td>
           <td>ee</td>
           <td> <button   className="btn btn-primary" onClick={this.panOnClick}>Edit</button></td>
           
           
           </tr>
      
       </table> */}

   </div>

    );
  }
}



