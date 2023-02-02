import React, { useState, useEffect } from "react";
import axios from "../api/axios";
import Header from "./Navebar/Header";
import useAuth from "../hooks/useAuth";

const MyProfile = () => {
  const {auth} = useAuth();
  console.log(auth.first_name);
  const emailId = auth.email;
  const state = useState();
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function getData() {
      const res = await axios.get('user/myuser?emailId=' + emailId)
        .then(res => {
          console.log(res.data)

          setUsers(res.data)

        })

    }
    getData();
    

  }, []);

  return (
    <>
    <Header/>
      <h2 >My Profile</h2>

      <div className="container">
        <table class="table table-success table-hover">
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
