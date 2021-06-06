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
    to: '/rides',
    icon: 'cilGraph',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Overview',
    to: '/overview',
    icon: 'cilHome',
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Locations',
    to: '/locations',
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
