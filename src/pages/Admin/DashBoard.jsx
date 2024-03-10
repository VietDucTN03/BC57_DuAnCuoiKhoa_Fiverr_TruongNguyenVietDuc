import React, { useState } from 'react'
import { UserOutlined, BarsOutlined, AreaChartOutlined, PieChartOutlined, ContainerOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
function getItem(label, key, icon, children, type) {
    return {
        key,
        icon,
        children,
        label,
        type,
    };
}
const items = [
    getItem('Dash Board', 'sub1', <BarsOutlined />, [
        getItem('Option 1', '1', <UserOutlined />),
        getItem('Option 2', '2', <AreaChartOutlined />),
        getItem('Option 3', '3', <PieChartOutlined />),
        getItem('Option 4', '4', <ContainerOutlined />),
    ]),
];

// submenu keys of first level
const rootSubmenuKeys = ['sub1'];

const DashBoard = () => {

    const [openKeys, setOpenKeys] = useState(['sub1']);
    const onOpenChange = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };

    return (
        <div>
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={onOpenChange}
                style={{
                    width: 196,
                }}
                items={items}
            />
        </div>
    )
}

export default DashBoard;