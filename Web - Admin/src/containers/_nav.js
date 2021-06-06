import React from 'react'
import CIcon from '@coreui/icons-react'

const _nav =  [
  {
    _tag: 'CSidebarNavItem',
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    badge: {
      color: 'info',
      text: 'NEW UPDATE',
    }
  },
  {
    _tag: 'CSidebarNavTitle',
    _children: ['Others']
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Users',
    to: '/users',
    icon: 'cil-people',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Rides',
    to: '/Rides',
    icon: 'cilGraph',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Overview',
    to: '/Overview',
    icon: 'cilHome',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Locations',
    to: '/Locations',
    icon: 'cilLocationPin',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Logout',
    to: '/login',
    icon: 'cil-cursor',
  },
]

export default _nav
