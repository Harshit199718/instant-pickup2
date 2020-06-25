import React,{useState} from 'react'
import './payment.styles.scss'

import Select,{components} from 'react-select'
const SingleValue = ({ children, ...props }) => (
    <components.SingleValue {...props}><div><span style={{display:'block',fontWeight:'700',fontSize:'.8em'}}>Payment Type</span><span style={{fontSize:'1em'}}>{children}</span></div></components.SingleValue>
  );

  const DropdownIndicator = ({...props}
//   props: ElementConfig<typeof components.DropdownIndicator>
) => {
  return (
    <components.DropdownIndicator {...props}>
        <i className='fa fa-caret-down' style={{marginRight:'10px',color:'#000'}}></i>
    </components.DropdownIndicator>
  );
};
const options = [
    { value: 'cash', label: 'Cash' },
    { value: 'visacheckout', label: 'Visa Checkout' },
    { value: 'card', label: 'Card' },
    { value: 'paypal', label: 'Paypal' }
  ]

function Payment() {
  const [view,setView] =useState(window.innerWidth<=768?true:false)
  const [focused , setFocus] = useState(false)
  React.useEffect(() => {
    function handleResize() {
      window.innerWidth<=576?setView(true):setView(false)
    }
    window.addEventListener('resize', handleResize)
  },[])

    return (
        <>
        {
            view?(
                <div className="payment-details_container">
                    <h2 className="payment-details-header">Payment Details</h2>
                    <Select  
                    components={{
                        // Input:()=>null,
                        DropdownIndicator,
                        // IndicatorSeprator:()=>null,
                        SingleValue
                    }}
                    isSearchable={false}
                    options={options} 
                    placeholder={"Payment type"}
                    onFocus={()=>{setFocus(true)}}
                    onBlur={()=>{setFocus(false)}}
                    defaultValue={{ value: 'cash', label: 'Cash' }}
                    styles={{
                        control:(provided)=>({...provided,borderRadius:"0",outline:focused?"1px solid #8FAD28":"1px solid #ddd",border:"0",boxShadow:"none"}),
                        container:(p)=>({...p}),
                        valueContainer:(p)=>({...p,height:'100%',padding:"20px 10px"}),
                        indicatorSeparator:()=>({display:"none"})
                }}
                    />
                </div>
            ):(
        <div className="payment-details_container">
            <h2 className="payment-details-header">Payment Details</h2>
            <button className="mr-2 py-2 px-1 px-md-2">VISA-Checkout</button>
            <button className="mr-2 py-2 px-1 px-md-2">Card</button>
            <button className="mr-2 py-2 px-1 px-md-2">Paypal</button>
        </div>
            )
        }
        </>
    )
}

export default Payment
