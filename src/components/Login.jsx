import { useForm } from "react-hook-form";
import Layout from './common/Layout'
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiUrl } from "./common/http";
import { useContext } from "react";
import { AuthContext } from "./context/Auth";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const {login} = useContext(AuthContext)

  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await fetch(`${apiUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();
   

      // ✅ Check actual HTTP response status
      if (response.ok) {
        const userInfo = {
          token: result.token,
          id: result.id,
          name: result.name,
        };

        login(userInfo);

        toast.success("Login successful");
        login(userInfo);
        
        navigate("/account");
      } else {
        toast.error(result.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <Layout>
      <div className="container d-flex justify-content-center py-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="card shadow border-0 login">
            <div className="card-body p-4">
              <h3 className="border-bottom pb-2 mb-3">Login</h3>
              <div className="mb-3">
                <label className="form-label">Enter the Email</label>
                <input
                  {...register("email", {
                    required: "The email field is required",
                    pattern: {
                      value:
                        /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="text"
                  className={`form-control ${errors.email ? "is-invalid" : ""
                    }`}
                  placeholder="Email"
                />
                {errors.email && (
                  <p className="invalid-feedback">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label">
                  Enter the Password
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                  })}
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""
                    }`}
                  placeholder="Password"
                />
                {errors.password && (
                  <p className="invalid-feedback">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <button type="submit" className="btn btn-secondary w-100">
                Login
              </button>
              <div className="d-flex justify-content-center pt-4 pb-2">
                Don't have an account? &nbsp; <Link to="/register">Register</Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  )
}

export default Login
