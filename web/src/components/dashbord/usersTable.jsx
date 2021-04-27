import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../../services/userService";

const UsersTable = () => {
  const [state, setState] = useState({
    allUsers: [],
  });

  const setDataFromServer = async () => {
    let data = await userService.getAll();
    setState({ allUsers: data });
  };
  useEffect(() => {
    setDataFromServer();
  }, []);

  const hedleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      await userService.deleteUser(_id);
      setDataFromServer();
    }
  };

  const renderTbody = () => {
    const { allUsers } = state;
    return allUsers.map((user) => {
      return (
        <tr key={user._id} id="id_tbody">
          <td>
            <img
              src={user.image}
              alt="user-img"
              className="circle mr-2 ml-2 rounded-circle"
              style={{ width: "35px" }}
            />
            {user.name}
          </td>
          <td>{user._id}</td>
          <td>{user.email}</td>
          <td>{user.createdAt}</td>
          <td>{user.address}</td>
          <td>
            <i
              onClick={() => hedleDelete(user._id)}
              className="fas fa-trash-alt mr-4"
              style={{ color: "#04a8f4" }}
            ></i>
            <Link to={`/edit-user/${user._id}`}>
              <i className="fas fa-pen" style={{ color: "#04a8f4" }}></i>
            </Link>
          </td>
        </tr>
      );
    });
  };
  const { allUsers } = state;
  return (
    <div className="container-fluid" style={{ marginTop: "120px" }}>
      <div className="row mx-auto mb-4 text-center">
        <div
          className="p-3 bg-white col-lg-4 "
          style={{
            borderRadius: "16px",
            color: "#003047",
            borderRight: " 8px solid #f3f5f7",
          }}
        >
          <span className="mr-2" style={{ fontSize: "30px" }}>
            {allUsers.length}
          </span>
          <span className="mr-3" style={{ fontSize: "20px" }}>
            Costumers
          </span>{" "}
          <i
            className="fas fa-users mt-3"
            style={{
              fontSize: "50px",
              color: "#003047",
            }}
          ></i>
        </div>
        <div
          className="p-3 bg-white col-lg-4 "
          style={{
            borderRadius: "16px",
            color: "#003047",
            borderLeft: "8px solid #f3f5f7",
            borderRight: "8px solid #f3f5f7",
          }}
        >
          <span className="mr-2 " style={{ fontSize: "30px" }}>
            55
          </span>
          <span className="mr-4 " style={{ fontSize: "20px" }}>
            Posts
          </span>
          <i
            className="far fa-address-card mt-3"
            style={{ fontSize: "50px", color: "#003047" }}
          ></i>
        </div>
        <div
          className="p-3 bg-white col-lg-4"
          style={{
            borderRadius: "16px",
            color: "#003047",
            borderLeft: "8px solid #f3f5f7",
          }}
        >
          <span className="mr-2 " style={{ fontSize: "30px" }}>
            225
          </span>
          <span style={{ fontSize: "20px" }}>Likes</span>
          <i
            class="fa fa-thumbs-up mt-3 ml-4"
            style={{ fontSize: "50px", color: "#003047" }}
          ></i>
        </div>
      </div>

      <div className="pt-5 p-3 bg-white" style={{ borderRadius: "12px" }}>
        <table className="table mx-auto table-borderless text-muted">
          <thead>
            <Link to="/create-user">
              <button
                className="btn text-white"
                style={{
                  background: "#04a8f4",
                  position: "absolute",
                  right: "55px",
                  top: "270px",
                }}
              >
                New user <i class="fas fa-plus ml-1"></i>
              </button>
            </Link>
            <tr>
              <th>Full Name</th>
              <th>ID</th>
              <th>email</th>
              <th>Date Created</th>
              <th>Address</th>
            </tr>
          </thead>
          {renderTbody()}
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
