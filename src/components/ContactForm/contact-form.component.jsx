import React from 'react'
import ukImg from "../../assets/images/ukImg.png";
import './contact-form.styles.scss'

function ContactForm(props) {
    return (
        
            <div className="pickup-details">
              <h5 className={props.title=="PICK UP"?"pick-up-header":"dropoff-header"}>{props.title}Contact Details</h5>
              <div className="pick-up-inputs inputs">
                <div
                  className="input-for-name"
                  style={
                    props.nameError ? { border: "1px solid red" } : {}
                  }
                >
                  <label htmlFor="">Name</label>
                  <input
                    type="text"
                    placeholder="Enter Name"
                    name={props.title === "PICK UP"? "pickName": "dropName"}
                    onChange={(e) => props.handleChange(e)}
                  />
                </div>
                <div className="input-for-email-and-mobile">
                  <div
                    className="input-for-email"
                    style={
                      props.emailError
                        ? { border: "1px solid red" }
                        : {}
                    }
                  >
                    <label htmlFor="">E-MAIL</label>
                    <input
                      type="text"
                      placeholder="Enter E-mail"
                      name={props.title === "PICK UP"? "pickEmail": "dropEmail"}
                      onChange={(e) => props.handleChange(e)}
                    />
                  </div>
                  <div
                    className="input-for-mobile"
                    style={
                      props.mobileError
                        ? { border: "1px solid red" }
                        : {}
                    }
                  >
                    <label htmlFor="">Mobile Number</label>
                    <img src={ukImg} alt="" />
                    <input
                      type="text"
                      placeholder="Enter Mobile No."
                      name={props.title === "PICK UP"? "pickMobile": "dropMobile"}
                      onChange={(e) => props.handleChange(e)}
                    />
                  </div>
                </div>
              </div>
            </div>
    )
}

export default ContactForm
