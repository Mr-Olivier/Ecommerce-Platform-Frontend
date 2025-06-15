import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface AuthWrapperProps {
  children: ReactNode;
  title: string;
  subtitle: string;
  alternativeText: string;
  alternativeLink: string;
  alternativeLinkText: string;
}

const AuthWrapper = ({
  children,
  title,
  subtitle,
  alternativeText,
  alternativeLink,
  alternativeLinkText,
}: AuthWrapperProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link to="/" className="text-3xl font-bold text-primary-600">
            EStore
          </Link>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
        </div>
        {children}
        <p className="mt-4 text-center text-sm text-gray-600">
          {alternativeText}{" "}
          <Link
            to={alternativeLink}
            className="font-medium text-primary-600 hover:text-primary-500"
          >
            {alternativeLinkText}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AuthWrapper;
