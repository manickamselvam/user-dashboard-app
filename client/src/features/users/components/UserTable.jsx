import { Table, Button, Avatar, Pagination } from "antd";
import "./UserTable.css";

function UserTable({
  users,
  onEdit,
  onDelete,
  currentPage,
  totalCount,
  onPageChange,
}) {
  const columns = [
    {
      title: "Headshot",
      dataIndex: "headshot",
      align: "center",
      render: (avatar) => <Avatar src={avatar} size="large" />,
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (text) => <span style={{ color: "#1890ff" }}>{text}</span>,
    },
    {
      title: "First Name",
      dataIndex: "first_name",
    },
    {
      title: "Last Name",
      dataIndex: "last_name",
    },
    {
      title: "Action",
      render: (_, record) => (
        <>
          <Button
            type="primary"
            onClick={() => onEdit(record)}
            style={{
              marginRight: 8,
              backgroundColor: "#1890ff",
              borderColor: "#1890ff",
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => onDelete(record.id)}
            style={{ backgroundColor: "#ff4d4f", borderColor: "#ff4d4f" }}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <Table
        dataSource={users.map((user) => ({
          ...user,
          key: user.id,
          headshot: user.avatar,
        }))}
        columns={columns}
        pagination={false}
        style={{
          backgroundColor: "#fff",
          borderRadius: "4px",
          overflow: "hidden",
          paddingRight: "20px",
        }}
        rowClassName={() => "ant-table-row-custom"}
        className="custom-table"
      />
      <Pagination
        current={currentPage}
        total={totalCount}
        pageSize={6}
        onChange={onPageChange}
        style={{
          textAlign: "center",
          marginTop: 20,
          display: "flex",
          justifyContent: "flex-end",
          padding: "16px 24px",
        }}
      />
    </>
  );
}

export default UserTable;
