import logo, { ReactComponent as Logo } from 'assets/logo.svg';
import { useState } from 'react';
import useWindowSize from 'hooks/useWindowSize';
import Headroom from 'react-headroom';
import * as globalStyle from 'styles/global/Global.module.scss';
import * as headerStyle from 'styles/components/Header.module.scss';

export default function MobileHeader(props) {
  const [isOpen, setIsOpen] = useState(false);
  const [fixedStyle, setFixedStyle] = useState(null)
  const [isDisabled, setIsDisabled] = useState(false)
  const [width, height] = useWindowSize();
  
  const clickMenuLink = (e) => {
    e.preventDefault();
  }

  const clickHamburger = (e) => {
    e.preventDefault();
    
    // opening the hamburger hides the nav - not sure why, could be a bug in the package due to the header changing 
    // height messing with the logic triggering an unwanted transform.  
    // Because it's an npm package, its difficult to debug.
    // I could fork the package and create my own callback to debug and stop whatevers happening, but in the
    // sake of time I'll instead just disable the menu, open it, and then undisable it again 40 seconds after using settimeout.
    // quite hacky and if you click too fast it breaks, but it works for most cases.
    if(!isOpen) {
      setIsDisabled(true);
    }
    setIsOpen(!isOpen);

    if(!isOpen) {
      setTimeout(() => {
        setIsDisabled(false);
      }, 225);
    }
  }

  const unfixFn = (e) => {
    // messy :(
    // this gets called on unfix - and it 
    setFixedStyle({position: `fixed`, transform: `translate3d(0px, 0, 0px)`});
  }
  
  return (
   <Headroom className={headerStyle.parent} disable={isDisabled} onUnfix={unfixFn} style={fixedStyle}>
     <div className={`${headerStyle.header}`}>
      <div className={`${globalStyle.container} ${globalStyle.justifySpaceBetweenAlignCenter}`}>
        <div className={headerStyle.logo}>
          <a href="#" onClick={ (e) => e.preventDefault() }><Logo /></a>
        </div>
        {width > 900 ? (<div className={headerStyle.links}>
          {props.links.map((link, index) => {
            return <a href={ link.href } onClick={ (e) => clickMenuLink(e) } className={ `${headerStyle.link} ${globalStyle.link}` } key={ index }>{ link.title }</a>
          })}
        </div>) : 
        (<a href="#" onClick={(e) => clickHamburger(e)}>
          <div className={`${headerStyle.hamburgerWrapper} ${isOpen ? headerStyle.hamburgerOpen : ``}`}>
            {[ ...Array(3).keys() ].map( i => <span className={headerStyle.hamburgerLine}></span>)}
          </div>
        </a>)
        }
      </div>
      <div className={`${headerStyle.hamburgerMenu} ${globalStyle.container}`}>
        {isOpen && width <= 900 ? props.links.map((link, index) => {
          return <a href={ link.href } onClick={ (e) => clickMenuLink(e) } className={ `${headerStyle.hamburgerLink}` } key={ index }>{ link.title }</a>
        }) : <></>}
      </div>
     </div>
   </Headroom> 
  );
}