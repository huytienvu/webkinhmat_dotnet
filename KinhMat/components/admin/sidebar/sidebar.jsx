'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import './style.css';

import {
  FaHome,
  FaCartArrowDown,
  FaList,
  FaCommentAlt,
  FaDiceD20,
  faUser,
  FaUser
} from 'react-icons/fa';
import { BiCategoryAlt } from "react-icons/bi";
import { FaBagShopping } from "react-icons/fa6";


const menuItems = [
  { label: 'Tổng quan', icon: <FaHome size={16} />, href: '/admin' },

  {
    items: [
      { label: 'Quản lý sản phẩm', icon: <FaList size={16} />, href: '/admin/products' },
      { label: 'Quản lý danh mục', icon: <BiCategoryAlt size={16} />, href: '/admin/category' },
      { label: 'Quản lý đơn hàng', icon: <FaBagShopping size={16} />, href: '/admin/order' },
      { label: 'Quản lý người dùng', icon: <FaUser size={16} />, href: '/admin/employees' },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="sidebar">
      <img src="/images/logo3.png" alt="" />
      {menuItems.map((section, idx) => (
        <div key={idx} className="sidebar-section">
          {section.label && !section.items ? (
            <div>
              <Link
                href={section.href}
                className={`sidebar-link ${pathname === section.href ? 'active' : ''}`}
              >
                {section.icon}
                {section.label}
              </Link>
            </div>
          ) : (
            <>
              
              <ul>
                {section.items.map((item, subIdx) => (
                  <li key={subIdx}>
                    <Link
                      href={item.href}
                      className={`sidebar-link ${pathname === item.href ? 'active' : ''}`}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
