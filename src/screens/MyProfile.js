import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Header from "./Navebar/Header";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
  const { auth } = useAuth();
  const state = useState();
  const [users, setUsers] = useState(null);
  const emailID = localStorage.getItem('userid');

  useEffect(() => {
    async function getData() {
      const res = await axios.get('user/myuser?emailId=' + emailID)
        .then(res => {
          console.log(res.data)

          setUsers(res.data)

        })

    }
    getData();

  }, []);

  return (
    <>
      <Header />

      <figure class="text-center">
        <b className="text-muted" style={{ fontSize: '30px', fontDisplay: 'bold' }}>My Profile</b>
      </figure>

      <div className="container">
        <table class="table table-striped table-hover" border='1' style={{ backgroundColor: '#faf0fc' }}>
          <thead>
            <tr>
              <th scope="col">FName</th>
              <th scope="col">LName</th>
              <th scope="col">Email</th>
            </tr>
          </thead>
          <tbody>
            {users && users.user.map((usr) => (
              <tr scope="row" key={usr._id}>
                <td >{usr.first_name}</td>
                <td >{usr.last_name}</td>
                <td >{usr.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default MyProfile;
