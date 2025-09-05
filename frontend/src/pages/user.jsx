import {notification ,table} from 'antd';
import React, { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/auth.context";
import {getprofile} from "../api/user.api";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getprofile();
                setDataSource([response.data]);
            }
            catch (error) {
                notification.error({
                    message: "Error",
                    description: error.message
                });
            }
        }
        fetchProfile();
    }, []);

    const columns = [
        {
            title: "ID",
            dataIndex: "id",
            key: "id"
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email"
        }
    ];

    return (
        <div style={{padding: "20px"}}>
            <Table dataSource={dataSource} columns={columns} rowKey="id" />
        </div>
    );
}
export default UserPage;
