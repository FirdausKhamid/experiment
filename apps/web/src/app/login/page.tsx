import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div>
          <h2 className="auth-title">
            Sign in to your account
          </h2>
          <p className="auth-subtitle">
            Or{" "}
            <Link
              href="/register"
              className="auth-link"
            >
              create a new account
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
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="form-checkbox"
              />
              <label htmlFor="remember-me" className="form-checkbox-label">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="auth-link">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="btn-primary"
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
