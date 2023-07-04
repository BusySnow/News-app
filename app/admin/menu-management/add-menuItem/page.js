'use client'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../../../styles/admin-add-menuItem.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import AdminHeader from '@/app/components/Admin-header';
import Sidebar from '@/app/components/Sidebar';

const MenuItemCreate = () => {
    const [menuItemTitle, setMenuItemTitle] = useState('');
    const [menuList, setMenuList] = useState([]);
    const [selectedMenu, setSelectedMenu] = useState('');

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get('http://localhost:3001/getMenu');
                setMenuList(response.data);
            } catch (error) {
                console.log('Error fetching menu data:', error);
            }
        };

        fetchMenu();
    }, []);

    const handleCreateMenuItem = async () => {
        try {
            const response = await axios.post('http://localhost:3001/createMenuItem', {
                title: menuItemTitle,
                menuId: selectedMenu
            });
            // TODO: Handle success create
            console.log('Menu item created successfully');
            console.log('Menu Item ID:', response.data.menuItemId);
        } catch (error) {
            console.log('Error creating menu item:', error);
        }
    };

    const handleMenuSelect = (event) => {
        event.preventDefault();
        setSelectedMenu(event.target.value);
    };

    return (
        <div>
            <AdminHeader />
            <div className='d-flex'>
                <Sidebar />
                <div className='add-user-content-container'>
                    <div className='header-container d-flex'>
                        <h4>Add New Menu Item</h4>
                        <a className='go-back' href='/admin/menu-management'>Go Back</a>
                    </div>
                    <div class="table-container">
                        <table>
                            <thead>
                                <th colSpan={2}>Menu Item Infomation</th>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Menu Item Title</td>
                                    <td>
                                        <input
                                            type="text"
                                            id="menuItemTitle"
                                            value={menuItemTitle}
                                            onChange={(e) => setMenuItemTitle(e.target.value)}
                                            placeholder='Enter menu item title'
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <td>Select Menu</td>
                                    <td>
                                        <select id="menuSelect" value={selectedMenu} onChange={handleMenuSelect}>
                                            {menuList.map((menu) => (
                                                <option key={menu._id} value={menu._id}>
                                                    {menu.title}
                                                </option>
                                            ))}
                                        </select>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                        <button className='btn btn-submit btn-primary' onClick={handleCreateMenuItem}>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MenuItemCreate;

