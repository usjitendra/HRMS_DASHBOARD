// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { IoPersonAddSharp } from "react-icons/io5"
import { FaList } from "react-icons/fa";
// import { title } from 'process';
// import { type } from 'os';
import { icon } from '@fortawesome/fontawesome-svg-core';
import { IoBusinessSharp } from 'react-icons/io5';
import { MdPolicy } from 'react-icons/md';

// icons
const icons = {
  FaList,
  ProfileOutlined
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const Employeepages = {
  id: 'employee',
  title: 'Employee',
  type: 'group',
  children: [
    {
      id: 'employee',
      title: 'Employee List',
      type: 'item',
      url: 'employee/list',
      icon: icons.ProfileOutlined,
      // target: true
    },
    {
      id:'employee',
      title:"Employee Add",
      type:"item",
      url:"employee/add",
      icon:IoPersonAddSharp
    },
    {
      id:'employee',
      title:"Employee Attendance",
      type:"item",
      url:"employee/attendance",
      icon:IoPersonAddSharp
    },
    {
      id:'employee',
      title:"Work Type",
      type:"item",
      url:"employee/work/type",
      icon:IoBusinessSharp
    },
    {
      id:'employee',
      title:"Policy",
      type:"item",
      url:"employee/policy",
      icon:MdPolicy
    }

  ]
};

export default Employeepages;
