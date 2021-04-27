import React from "react";
// import { Link } from "react-router-dom";

const Aside = ({ userInfo }) => {
  return (
    <div className="aside  fixed-top vh-100" style={{ width: "200px" }}>
      <ul className="list-group list">
        <li to="/profile" className="list-group-item ">
          <img
            src={userInfo.image}
            alt="user-img"
            className="rounded-circle m-2"
            style={{ width: "100px" }}
          />
          <br />
          <span className="ml-4 ">{userInfo.name}</span>
        </li>
        <li className="list-group-item ">
          <i
            className="fab fa-facebook-messenger mr-3 text-white"
            style={{
              color: "blueviolet",
            }}
          ></i>
          Messenger
        </li>
        <li className="list-group-item">
          <i className="far fa-calendar-alt mr-3 text-white"></i> Events
        </li>
        <li className="list-group-item">
          <i className="fas fa-user-friends mr-3 text-white"></i> Friends
        </li>
        <li className="list-group-item">
          <i className="fas fa-users mr-3 text-white"></i> Groups
        </li>
        <li className="list-group-item ">
          <i className="fas fa-star text-white mr-3"></i> Favorite
        </li>

        <li className="list-group-item ">
          <i className="far fa-clock  mr-3 text-white"></i> Memories
        </li>
        <li className="list-group-item">
          <i className="fas fa-cloud-sun-rain mr-3 text-white"></i>
          Weather
        </li>
      </ul>
    </div>
  );
};

export default Aside;
