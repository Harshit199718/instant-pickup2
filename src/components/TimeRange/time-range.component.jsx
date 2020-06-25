import React,{useState} from "react";
import InputRange from 'react-input-range'
import './time-range.styles.scss'
import 'react-input-range/lib/css/index.css'
import Slider from 'react-rangeslider'

function TimeRange() {
    const [range, setRange] = useState({min: 2, max: 10})
  return (
          <InputRange
            formatLabel={(value) => ``}
        maxValue={20}
        minValue={0}
        value={range}
        onChange={value => {
          setRange(value)}} />
  );
}

export default TimeRange;
