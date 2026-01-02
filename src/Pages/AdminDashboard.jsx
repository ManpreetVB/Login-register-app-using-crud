import { useEffect, useState } from "react";
import UserModal from "../components/UserModal";
import {
    GetAllUsersService,
    UpdateUserService ,
    DeleteUserService 
} from "../Services/UserServices";
import EditUserModal from "../components/EditUserModal";

function AdminDashboard() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await GetAllUsersService();
      setUsers(res.data);  
    } catch (error) {
      console.error("Failed to load users", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleApprove(user) {
    try {
      const updatedUser = { ...user, status: "Approved" }; 
      const res = await UpdateUserService(updatedUser);
      alert(res.data);
      fetchUsers();
    } catch (err) {
      console.error(err);
      alert("Approve failed");
    }
  }
  
  async function DeleteUser(UserId) {
    if (!window.confirm("Are you sure to delete?")) return;

    try {
      await DeleteUserService(UserId);
      fetchUsers(); 
    } catch (error) {
      console.error("Delete failed", error);
    }
  }

  if (loading) return <h4>Loading users...</h4>;

  return (
    <div className="container mt-4">
      <h2>Admin Panel - User Management</h2>

      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>UserId</th>
            <th>UserName</th>
            <th>Email</th>
            <th>Password</th>
            <th>Gender</th>
            <th>Address</th>
           
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map(user => (
            <tr key={user.userId}>
              <td>{user.userId}</td>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.password}</td>
              <td>{user.gender}</td>
              <td>{user.address}</td>
             
              <td>{user.isActive===1?'Active':'deactive'}</td>
              <td>
                <button
                  className="btn btn-info btn-sm me-2"
                  onClick={() => {
                    setSelectedUser(user);
                    setShowModal(true);
                  }}
                >
                  View
                </button>

                {user.status !== "Approved" && (
  <button
    type="button"
    className="btn btn-warning btn-sm me-2"
    onClick={() => {
        setSelectedUser(user);
        setShowEditModal(true);
      }}
  >
    update
  </button>
)}


                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => DeleteUser(user.userId)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && (
        <UserModal
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
       {showEditModal && (
        <EditUserModal
          user={selectedUser}
          onClose={() => setShowEditModal(false)}
        />
      )}
    </div>
  );
}

export default AdminDashboard;
