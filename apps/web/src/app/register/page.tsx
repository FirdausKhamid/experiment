import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div>
          <h2 className="auth-title">
            Create an account
          </h2>
          <p className="auth-subtitle">
            Already have an account?{" "}
            <Link
              href="/login"
              className="auth-link"
            >
              Sign in Instead
            </Link>
          </p>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <div className="form-group">
            <div>
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="form-input"
                  placeholder="johndoe"
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
            </div>
             <div>
              <label htmlFor="confirmPassword" className="form-label">
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  required
                  className="form-input"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
