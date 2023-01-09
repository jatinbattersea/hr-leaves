import React, { useState, useEffect } from "react";
import PageTitle from "./../Components/PageTitle";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const initialValues = {
  lastUpdated: "",
  leaveType: "",
  from: "",
  to: "",
  totalDays: "",
  reason: "",
  status: "",
  msg: "",
};

const Leaves = () => {
  const token = Cookies.get("_goJwt");

  const [values, setValues] = useState(initialValues);

  const [leaves, setLeaves] = useState([]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const getLeaves = async () => {
    try {
      const { data } = await axios.get("api/leave/", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      setLeaves(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLeaves();
  }, [token]);

  const getLeaveDetails = async (leaveID) => {
    try {
      const { data } = await axios.get(`api/leave/details/${leaveID}`, {
        headers: {
          Authorization: `Basic ${token}`,
        }
      });
      setValues(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleMangeApplication = async (event) => {
    event.preventDefault();

    // Get Current Date with Time
    var date = new Date();
    var current_date =
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
    var current_time =
      date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    var lastUpdated = current_date + " " + current_time;

    const userData = {
      ...values,
      lastUpdated,
    };
    
    try {
      const response = await axios.post(`api/leave/${userData._id}`, userData, {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });

      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: response.data,
        });
        getLeaves();
      }
    } catch (error) {
      if (error.response.status) {
        Swal.fire({
          icon: "error",
          title: "Ooops...",
          text: error.response.data,
        });
      }
    }
  }

  return (
    <main id="main" className="main">
      <PageTitle />
      <div className="container leaves">
        <table className="table table-hover">
          <thead>
            <tr>
              <th>S.No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Last Updated</th>
              <th>No. of Days</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, index) => (
              <tr key={leave._id}>
                <td>{index + 1}</td>
                <td>{leave.name}</td>
                <td>{leave.email}</td>
                <td>{leave.lastUpdated}</td>
                <td>{leave.totalDays}</td>
                <td>{leave.status}</td>
                <td>
                  <div className="filter">
                    <a
                      className="icon"
                      href="#"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <i className="bi bi-three-dots"></i>
                    </a>
                    <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow">
                      <li>
                        <a
                          className="dropdown-item"
                          href="#"
                          data-bs-toggle="modal"
                          data-bs-target="#leave-modal"
                          onClick={() => getLeaveDetails(leave._id)}
                        >
                          <i className="bi bi-pencil-square"></i>Edit
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {values && (
        <div className="modal fade" id="leave-modal">
          <div className="modal-dialog modal-md modal-dialog-scrollable">
            <div className="modal-dialog modal-md modal-dialog-scrollable">
              <div className="modal-content">
                <div className="modal-header">
                  <h4 className="modal-title">Edit Leave</h4>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body text-start">
                  <form onSubmit={handleMangeApplication} className="row g-3">
                    <div className="col-12">
                      <label htmlFor="" className="mb-3">
                        <b>Leave Type</b>
                      </label>
                      <select
                        className="form-select"
                        name="leaveType"
                        value={values.leaveType}
                        onChange={handleInputChange}
                        disabled
                      >
                        <option value="">---Leave Type---</option>
                        <option value="CL">CL</option>
                        <option value="Leave">Leave</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-3 mt-3">
                        <b>From</b>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="from"
                        value={values.from}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-3 mt-3">
                        <b>To</b>
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        name="to"
                        value={values.to}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-3 mt-3">
                        <b>Number of Days</b>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="totalDays"
                        value={values.totalDays}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-3">
                        <b>Status</b>
                      </label>
                      <select
                        className="form-select"
                        name="status"
                        value={values.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                      </select>
                    </div>
                    <div className="col-12">
                      <label htmlFor="" className="mb-3 mt-3">
                        <b>Remark</b>
                      </label>
                      <textarea
                        className="form-control"
                        cols="30"
                        rows="3"
                        name="msg"
                        value={values.msg}
                        onChange={handleInputChange}
                        placeholder="Remark Here..."
                      ></textarea>
                    </div>
                    <div className="modal-footer justify-content-center">
                      <button
                        type="submit"
                        data-bs-dismiss="modal"
                        className="btn btn-primary"
                      >
                        Update
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default Leaves;