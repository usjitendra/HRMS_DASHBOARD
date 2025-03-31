// assets
import { LoginOutlined, ProfileOutlined } from '@ant-design/icons';
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
      id: 'getEmployee',
      title: 'Employee List',
      type: 'item',
      url: '/employee',
      icon: icons.LoginOutlined,
      // target: true
    },
    // {
    //   id: 'register1',
    //   title: 'Register',
    //   type: 'item',
    //   url: '/register',
    //   icon: icons.ProfileOutlined,
    //   target: true
    // }
  ]
};

export default Employeepages;
