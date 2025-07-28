import React from 'react';
import { NavLink } from 'react-router-dom';
import { DashboardIcon, UsersIcon, ProductsIcon, OrdersIcon, SparklesIcon } from './ui/Icons';
// import DownloadProject from './DownloadProject';

const navigation = [
  { name: 'Dashboard', href: '/', icon: DashboardIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Products', href: '/products', icon: ProductsIcon },
  { name: 'Orders', href: '/orders', icon: OrdersIcon },
];

const Sidebar: React.FC = () => {
  const linkClasses = "flex items-center px-4 py-3 text-gray-300 hover:bg-primary-dark hover:text-white transition-colors duration-200";
  const activeLinkClasses = "bg-primary-dark text-white";

  return (
    <div className="flex flex-col w-64 h-screen bg-primary text-white">
      <div className="flex items-center justify-center h-20 border-b border-primary-dark">
        <SparklesIcon className="h-8 w-8 mr-2 text-secondary" />
        <h1 className="text-2xl font-bold">Northwind AI</h1>
      </div>
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navigation.map((item) => (
          <NavLink
            key={item.name}
            to={item.href}
            className={({ isActive }) =>
              `${linkClasses} ${isActive ? activeLinkClasses : ''}`
            }
          >
            <item.icon className="h-6 w-6 mr-3" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      <div className="px-4 py-4 mt-auto">
        {/* <DownloadProject /> */}
      </div>
    </div>
  );
};

export default Sidebar;