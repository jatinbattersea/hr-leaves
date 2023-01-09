import React, { useEffect, useState, useRef } from 'react';
import TeamLeader from './../Components/TeamLeader';
import Candidate from './../Components/Candidate';
import axios from 'axios';
import Swal from 'sweetalert2';
import PageTitle from '../Components/PageTitle';
import Cookies from "js-cookie";
const initialValues = {
  profileImage: '',
  name: '',
  designation: '',
  team: '',
  doj: '',
  employeeID: '',
  password: '',
  phone: '',
  email: '',
  dob: '',
  address: '',
  bankName: '',
  accNo: '',
  ifsc: '',
  shift: '',
};

const AllEmployee = () => {

  const token = Cookies.get("_goJwt");

  const [employees, setEmployees] = useState([]);

  const [shifts, setShifts] = useState([]);

  const [teams, setTeams] = useState([]);

  const [designations, setDesignations] = useState([]);

  const [values, setValues] = useState(initialValues);

  const [nameFields, setNameFields] = useState({
    designationName: "",
    teamName: "",
    shiftName: "",
  });

  const [fileURL, setFileURL] = useState('');
  const file = useRef(null);
  
  const getUsers = async () => {
    try {
      const { data } = await axios.get("/api/user", {
        headers: {
          Authorization: `Basic ${token}`,
        },
      });
      setEmployees(data)
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getUsers()
  }, []);

  useEffect(() => {
    const getShifts = async () => {
      try {
        const { data } = await axios.get("/api/shift", {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setShifts(data);
      } catch (error) {
        console.log(error);
      }
    }
    getShifts()
  }, [token])

  useEffect(() => {
    const getDesignations = async () => {
      try {
        const { data } = await axios.get("/api/designation", {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setDesignations(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDesignations();
  }, [token]);  

  useEffect(() => {
    const getTeams = async () => {
      try {
        const { data } = await axios.get("/api/team", {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
        setTeams(data);
      } catch (error) {
        console.log(error);
      }
    };
    getTeams();
  }, [token]);  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleNameFieldChange = async (e) => {
    const { name, value } = e.target;
    setNameFields({
      ...values,
      [name]: value,
    });

    if (name === "designationName") {
      let designation = designations.find((designation) => {
        return designation.name === value;
      });
      setValues({
        ...values,
        designation: {
          id: designation._id,
          name: designation.name,
        },
      });
    } else if (name === "teamName") {
      let team = teams.find((team) => {
        return team.name === value;
      });
      setValues({
        ...values,
        team,
      });
    } else {
      let shift = shifts.find((shift) => {
        return shift.name === value;
      });
      setValues({
        ...values,
        shift
      })
    }
  }

  const getUser = (id) => {
    const employee = employees.find((employee) => {
      return employee.employeeID == id;
    });

    setFileURL(employee.profileImage);
    setValues(employee);
    setNameFields({
      designationName: (employee.designation === null ? "" : employee.designation.name),
      teamName: (employee.team === null ? "" : employee.team.name),
      shiftName: (employee.shift === null ? "" : employee.shift.name),
    });
  }

  const clearImage = () => {
    console.log("clear")
    setFileURL('');
    file.current.value = null;
  }

  const generatePassword = (event) => {
    console.log("generate password");
    event.preventDefault();
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = 6;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    setValues({
      ...values,
      password: password
    })
  }

  const handleUpdateMember = async (event) => {
    event.preventDefault();

    const userData = {
      profileImage: values.profileImage,
      name: values.name.trim(),
      designation: values.designation,
      team: values.team,
      doj: values.doj,
      employeeID: values.employeeID.trim(),
      password: values.password.trim(),
      phone: values.phone.trim(),
      email: values.email.trim(),
      dob: values.dob,
      address: values.address.trim(),
      bankName: values.bankName.trim(),
      accNo: values.accNo.trim(),
      ifsc: values.ifsc.trim(),
      shift: values.shift,
    };

    if (file.current.value !== "") {
      const data = new FormData();
      const fileName = Date.now() + file.current.files[0]?.name;
      userData.profileImage = fileName;
      data.append("name", fileName);
      data.append("file", file.current.files[0]);
      try {
        await axios.post("/api/user/upload", data, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        });
      } catch (err) {
        console.log(err);
      }
    }
    try {
      await axios
        .put(`/api/user/${values._id}`, userData, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: response.data,
            })
            setValues(initialValues);
            setFileURL("");
            file.current.value = null;
            getUsers();
          }
        });
    } catch (error) {
        if (error.response.status) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data,
          })
        }
    }
  }

  const deleteUser = async (id) => {
    try {
      await axios
        .delete(`/api/user/${id}`, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: 'success',
              title: response.data,
            })
            getUsers();
          }
        });
    } catch (error) {
        if (error.response.status) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data,
          })
        }
    }
  }

  return (
    <>
      <main id="main" className="main">
        <PageTitle />
        {/* End Page Title */}
        <section className="section dashboard">
          {employees.length > 0 ? (
            <>
              <div className="row">
                {employees.map(
                  (employee) =>
                    employee.designation?.name == "Team Leader" && (
                      <TeamLeader
                        key={employee._id}
                        details={employee}
                        getUser={getUser}
                        deleteUser={deleteUser}
                      />
                    )
                )}
              </div>

                {
                  teams.map((team) => (
                    <div key={team._id}>
                      <h4>{team.name}</h4>
                      <div className="row mt-4">
                      {
                        employees.map(
                          (employee) =>
                            (employee.team?.name === team.name && employee.designation?.name !== "Team Leader") && (
                              <Candidate
                                key={employee._id}
                                details={employee}
                                getUser={getUser}
                                deleteUser={deleteUser}
                              />
                            )
                        )
                      }
                      </div>
                    </div>
                  ))
                }
            </>
          ) : (
            <div className="d-flex justify-content-center">
              <div
                className="spinner-border text-primary"
                style={{ width: "3rem", height: "3rem" }}
                role="status"
              >
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          )}
          {values && (
            <div className="modal fade" id="modalDialogScrollable">
              <div className="modal-dialog modal-xl modal-dialog-scrollable">
                <div className="modal-content">
                  <div className="modal-header">
                    <h4 className="modal-title">Edit Details</h4>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body text-start">
                    <form encType="multipart/form-data">
                      <div className="container">
                        <div className="col-lg-12 mb-4">
                          <div className="form-group row">
                            <div className="col-lg-4">
                              <label className="mb-3">Upload Photo</label>
                              <img
                                id="frame"
                                src={
                                  values.profileImage != ""
                                    ? process.env.REACT_APP_PUBLIC_PATH +
                                      values.profileImage
                                    : fileURL && URL.createObjectURL(fileURL)
                                }
                                className="img-fluid mb-2"
                              />
                              <input
                                className="form-control"
                                type="file"
                                name="profileImage"
                                id="formFile"
                                ref={file}
                                onChange={(event) => {
                                  setFileURL(event.target.files[0]);
                                  setValues({
                                    ...values,
                                    profileImage: "",
                                  });
                                }}
                              />
                              <button
                                className="btn btn-danger mt-3"
                                onClick={clearImage}
                              >
                                Remove Photo
                              </button>
                            </div>

                            <div className="col-lg-4">
                              <label className="mb-3">Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={values.name}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-lg-4">
                              <label className="mb-3">Designation</label>
                              <select
                                className="form-select"
                                name="designationName"
                                value={nameFields.designationName}
                                onChange={handleNameFieldChange}
                              >
                                <option>--- Select Position ---</option>
                                {designations.length > 0 ? (
                                  designations.map((designation) => (
                                    <option
                                      key={designation._id}
                                      value={designation.name}
                                    >
                                      {designation.name}
                                    </option>
                                  ))
                                ) : (
                                  <option value="No Designation Available">
                                    No Designation Available
                                  </option>
                                )}
                                {/* <option value="Manager">Manager</option>
                                <option value="Team Leader">Team Leader</option>
                                <option option="Web Developer">
                                  Web Developer
                                </option>
                                <option value="Senior Web Developer">
                                  Senior Web Developer
                                </option>
                                <option value="Web Designer">
                                  Web Designer
                                </option>
                                <option value="Senior Web Designer">
                                  Senior Web Designer
                                </option>
                                <option value="SEO Executive">
                                  SEO Executive
                                </option>
                                <option value="Senior SEO Executive">
                                  Senior SEO Executive
                                </option>
                                <option value="Content Writer">
                                  Content Writer
                                </option>
                                <option value="Senior Content">
                                  Senior Content Writer
                                </option>
                                <option value="Video Editor">
                                  Video Editor
                                </option>
                                <option value="Senior Video Editor">
                                  Senior Video Editor
                                </option> */}
                              </select>
                            </div>
                            <div className="col-lg-4 mt-4">
                              <label className="mb-3">Team</label>
                              <select
                                className="form-select"
                                name="teamName"
                                value={nameFields.teamName}
                                onChange={handleNameFieldChange}
                              >
                                <option defaultValue="">
                                  --- Select Team ---
                                </option>
                                {teams.length > 0 ? (
                                  teams.map((team) => (
                                    <option key={team._id} value={team.name}>
                                      {team.name}
                                    </option>
                                  ))
                                ) : (
                                  <option value="No Team Available">
                                    No Team Available
                                  </option>
                                )}
                              </select>
                            </div>

                            <div className="col-lg-4 mt-4">
                              <label className="mb-3">Date of Joining</label>
                              <input
                                type="date"
                                className="form-control"
                                name="doj"
                                value={values.doj}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="col-lg-4 mt-4">
                              <label className="mb-3">Employee ID</label>
                              <input
                                type="text"
                                className="form-control"
                                name="employeeID"
                                value={values.employeeID}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="col-lg-4 mt-4">
                              <label htmlFor="" className="mb-3">
                                Password
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                placeholder="Enter Employee ID"
                                name="password"
                                value={values.password}
                                onChange={handleInputChange}
                                required
                              />
                            </div>

                            <div className="col-lg-4 mt-4">
                              <div className="h-100 d-flex align-items-end">
                                <button
                                  className="btn btn-primary"
                                  onClick={generatePassword}
                                >
                                  <i className="bi bi-magic"></i>&nbsp; Generate
                                  Password
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <hr />

                        <div className="col-lg-12 mb-4">
                          <h5 className="mb-4 mt-4">Edit Personal Details</h5>

                          <div className="form-group row">
                            <div className="col-lg-4">
                              <label className="mb-3">Phone</label>
                              <input
                                type="tel"
                                className="form-control"
                                name="phone"
                                value={values.phone}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-lg-4">
                              <label className="mb-3">Email</label>
                              <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-lg-4">
                              <label className="mb-3">Birthday</label>
                              <input
                                type="date"
                                className="form-control"
                                name="dob"
                                value={values.dob}
                                onChange={handleInputChange}
                              />
                            </div>

                            <div className="col-lg-12 mt-4">
                              <label className="mb-3">Address</label>
                              <textarea
                                className="form-control"
                                id=""
                                cols="30"
                                rows="3"
                                name="address"
                                value={values.address}
                                onChange={handleInputChange}
                              ></textarea>
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="col-lg-12 mb-4">
                          <h5 className="mb-4 mt-4">Edit Bank Information</h5>

                          <div className="form-group row">
                            <div className="col-lg-4">
                              <label className="mb-3">Bank Name</label>
                              <input
                                type="text"
                                className="form-control"
                                name="bankName"
                                value={values.bankName}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-lg-4">
                              <label className="mb-3">Bank Account No.</label>
                              <input
                                type="text"
                                className="form-control"
                                name="accNo"
                                value={values.accNo}
                                onChange={handleInputChange}
                              />
                            </div>
                            <div className="col-lg-4">
                              <label className="mb-3">IFSC Code</label>
                              <input
                                type="text"
                                className="form-control"
                                name="ifsc"
                                value={values.ifsc}
                                onChange={handleInputChange}
                              />
                            </div>
                          </div>
                        </div>
                        <hr />
                        <div className="col-lg-12 mb-4">
                          <h5 className="mb-4 mt-4">Edit Shift</h5>

                          <div className="form-group row">
                            <div className="col-lg-4">
                              <select
                                className="form-select"
                                name="shift"
                                value={nameFields.shiftName}
                                onChange={handleNameFieldChange}
                                required
                              >
                                <option>--- Select Shift ---</option>
                                {shifts.map((shift) => (
                                  <option key={shift._id} value={shift.name}>
                                    {shift.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Close
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      data-bs-dismiss="modal"
                      onClick={handleUpdateMember}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>
      </main>
    </>
  );
}

export default AllEmployee;