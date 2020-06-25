import React, { useState, useEffect, Component } from "react";
import "./journey-details.scss";
import InputRange from "react-input-range";
// Using an ES6 transpiler like Babel
import Slider from 'react-rangeslider'
 
// To include the default styles
import 'react-rangeslider/lib/index.css'

// import {
//   pickupaddress,
//   dropoffaddress,
//   startcords,
//   endcords,
// } from "../MainPage/StartingOrderArea/order-area";
import Geocoder from "react-mapbox-gl-geocoder";

import DateTimePicker from "react-datetime-picker";

import mapboxgl from "mapbox-gl";
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import TimeRange from "../TimeRange/time-range.component";
import ChooseVehicle from "../ChooseVehicle/choose-vehicle.component";
import ContactForm from "../ContactForm/contact-form.component";
import ImageUpload from "../ImageUpload/image-upload.component";
import Payment from "../Payment/payment.component";

mapboxgl.accessToken =
  "pk.eyJ1IjoiaW5zdGFudHBpY2t1cDEiLCJhIjoiY2s0azB4d2dqMTF1aDNlbnR1NW13dzRlYSJ9.bpI5rXZol2w7bpeNgI2rEQ";
const mapAccess = {
  mapboxApiAccessToken:
    "pk.eyJ1IjoiaW5zdGFudHBpY2t1cDEiLCJhIjoiY2s0azB4d2dqMTF1aDNlbnR1NW13dzRlYSJ9.bpI5rXZol2w7bpeNgI2rEQ",
};

const queryParams = {
  country: "gb",
};

let pickupadd = "";
let dropoffadd = "";
let startcord = [];
let endcord = [];

const MyInput = (props) => {
  const [clear, setClear] = useState(true);
  // deleteAddress = ()
  useEffect(() => {
    if (props.value && props.toUp) {
      props.setState({ [props.clType]: false });
    }
    // if (props.clear && props.toUp) {
    //   props.setState({ [props.adType]: "" });
    // }
  }, [props.value, props.clear, props.toUp]);
  console.log("props.savedAddress", props.savedAddress);
  return (
    <div
      className="select"
      style={
        props.adType == "fromAddress"
          ? props.isError
            ? { border: "1px solid red" }
            : {}
          : props.isError
          ? { border: "1px solid red" }
          : {}
      }
    >
      <div>
        <i class="fa fa-map-marker" aria-hidden="true"></i>
        <div className="enter-location pick-location">
          <h5>{props.inputTitle} </h5>
          <input
            {...props}
            type="text"
            value={
              props.clear ? "" : props.saved ? props.savedAddress : props.value
            }
            placeholder="ENTER LOCATION"
            autoFocus={props.focus}
          />
          {props.value && !props.clear ? (
            <span
              className="delete-address"
              onClick={() =>
                props.setState({ [props.adType]: "", [props.clType]: true })
              }
            >
              x
            </span>
          ) : null}
          {/* <i class="fa fa-caret-down" aria-hidden="true"></i> */}
        </div>
      </div>
      {/* <div>
        <span>+</span>
      </div> */}
    </div>
  );
};

//Edit Adderss

function EditAddress(props) {
  console.log(props.addressData && props.addressData.split(","));
  const address = props.addressData ? props.addressData.split(",") : [];
  const [city, setCity] = useState("");
  const [postCode, setPost] = useState("");
  const [addressLine, setAddLine] = useState("");
  const [additional, setAdditional] = useState("");
  useEffect(() => {
    if (!props.saved) {
      if (address.length == 2 || address.length == 1) {
        let addressline1 = "";
        address.map((val, i, arr) => {
          addressline1 = addressline1 + val + (i == arr.length - 1 ? "" : ", ");
        });
        addressline1 !== addressLine && setAddLine(addressline1);
      } else if (address.length == 3) {
        let city1 = address[0];
        city1 !== city && setCity(city1);
        let addressline1 = "";
        address.map((val, i, arr) => {
          addressline1 =
            addressline1 +
            (i > 0 ? val + (i == arr.length - 1 ? "" : ", ") : "");
        });
        addressline1 !== addressLine && setAddLine(addressline1);
      } else if (address.length > 3) {
        let post1 = address[0];
        let city1 = address[1];
        let addressline1 = "";
        address.map((val, i, arr) => {
          addressline1 =
            addressline1 +
            (i > 1 ? val + (i == arr.length - 1 ? "" : ", ") : "");
        });
        post1 !== postCode && setPost(address[0]);
        city1 !== city && setCity(address[1]);
        addressline1 !== addressLine && setAddLine(addressline1);
      } else {
        setCity("");
        setPost("");
        setAddLine("");
        // setCity("")
      }
    }
  }, [address.length]);
  return (
    <div
      className="edit-address_container"
      style={
        props.visible
          ? { opacity: "1", pointerEvents: "auto", transition: ".5s" }
          : { opacity: "0", pointerEvents: "none" }
      }
    >
      <div className="edit-address">
        <div className="edit-input_container">
          <h2 className="edit-address_header">EDIT ADDRESS</h2>
          <div className="edit-additional edit-address-input">
            <h5>ADDITIONAL INFORMATION</h5>
            <input
              type="text"
              value={additional}
              onChange={(e) => setAdditional(e.target.value)}
              placeholder="Enter company name, flat number, floor etc."
            />
          </div>
          <div className="edit-additional edit-address-input">
            <h5>ADDRESS LINE:</h5>
            <input
              type="text"
              value={addressLine}
              onChange={(e) => setAddLine(e.target.value)}
              placeholder="Enter Address Line"
            />
          </div>
          <div className="edit-additional edit-address-input">
            <div>
              <h5>CITY</h5>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city"
              />
            </div>
            <div>
              <h5>POST CODE</h5>
              <input
                type="text"
                value={postCode}
                onChange={(e) => setPost(e.target.value)}
                placeholder="Enter post code"
              />
            </div>
          </div>
        </div>
        <div className="edit-btn_container">
          <button
            onClick={() => {
              props.updateState();
            }}
            className="edit-btn cancel-btn"
          >
            CANCEL
          </button>
          <button
            onClick={() => {
              props.updateState(
                additional + "," + postCode + "," + city + "," + addressLine
              );
            }}
            className="edit-btn cancel-save"
          >
            SAVE
          </button>
        </div>
      </div>
    </div>
  );
}

class JourneyDetails extends Component {
  constructor() {
    super();
    this.state = {
      buttonText: "UPLOAD IMAGE",
      fromAddress: "",
      toAddress: "",
      viewport: {},
      fromClear: false,
      toClear: false,
      startDate: "",
      pickupError: false,
      dropoffError: false,
      dateError: false,
      pickNameError: false,
      dropNameError: false,
      pickEmailError: false,
      dropEmailError: false,
      pickMobileError: false,
      dropMobileError: false,
      editAddress: false,
    };
  }

  handleDateChange = (date) => {
    this.setState({
      startDate: date,
    });
  };

  onSelected = (viewport, item) => {
    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });
    console.log(viewport,"viewport")
    this.setState({ viewport });
    pickupadd = item.place_name;
    startcord = item.geometry.coordinates;
    directions.setOrigin(pickupadd)
  };

  onSelectedTwo = (viewport, item) => {
    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });
    this.setState({ viewport });
    dropoffadd = item.place_name;
    endcord = item.geometry.coordinates;
    directions.setDestination(dropoffadd)
  };

  componentDidMount() {
    var directions = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: "metric",
      profile: "mapbox/driving",
    });

    const map = new mapboxgl.Map({
      container: this.map,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-0.1275, 51.50722],
      zoom: 10,
    });
    map.addControl(directions, "top-left");

    map.on("load", function () {
      startcord.length&&directions.setOrigin(startcord);
      endcord.length&&directions.setDestination(endcord);
    });
  }

  //error handle
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      fromFocus: false,
      toFocus: false,
      [name + "Error"]: false,
      [name]: value,
    });
  };

  handleSubmit = () => {
    this.setState({
      fromFocus: false,
      toFocus: false,
    });
    const {
      pickName,
      pickEmail,
      pickMobile,
      dropName,
      dropEmail,
      dropMobile,
      startDate,
      fromClear,
      toClear,
    } = this.state;
    if (
      !fromClear &&
      !toClear &&
      startDate &&
      pickName &&
      pickEmail &&
      pickEmail.includes("@") &&
      pickMobile &&
      pickMobile.length == 11 &&
      dropName &&
      dropEmail &&
      dropEmail.includes("@") &&
      dropMobile &&
      dropMobile.length == 11
    ) {
    } else {
      if (!this.state.fromAddress || this.state.fromClear) {
        this.setState({
          fromAddressError: true,
        });
      }

      if (!this.state.toAddress || this.state.toClear) {
        this.setState({
          toAddressError: true,
        });
      }

      if (!startDate) {
        this.setState({
          startDateError: true,
        });
      }

      if (!pickName) {
        this.setState({
          pickNameError: true,
        });
      }

      if (!pickEmail || !pickEmail.includes("@")) {
        this.setState({
          pickEmailError: true,
        });
      }

      if (!pickMobile || pickMobile.length !== 11) {
        this.setState({
          pickMobileError: true,
        });
      }

      if (!dropName) {
        this.setState({
          dropNameError: true,
        });
      }

      if (!dropEmail || !dropEmail.includes("@")) {
        this.setState({
          dropEmailError: true,
        });
      }

      if (!dropMobile || dropMobile.length !== 11) {
        this.setState({
          dropMobileError: true,
        });
      }
    }
  };

  render() {
    console.log("[][][][][][]");
    let { viewport } = this.state;
    return (
      <div className="journey-details">
        <div className="journey-and-contact-details_container">
          <div className="journey-details_container">
            <h2 className="journey-details-header">Journey Details</h2>
            <Geocoder
              {...mapAccess}
              onSelected={this.onSelected}
              viewport={viewport}
              hideOnSelect={true}
              updateInputOnSelect={true}
              // className="point pickup"
              inputComponent={(props) => {
                !this.state.fromSaved &&
                  props.value &&
                  this.state.fromAddress != props.value &&
                  this.setState({
                    fromAddress: props.value,
                    fromFocus: true,
                    toFocus: false,
                  });

                return (
                  <MyInput
                    {...props}
                    focus={this.state.fromFocus}
                    clear={this.state.fromClear}
                    saved={this.state.fromSaved}
                    savedAddress={this.state.fromAddress}
                    clType={"fromClear"}
                    setState={(obj) => this.setState(obj)}
                    toUp={
                      this.state.fromAddress != props.value &&
                      this.state.fromAddress &&
                      !this.state.fromSaved
                    }
                    adType={"fromAddress"}
                    isError={this.state.fromAddressError}
                    handleChange={this.handleChange}
                    inputTitle="PICK UP"
                  />
                );
              }}
              queryParams={queryParams}
            />

            {/* {this.state.fromAddress ? ( */}
            <EditAddress
              updateState={(savedData) => {
                console.log(savedData);
                this.setState({
                  editFromAddress: false,
                  fromAddress: savedData ? savedData : this.state.fromAddress,
                  fromSaved: savedData ? true : false,
                });
              }}
              visible={this.state.editFromAddress}
              saved={this.state.fromSaved}
              addressData={this.state.fromAddress}
            />
            {/* ) : null} */}
            <h5
              onClick={() =>
                this.setState({
                  fromFocus: false,
                  toFocus: false,
                  editFromAddress: true,
                })
              }
              style={{ cursor: "pointer" }}
            >
              EDIT ADDRESS
            </h5>
            <Geocoder
              {...mapAccess}
              onSelected={this.onSelectedTwo}
              viewport={viewport}
              hideOnSelect={true}
              updateInputOnSelect={true}
              // className="point dropoff"
              inputComponent={(props) => {
                props.value &&
                  !this.state.toSaved &&
                  this.state.toAddress != props.value &&
                  this.setState({
                    toAddress: props.value,
                    toFocus: true,
                    fromFocus: false,
                  });
                return (
                  <MyInput
                    {...props}
                    setState={({ toAddress, toClear }) => {
                      this.setState({ toAddress, toClear });
                    }}
                    clear={this.state.toClear}
                    focus={this.state.toFocus}
                    saved={this.state.toSaved}
                    savedAddress={this.state.toAddress}
                    clType={"toClear"}
                    isError={this.state.toAddressError}
                    toUp={
                      this.state.toAddress != props.value &&
                      this.state.toAddress &&
                      !this.state.toSaved
                    }
                    adType={"toAddress"}
                    inputTitle="DROP OFF"
                  />
                );
              }}
              queryParams={queryParams}
            />
            <EditAddress
              updateState={(savedData) =>
                this.setState({
                  editToAddress: false,
                  toAddress: savedData ? savedData : this.state.toAddress,
                  toSaved: savedData ? true : false,
                })
              }
              addressData={this.state.toAddress}
              visible={this.state.editToAddress}
              saved={this.state.toSaved}
            />
            <h5
              onClick={() =>
                this.setState({
                  fromFocus: false,
                  toFocus: false,
                  editToAddress: true,
                })
              }
              style={{ cursor: "pointer" }}
            >
              EDIT ADDRESS
            </h5>
            <div
              className="select"
              style={
                this.state.startDateError ? { border: "1px solid red" } : {}
              }
            >
              <div>
                <i class="fa fa-calendar-o" aria-hidden="true"></i>
                <div className="enter-location date-of-journey">
                  <h5>DATE OF JOURNEY</h5>
                  <DateTimePicker
                    calendarIcon={false}
                    clearIcon={false}
                    value={this.state.startDate}
                    onChange={this.handleDateChange}
                    style={{ border: "none" }}
                    autoFocus={false}
                    disableClock={true}
                    format="mm/dd/yyyy"
                    dayPlaceholder="ASAP"
                    monthPlaceholder=""
                    yearPlaceholder=""
                  />
                </div>
              </div>
            </div>

            <div className="journey-time-range">
      <h5 className="journey-time-range_header">Choose Time Range</h5>
      <div className="date-container">
      
      <div className="time-range-container">
            <TimeRange />
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
    </div>
          </div>
          <ChooseVehicle />

          <div className="contact-details_container">
            <h2 className="contact-details-header">Contact Details</h2>
            <div>
              <span>!</span>
              <p>
                By providing personal data, you acknowledge that you have read
                and understood our
                <a href="#">Privacy Notice</a>
              </p>
            </div>
            <ContactForm
              handleChange={this.handleChange}
              title="PICK UP"
              nameError={this.state.pickNameError}
              emailError={this.state.pickEmailError}
              mobileError={this.state.pickMobileError}
            />

            <ContactForm
              handleChange={this.handleChange}
              title="DROP OFF "
              nameError={this.state.dropNameError}
              emailError={this.state.dropEmailError}
              mobileError={this.state.dropMobileError}
            />
          </div>

          <div className="additional-info_container">
            <h2 className="additional-info-header">Additional Information</h2>
            <div>
              <h5>If any single item is above 30Kg</h5>
              <div className="ckeckbox">
                <input type="checkbox" name="" id="" />
                <div className="check-toggler"></div>
              </div>
            </div>
            <div>
              <h5>Any special instructions or notes?</h5>
              <div className="additional-info-input_container">
                <input
                  type="text"
                  placeholder="E.g. Parking available, sofa comes apart, etc."
                />
              </div>
            </div>
          </div>

          <ImageUpload/>

          <Payment/>
        </div>

        <div className="location-and-book-now_container">
          <div className="location_container">
            <div className="map" ref={(el) => (this.map = el)}></div>
          </div>
          <div className="summary-and-book-now_container">
            <div className="summary_container">
              {/* <hr className="summaryLine"/> */}
              <div className="from-details">
                <div>
                  <h2>FROM</h2>
                  <h5>
                    {this.state.fromAddress && !this.state.fromClear
                      ? this.state.fromAddress.slice(0, 28) + "..."
                      : "Information required"}
                  </h5>
                </div>
              </div>
              <div className="to-details">
                <div>
                  <h2>TO</h2>
                  <h5>
                    {this.state.toAddress && !this.state.toClear
                      ? this.state.toAddress.slice(0, 28) + "..."
                      : "Information required"}
                  </h5>
                </div>
              </div>
              <div className="servicr-type-details">
                <div>
                  <h2>SERVICE TYPE</h2>
                  <h5>Parcel</h5>
                </div>
              </div>
              <div className="contact-details">
                <div>
                  <h2>CONTACT DETAILS</h2>
                  <h5>Information required</h5>
                </div>
              </div>
              <div className="payment-details">
                <div>
                  <h2>PAYMENT DETAILS</h2>
                  <h5>Cash</h5>
                </div>
              </div>
            </div>
            <div className="book-now_container">
              <h2>$45.00</h2>
              <button className="py-4" onClick={() => this.handleSubmit()}>
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default JourneyDetails;
