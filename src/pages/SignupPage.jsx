import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useForm } from "../hooks/useForm";
import { validateSignup } from "../utils/validation";
import Input from "../components/common/input";
import Button from "../components/common/button";
import "./SignupPage.css";

const SignupPage = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const {
    values,
    errors,
    isSubmitting,
    handleChange,
    setMultipleErrors,
    setIsSubmitting,
  } = useForm(
    {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validateSignup
  );

  const onSubmit = async (e) => {
    e.preventDefault();

    // Validate
    const validationErrors = validateSignup(values);
    if (Object.keys(validationErrors).length > 0) {
      setMultipleErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        username: values.username,
        email: values.email,
        password: values.password,
      });

      navigate("/", {
        state: { message: "Registration successful! Welcome to Athlos!" },
      });
    } catch (error) {
      console.error("Registration error:", error);

      // Handle different error scenarios
      if (error.message) {
        setMultipleErrors({ server: error.message });
      } else {
        setMultipleErrors({
          server: "Registration failed. Please try again.",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        <h2 className="signup-title">CREATE ACCOUNT</h2>

        {errors.server && <div className="error-message">{errors.server}</div>}

        <form onSubmit={onSubmit}>
          <Input
            label="Username"
            name="username"
            type="text"
            placeholder="Enter your username"
            value={values.username}
            onChange={handleChange}
            error={errors.username}
          />

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
            placeholder="Create a password"
            value={values.password}
            onChange={handleChange}
            error={errors.password}
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm your password"
            value={values.confirmPassword}
            onChange={handleChange}
            error={errors.confirmPassword}
          />

          <Button type="submit" isLoading={isSubmitting} variant="primary">
            SIGN UP
          </Button>
        </form>

        <div className="signup-footer">
          <p>
            Already have an account?{" "}
            <Link to="/login" className="auth-link">
              Login here
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

export default SignupPage;
