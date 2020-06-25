import React, {useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navigation.scss'

const Navigation = () => {

  const loc = useLocation().pathname;
  const [display,setD] =useState(false)
  const [check,setCheck] =useState(false)
  const [height,setHeight] =useState(window.innerWidth<=768?0:"auto")
  React.useEffect(() => {
    function handleResize() {
      window.innerWidth<=768?setHeight(0):setHeight("auto")
    }
    window.addEventListener('resize', handleResize)
  },[])

  const handleChange = (ch) =>{
    if(!ch){
      setHeight(0)
      setD(false)
    }else{
      setHeight("auto")
      setD(true)

    }
    setCheck(ch)
  }
  return (
    <nav className="navbar" style={{height:height}}>
      <input type="checkbox" checked={check} name="" id="" onChange={(e)=>handleChange(e.target.checked)}/>
      <i className="fa fa-bars" 
      style=
      {loc ==='/select-property'||
      loc ==='/select-inventory'||
      loc ==='/pick-date'||
      loc ==='/get-price'
      ? {color:'black',
      position:'fixed',
      top:'24px',
      right:'16px'}
      :null}>

      </i>
      <Link onClick={()=>handleChange(!check)} className={`nav-link ${display?'visible':'hidden'}`} to="/">
        HOME
      </Link>
      <a className={`nav-link ${display?'visible':'hidden'}`} href="#mission">
        OUR MISSION
      </a>
      <a className={`nav-link ${display?'visible':'hidden'}`} href="#services">
        SERVICES
      </a>
      {/* <Link onClick={()=>handleChange(!check)} className={`nav-link ${display?'visible':'hidden'}`} to="/blog">
        BLOG
      </Link> */}
      <Link onClick={()=>handleChange(!check)} className={`nav-link ${display?'visible':'hidden'}`} to="/become-a-partner">
        BECOME A DRIVER
      </Link>
      <a className={`nav-link ${display?'visible':'hidden'}`} href="#about-us">
        ABOUT US
      </a>
    </nav>
  )
}

export default Navigation
