import React, { useState } from 'react'
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { adminToken, apiUrl } from '../../common/http';

const Create = () => {
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
 const saveCategory = async (data) => {
  try {
    setDisable(true);

    const response = await fetch(`${apiUrl}/categories`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': `Bearer ${adminToken()}`
      },
      body: JSON.stringify(data)
    });

    const result = await response.json();

    console.log("HTTP Status:", response.status);
    console.log("API Result:", result);

    setDisable(false);

    if (response.ok && Number(result.status) === 201) {
      toast.success("Category created successfully");
      navigate("/admin/categories");
    } else {
      toast.error("Something went wrong");
    }

  } catch (error) {
    setDisable(false);
    console.error(error);
    toast.error("Server error");
  }
};
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="d-flex justify-content-between mt-5 pb-3"> <h4 className="h4 pb-0 mb-0"> Categories / Create </h4>
            <Link to="/admin/categories" className='btn btn-primary'>Back</Link>
          </div>
          <div className="col-md-3">
            <Sidebar />
          </div>
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveCategory)}>
              <div className="card shadow">
                <div className="card-body p-4">
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                      {
                      ...register("name", { required: "The Name field is required " })
                      }
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""
                        }`}
                      id="name" placeholder='Name' />
                    {errors.name && (
                      <p className="invalid-feedback">
                        {errors.name.message}
                      </p>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="status"
                      className="form-label"
                    >Status</label>
                    <select
                      {
                      ...register("status", { required: "Please select the status " })
                      }
                      className={`form-control ${errors.status ? "is-invalid" : ""
                        }`}
                      id="status">
                      <option value="">Select a Status</option>
                      <option value="1">Active</option>
                      <option value="0">Block</option>
                    </select>
                    {errors.status && (
                      <p className="invalid-feedback">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <button
                disabled={disable} type="submit" className="btn btn-primary mt-3">Create</button>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Create
