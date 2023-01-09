import React, { useState, useEffect, useRef } from 'react';
import PageTitle from '../Components/PageTitle';
import axios from 'axios';
import Swal from 'sweetalert2';
import Cookies from "js-cookie";

const initialValues = {
    profileImage: '',
    name: '',
    designationName: '',
    teamName: '',
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
    shiftName: '',
};
  

const AddMember = () => {
  
  const token = Cookies.get("_goJwt"); 
  
  const [values, setValues] = useState(initialValues);

  const [shifts, setShifts] = useState([]);

  const [teams, setTeams] = useState([]);

  const [designations, setDesignations] = useState([]);

  const [fileURL, setFileURL] = useState('');
  const file = useRef(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  }

  const clearImage = () => {
    setFileURL('');
    file.current.value = null;
  }

  const genertaPassword = (event) => {
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
  }, [token]);

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

  const handleAddMember = async (event) => {
    event.preventDefault();
    const userData = {
      profileImage: values.profileImage,
      name: values.name.trim(),
      designationName: values.designationName,
      teamName: values.teamName,
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
      shiftName: values.shiftName,
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
        .post("/api/user/addMember", userData, {
          headers: {
            Authorization: `Basic ${token}`,
          },
        })
        .then((response) => {
          if (response.status === 201) {
            Swal.fire({
              icon: 'success',
              title: response.data,
            })
            setValues(initialValues);
            setFileURL("");
            file.current.value = null;
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
  };

  return (
    <main id="main" className="main">
      <PageTitle />
      <section className="section">
        <form onSubmit={handleAddMember} encType="multipart/form-data">
          <div className="container">
            <div className="col-lg-12 mb-4">
              <div className="form-group row">
                <div className="col-lg-4">
                  <label htmlFor="" className="mb-3">
                    Upload Photo
                  </label>
                  {fileURL !== "" && (
                    <img
                      id="frame"
                      src={fileURL && URL.createObjectURL(fileURL)}
                      className="img-fluid"
                      alt="Profile"
                    />
                  )}
                  <input
                    className="form-control"
                    type="file"
                    id="formFile"
                    name="profileImage"
                    ref={file}
                    onChange={(event) => {
                      setFileURL(event.target.files[0]);
                    }}
                  />
                  <button className="btn btn-primary mt-3" onClick={clearImage}>
                    Remove Photo
                  </button>
                </div>

                <div className="col-lg-4">
                  <label htmlFor="" className="mb-3">
                    *Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Name"
                    name="name"
                    value={values.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-lg-4">
                  <label htmlFor="" className="mb-3">
                    *Designation
                  </label>
                  <select
                    className="form-select"
                    name="designationName"
                    value={values.designationName}
                    onChange={handleInputChange}
                    required
                  >
                    <option>--- Select Position ---</option>
                    {designations.length > 0 ? (
                      designations.map((designation) => (
                        <option key={designation._id} value={designation.name}>
                          {designation.name}
                        </option>
                      ))
                    ) : (
                      <option value="No Designation Available">
                        No Designation Available
                      </option>
                    )}
                  </select>
                </div>
                <div className="col-lg-4 mt-4">
                  <label htmlFor="" className="mb-3">
                    *Team
                  </label>
                  <select
                    className="form-select"
                    name="teamName"
                    value={values.teamName}
                    onChange={handleInputChange}
                    required
                  >
                    <option defaultValue="">--- Select Team ---</option>
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
                  <label htmlFor="" className="mb-3">
                    *Date of Joining
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="doj"
                    value={values.doj}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-lg-4 mt-4">
                  <label htmlFor="" className="mb-3">
                    *Employee ID
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Employee ID"
                    name="employeeID"
                    value={values.employeeID}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-lg-4 mt-4">
                  <label htmlFor="" className="mb-3">
                    *Password
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
                      onClick={genertaPassword}
                    >
                      <i className="bi bi-magic"></i>&nbsp; Generate Password
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
                  <label htmlFor="" className="mb-3">
                    *Phone
                  </label>
                  <input
                    type="tel"
                    className="form-control"
                    placeholder="Enter Phone No."
                    name="phone"
                    value={values.phone}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-lg-4">
                  <label htmlFor="" className="mb-3">
                    *Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Enter Email Id"
                    name="email"
                    value={values.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="col-lg-4">
                  <label htmlFor="" className="mb-3">
                    *Birthday
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="dob"
                    value={values.dob}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="col-lg-12 mt-4">
                  <label htmlFor="" className="mb-3">
                    *Address
                  </label>
                  <textarea
                    className="form-control"
                    cols="30"
                    rows="3"
                    placeholder="Enter Address"
                    name="address"
                    value={values.address}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
              </div>
            </div>
            <hr />
            <div className="col-lg-12 mb-4">
              <h5 className="mb-4 mt-4">Edit Bank Information</h5>

              <div className="form-group row">
                <div className="col-lg-4">
                  <label htmlFor="" className="mb-3">
                    Bank Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Bank Name"
                    name="bankName"
                    value={values.bankName}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-4">
                  <label htmlFor="" className="mb-3">
                    Bank Account No.
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Bank Account No."
                    name="accNo"
                    value={values.accNo}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="col-lg-4">
                  <label htmlFor="" className="mb-3">
                    IFSC Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Enter IFSC Code"
                    name="ifsc"
                    value={values.ifsc}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <hr />
              <div className="col-lg-12 mb-4">
                <h5 className="mb-4 mt-4">Edit Shift</h5>

                <div className="form-group row">
                  <div className="col-lg-4">
                    <label className="mb-3">*Choose Shift</label>
                    <select
                      className="form-select"
                      name="shiftName"
                      value={values.shiftName}
                      onChange={handleInputChange}
                    >
                      <option>--- Select Shift ---</option>
                      {shifts.length > 0 ? (
                      shifts.map((shift) => (
                        <option key={shift._id} value={shift.name}>
                          {shift.name}
                        </option>
                      ))
                    ) : (
                      <option value="No Shift Available">
                        No Shift Available
                      </option>
                    )}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p className="text-center">
            <button type="submit" className="btn btn-success">
              <i className="bi bi-plus-circle"></i> Add Employee
            </button>
          </p>
        </form>
      </section>
    </main>
  );
}

export default AddMember;