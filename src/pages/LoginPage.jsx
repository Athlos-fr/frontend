import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import Input from "../components/common/input";
import Button from "../components/common/button";
import "./LoginPage.css";

/**
 * Validate login form data
 */
const validateLogin = (values) => {
  const errors = {};

  if (!values.email || !values.email.trim()) {
    errors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(values.email)) {
    errors.email = "Email is invalid";
  }

  if (!values.password) {
    errors.password = "Password is required";
  }

  return errors;
};

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    setMultipleErrors,
    setIsSubmitting,
  } = useForm(
    {
      email: "",
      password: "",
    },
    validateLogin
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const validationErrors = validateLogin(values);
    if (Object.keys(validationErrors).length > 0) {
      setMultipleErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await login({
        email: values.email,
        password: values.password,
      });

      navigate("/", {
        state: { message: "Login successful! Welcome back to Athlos!" },
      });
    } catch (error) {
      console.error("Login error:", error);

      // Handle different error scenarios
      if (error.message) {
        setMultipleErrors({ server: error.message });
      } else {
        setMultipleErrors({
          server: "Login failed. Please check your credentials.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    // TODO: Implement password reset
    alert("Password reset feature coming soon!");
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">WELCOME BACK</h2>

        {errors.server && <div className="error-message">{errors.server}</div>}

        <form onSubmit={onSubmit}>
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="Enter your email"
            value={values.email}
            onChange={handleChange}
            error={errors.email}
          />

          <Input
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="forgot-password-wrapper">
            <button
              type="button"
              className="forgot-password-link"
              onClick={handleForgotPassword}
            >
              Forgot Password?
            </button>
          </div>

          <Button type="submit" isLoading={isSubmitting} variant="primary">
            LOGIN
          </Button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/signup" className="auth-link">
              Sign up here
            </Link>
          </p>
          <p>
            <Link to="/" className="back-link">
              ← Back to Home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
