import { isWeChat } from '@/utils';
import { NavBar, NavBarProps } from 'antd-mobile'
import React, { useLayoutEffect, useState } from 'react'
import './index.less'

interface NavbarTitleProps extends NavBarProps {
  title: string
}

const NavbarTitle: React.FC<NavbarTitleProps> = ({title,...restProps}) => {

  const [isWeixin] = useState(isWeChat());
  
  useLayoutEffect(() => {
    document.title = title;
  }, []);

  return (
    <>
      {!isWeixin && <NavBar className='navbar-custom' {...restProps}>{title}</NavBar>}
    </>
  )
}

export default NavbarTitle