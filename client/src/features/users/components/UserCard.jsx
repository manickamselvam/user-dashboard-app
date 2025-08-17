import { Card, Row, Col, Avatar, Tooltip, Empty } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import "./UserCard.css";

function UserCard({ users, onEdit, onDelete }) {
  const hasUsers = users && users.length > 0;

  return (
    <div style={{ padding: "20px" }}>
      {hasUsers ? (
        <Row gutter={[16, 16]}>
          {users.map((user) => (
            <Col key={user.id} xs={24} sm={12} md={8}>
              <Card className="user-card">
                <Avatar size={100} src={user.avatar} className="user-avatar" />
                <h3 className="user-name">
                  {user.first_name} {user.last_name}
                </h3>
                <p className="user-email">{user.email}</p>
                <div className="hover-actions">
                  <Tooltip title="Edit">
                    <div
                      className="action-button edit"
                      onClick={() => onEdit(user)}
                    >
                      <EditOutlined />
                    </div>
                  </Tooltip>
                  <Tooltip title="Delete">
                    <div
                      className="action-button delete"
                      onClick={() => onDelete(user.id)}
                    >
                      <DeleteOutlined />
                    </div>
                  </Tooltip>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Empty description="No users found" />
      )}
    </div>
  );
}

export default UserCard;
