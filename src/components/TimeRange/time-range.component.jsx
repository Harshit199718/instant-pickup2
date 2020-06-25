import React,{useState} from "react";
// import InputRange from 'react-input-range'
import './time-range.styles.scss'
import Slider from 'react-rangeslider'

function TimeRange() {
    const [volume, setVolume] = useState(0)
  return (
    <div className="journey-time-range">
      <h5 className="journey-time-range_header">Choose Time Range</h5>
      <div className="time-range-container">
        <Slider
          value={volume}
          orientation='horizontal'
          onChange={(value) => setVolume(value)}
          step='15'
        />
        <p className="time-line">
          <span>6am</span>
          <span>8am</span>
          <span>10am</span>
          <span>12am</span>
          <span>2pm</span>
          <span>4pm</span>
          <span>6pm</span>
          <span>8pm</span>
        </p>
        <p className="note">*Set a wider time interval to minimize costs.</p>
      </div>
    </div>
  );
}

export default TimeRange;
