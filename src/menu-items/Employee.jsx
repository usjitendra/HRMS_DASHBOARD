// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
import { IoPersonAddSharp } from "react-icons/io5"
import { FaList } from "react-icons/fa";

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
      id: 'emptest',
      title: 'emptest',
      type: 'item',
      url: '/employee',
      icon: icons.LoginOutlined,
      // target: true
    },
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
    }


  ]
};

export default Employeepages;
