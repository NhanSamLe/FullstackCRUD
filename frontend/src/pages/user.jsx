import {notification, Table} from 'antd';
import React, { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "../components/context/auth.context";
import {getProfile} from "../util/api";

const UserPage = () => {
    const [dataSource, setDataSource] = useState([]);
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await getProfile();
                setDataSource(response.data);
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
      dataIndex: "_id", // ✅ MongoDB field
      key: "_id",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    ];

    return (
        <div style={{padding: "20px"}}>
            <Table dataSource={dataSource} columns={columns} rowKey="_id"  style={{ width: "100%" }} />
        </div>
    );
}
export default UserPage;
