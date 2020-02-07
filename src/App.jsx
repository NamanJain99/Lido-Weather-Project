import React from 'react';
import './App.css';
import Mainpage from './components/Mainpage';
import Input from './components/input';
import Result from './components/result';

class App extends React.Component {
  state = {
    city: undefined,
    days: new Array(5)
  };
  updateState = data => {
    const city = data.city.name;
    const days = [];
    const dayIndices = this.getDayIndices(data);

    for (let i = 0; i < 5; i++) {
      days.push({
        date: data.list[dayIndices[i]].dt_txt,
        weather_desc: data.list[dayIndices[i]].weather[0].description,
        icon: data.list[dayIndices[i]].weather[0].icon,
        temp: data.list[dayIndices[i]].main.temp,
        humidity:data.list[dayIndices[i]].main.humidity
      });
    }

    this.setState({
      city: city,
      days: days 
    });
  };
  makeApiCall = async city => {
    const api_data = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=6557810176c36fac5f0db536711a6c52`
    ).then(resp => resp.json());

    if (api_data.cod === '200') {
      await this.updateState(api_data);
      return true;
    } else return false;
  };
  getDayIndices = data => {
    let dayIndices = [];
    dayIndices.push(0);

    let index = 0;
    let tmp = data.list[index].dt_txt.slice(8, 10);

    for (let i = 0; i < 4; i++) {
      while (
        tmp === data.list[index].dt_txt.slice(8, 10) ||
        data.list[index].dt_txt.slice(11, 13) !== '15'
      ) {
        index++;
      }
      dayIndices.push(index);
      tmp = data.list[index].dt_txt.slice(8, 10);
    }
    return dayIndices;
  };

  render() {
    const WeatherBoxes = () => {
      const weatherBoxes = this.state.days.slice(1).map(day => (
        <li>
          <Result {...day} />
        </li>
      ));

      return <ul className='weather-box-list'>{weatherBoxes}</ul>;
    };
    return (
      <div className='App'>
        <header className='App-header'>
          <Mainpage data={this.state.days[0]} city={this.state.city}>
            <Input city={this.state.city} makeApiCall={this.makeApiCall.bind(this)} />
            <WeatherBoxes />
          </Mainpage>
        </header>
      </div>
    );
  }
}
export default App;
