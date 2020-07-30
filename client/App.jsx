import React from 'react';
import {Line} from 'react-chartjs-2';
import axios from 'axios';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      labels: ['January', 'February', 'March',
      'April', 'May'],
      datasets: [
        {
          label: 'Value in USD',
          fill: false,
          lineTension: 0,
          backgroundColor: 'rgba(75,192,192,1)',
          borderColor: 'rgba(0,0,0,1)',
          borderWidth: 2,
          data: [65, 59, 80, 81, 56]
        }
      ]
    }
  }

componentDidMount() {

  axios.get('/api')
    .then((res) => {
      console.log(res.data);
      const bpi = res.data.bpi;
      var dates = Object.keys(bpi);
      var values = [];
      for (var key in bpi) {
        values.push(bpi[key]);
      }
      this.setState({
        labels: dates,
        datasets: [
          {
            label: 'Value in USD',
            fill: false,
            lineTension: 0,
            backgroundColor: 'rgba(75,192,192,1)',
            borderColor: 'rgba(0,0,0,1)',
            borderWidth: 2,
            data: values
          }
        ]
      })
    })
    .catch((error) => {
      console.error(error);
    })
}

  render () {
    return (
      <div>
        <h1>Chart: </h1>
        <Line
          data={this.state}
          options={{
            title:{
              display:true,
              text:'Closing Costs of Bitcoin',
              fontSize:20
            },
            legend:{
              display:true,
              position:'top'
            }
          }}
        />
    </div>
    )
  }
}

export default App;