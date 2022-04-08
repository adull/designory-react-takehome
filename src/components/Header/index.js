import { ReactComponent as Logo } from 'assets/logo.svg';
import Headroom from 'react-headroom';
import * as globalStyle from 'styles/global/Global.module.scss';
import * as headerStyle from 'styles/components/Header.module.scss';

export default function Header(props) {
  const clickMenuLink = (e) => {
    e.preventDefault();
  }

  return (
   <Headroom className={headerStyle.parent}>
     <div className={`${headerStyle.header}`}>
      <div className={`${globalStyle.container} ${headerStyle.smallLinksWrapper} `}>
        <div className={headerStyle.logo}>
          <a href="#" onClick={ (e) => e.preventDefault() }><Logo /></a>
        </div>
        <div className={headerStyle.smallLinks}>
          {props.links.map((link, index) => {
            return <a href={ link.href } onClick={ (e) => clickMenuLink(e) } className={ `${headerStyle.smallLink} ${globalStyle.link}` } key={ index }>{ link.title }</a>
          })}
        </div>
      </div>
     </div>
   </Headroom> 
  );
}