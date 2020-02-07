import React from 'react';
import './mainpage.css';

export default class MainPage extends React.Component {
  constructor(props)
  {
    super(props);
    
      this.state=
      {
        date: ""
      }
    
    
  }
  componentWillMount()
  {
    var h=new Date();
    this.setState({
     date:h.getHours()
    })
   
    
  }
  render(props) {
    const Title = this.props.city ? null : <h1 className='title'>Weather Forecast</h1>;

    return (
      <div className='main'>
        <div className='inner-main'>
          {Title}
          <img
            src={
              (this.state.date<18)
                ? require('../images/sun.svg')
                : require('../images/night.png')
            }
            alt='sun'
            style={{
              visibility: this.props.city ? 'visible' : 'hidden',
              opacity: this.props.city ? '1' : '0'
            }}
          />

          <div
            className='today'
            style={{
              visibility: this.props.city ? 'visible' : 'hidden',
              opacity: this.props.city ? '1' : '0'
            }}
          >
            <span>Today</span>
            <h1>{this.props.city}</h1>
            <p>
              Temperature: {this.props.data ? Math.round(this.props.data.temp - 273.15) : 0}
              °C
            </p>
            <p>{this.props.data ? this.props.data.weather_desc.toLowerCase() : ''}</p>
          </div>
        </div>
        {this.props.children}
      </div>
    );
  }
}
