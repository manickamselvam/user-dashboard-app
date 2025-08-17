import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchUsers,
  deleteUser,
  editUser,
  createUser,
  setCurrentPage,
} from "./usersSlice";
import UserTable from "./components/UserTable";
import UserCard from "./components/UserCard";
import UserModal from "./components/UserModal";
import { Input, Button, Spin, Alert } from "antd";
import NavBar from "../../components/layout/NavBar";
import ViewToggle from "../../components/common/ViewToggle";

function UsersPage() {
  const dispatch = useAppDispatch();
  const { pages, currentPage, totalCount, loading, error } = useAppSelector(
    (state) => state.users
  );

  const [view, setView] = useState("table");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    dispatch(fetchUsers({ page: currentPage, limit: 6 }));
  }, [dispatch, currentPage]);

  const filteredUsers = (pages[currentPage] || []).filter((u) =>
    `${u.first_name} ${u.last_name}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const handlePageChange = (page) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <div>
      <NavBar />

      <div
        style={{
          width: "95%",
          margin: "50px auto",
          background: "white",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 16,
            padding: "20px 20px 0px 20px",
          }}
        >
          <h4>Users</h4>
          <div>
            <Input.Search
              placeholder="Search users"
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: 300 }}
            />
            <Button
              type="primary"
              onClick={() => setModalOpen(true)}
              style={{ marginLeft: 8 }}
            >
              Create User
            </Button>
          </div>
        </div>

        <ViewToggle onChange={setView} />

        {/* 🔄 Loading Spinner */}
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "10vh",
            }}
          >
            <Spin tip="Loading users..." size="large" />
          </div>
        ) : error ? (
          <Alert
            message="Error fetching users"
            description={error}
            type="error"
            showIcon
            style={{ margin: "20px" }}
          />
        ) : (
          <>
            {view === "table" ? (
              <UserTable
                users={filteredUsers}
                onEdit={setEditingUser}
                onDelete={(id) => dispatch(deleteUser(id))}
                currentPage={currentPage}
                totalCount={totalCount}
                onPageChange={handlePageChange}
              />
            ) : (
              <UserCard
                users={filteredUsers}
                onEdit={setEditingUser}
                onDelete={(id) => dispatch(deleteUser(id))}
              />
            )}

            <UserModal
              open={modalOpen || !!editingUser}
              user={editingUser}
              onClose={() => {
                setModalOpen(false);
                setEditingUser(null);
              }}
              onSubmit={(data) => {
                if (editingUser) {
                  dispatch(editUser({ id: editingUser.id, ...data }));
                } else {
                  dispatch(createUser(data));
                }
                setModalOpen(false);
                setEditingUser(null);
              }}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default UsersPage;
