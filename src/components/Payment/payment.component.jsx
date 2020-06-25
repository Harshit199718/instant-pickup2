import React from 'react'
import './payment.styles.scss'

function Payment() {
    return (
        <div className="payment-details_container">
            <h2 className="payment-details-header">Payment Details</h2>
            <button className="mr-2 py-2 px-1 px-md-2">VISA-Checkout</button>
            <button className="mr-2 py-2 px-1 px-md-2">Card</button>
            <button className="mr-2 py-2 px-1 px-md-2">Paypal</button>
          </div>
    )
}

export default Payment
