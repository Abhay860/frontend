import React, { useEffect, useState } from 'react';
import Layout from '../../common/Layout';
import Sidebar from '../../common/Sidebar';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { adminToken, apiUrl } from '../../common/http';
import { toast } from 'react-toastify';

const Edit = () => {

  const [disable, setDisable] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // ✅ Fetch category data
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await fetch(`${apiUrl}/categories/${id}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${adminToken()}`
          },
        });

        const result = await response.json();

        console.log("Fetched Data:", result);

        if (response.ok) {
          reset({
            name: result.data.name,
            status: result.data.status,
          });
        } else {
          toast.error("Failed to load category");
        }

      } 
      catch (error) {
        console.error(error);
        toast.error("Server error");
      } 
      finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id, reset]);

  // ✅ Update category
  const saveCategory = async (data) => {
    try {
      setDisable(true);

      const response = await fetch(`${apiUrl}/categories/${id}`, {
        method: 'PUT', // ✅ correct method
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${adminToken()}`
        },
        body: JSON.stringify(data)
      });

      const result = await response.json();

      console.log("Update Response:", result);

      if (response.ok) {
        toast.success("Category updated successfully");
        navigate('/admin/categories');
      } else {
        toast.error(result.message || "Something went wrong");
      }

    } catch (error) {
      console.error(error);
      toast.error("Server error");
    } finally {
      setDisable(false);
    }
  };

  // ✅ Loading state
  if (loading) {
    return <p className="text-center mt-5">Loading...</p>;
  }

  return (
    <Layout>
      <div className="container">
        <div className="row">

          {/* Header */}
          <div className="d-flex justify-content-between mt-5 pb-3">
            <h4>Edit Category</h4>
            <Link to="/admin/categories" className="btn btn-primary">
              Back
            </Link>
          </div>

          {/* Sidebar */}
          <div className="col-md-3">
            <Sidebar />
          </div>

          {/* Form */}
          <div className="col-md-9">
            <form onSubmit={handleSubmit(saveCategory)}>
              <div className="card shadow">
                <div className="card-body p-4">

                  {/* Name */}
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      {...register("name", { required: "Name is required" })}
                      type="text"
                      className={`form-control ${errors.name ? "is-invalid" : ""}`}
                      placeholder="Enter name"
                    />
                    {errors.name && (
                      <p className="invalid-feedback">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Status */}
                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <select
                      {...register("status", { required: "Status is required" })}
                      className={`form-control ${errors.status ? "is-invalid" : ""}`}
                    >
                      <option value="">Select Status</option>
                      <option value="1">Active</option>
                      <option value="0">Block</option>
                    </select>
                    {errors.status && (
                      <p className="invalid-feedback">{errors.status.message}</p>
                    )}
                  </div>

                </div>
              </div>

              {/* Submit */}
              <button
                disabled={disable}
                type="submit"
                className="btn btn-primary mt-3"
              >
                {disable ? "Updating..." : "Update"}
              </button>
            </form>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default Edit;