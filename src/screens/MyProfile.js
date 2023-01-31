import React, { useState, useEffect } from "react";
import axios from "axios";

const url = "http://localhost:3008/user/myuser";

const MyProfile = () => {
  const emailId = "abc@gmail.com";
  const state = useState();
  const [users, setUsers] = useState(null);
  useEffect(() => {
    async function getData() {
      const res = await axios.get(url + '?emailId=' + emailId)
        .then(res => {
          console.log(res.data)

          setUsers(res.data)

        })

    }
    getData();
    

  }, []);
  const ct=localStorage.getItem("city");
  return (
    <>

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
                <td >{usr.email} {ct}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
export default MyProfile;
