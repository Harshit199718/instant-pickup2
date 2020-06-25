import React, {useState} from 'react'
import weightImg from "../../assets/images/weightImg.svg";
import van1 from "../../assets/images/van1.jpg";
import van2 from "../../assets/images/van2.jpg";
import './choose-vehicle.styles.scss'

var vehicleArray = [
    { id: 1, dimensions: "1.7x1.5x1.2", weight: "705", Img: van1 },
    { id: 2, dimensions: "2.5x1.5x1.9", weight: "580", Img: van2 },
  ];

function ChooseVehicle(props) {
    const [select, setSelect] = useState("")
    return (
        <div className="choose-your-delivery-vehicle_container">
            <h2 className="choose-your-vehicle-header">Choose Your Vehicle</h2>
            {vehicleArray.map((vehicle) => {
              return (
                <div
                  className="van-details"
                  style={
                    select === vehicle.id
                      ? { borderColor: "#8FAD28" }
                      : {}
                  }
                >
                  <input
                    type="checkbox"
                    name=""
                    onChange={(e) => {
                      setSelect(
                        // toFocus: false,
                        // fromFocus: false,
                          select == vehicle.id
                            ? ""
                            : vehicle.id,
                      );
                      
                    }}
                    className="vehicleSelector"
                    id=""
                  />
                  <div className="van-img_container">
                    <img src={vehicle.Img} alt="" />
                    <div>
                      <span>
                        <i class="fa fa-arrow-left mr-1" aria-hidden="true"></i>
                        <i
                          class="fa fa-arrow-right mr-1"
                          aria-hidden="true"
                        ></i>
                        {vehicle.dimensions}
                      </span>
                      <span>
                        <img className="mr-1" src={weightImg} alt="" />
                        {vehicle.weight} kg
                      </span>
                    </div>
                  </div>
                  <div className="van-details_container mt-4 mb-3 my-sm-0">
                    <h5>Small Vans</h5>
                    <h6>For items that will fit in a car boot</h6>
                  </div>
                </div>
              );
            })}
          </div>
    )
}

export default ChooseVehicle
