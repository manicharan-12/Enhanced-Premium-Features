import React, { useCallback } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import { useGlobalState } from '../context/GlobalStateContext';

const NavbarContainer = styled.nav`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 15px 30px;
  margin-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 8px 32px rgba(31, 38, 135, 0.1);
`;

const Logo = styled.a`
  font-size: 24px;
  font-weight: bold;
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
  cursor: pointer;

  &:hover {
    color: #4a90e2;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled(Link)`
  color: #333;
  text-decoration: none;
  margin-left: 20px;
  font-weight: 500;
  transition: all 0.3s ease;
  padding: 8px 12px;
  border-radius: 15px;

  &:hover,
  &.active {
    color: #4a90e2;
    background-color: rgba(74, 144, 226, 0.1);
    transform: translateY(-2px);
  }
`;

const Button = styled.button`
  background: #4a90e2;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 30px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-left: 20px;

  &:hover {
    background: #357abd;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(74, 144, 226, 0.4);
  }
`;

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { userType, plan } = useGlobalState();
  const isAuthenticated = Boolean(localStorage.getItem("token"));

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    localStorage.removeItem("plan");
    navigate("/");
  }, [navigate]);

  const handleUpgradeToPremium = useCallback(() => {
    navigate("/premium-plans");
  }, [navigate]);

  const handleLogoClick = useCallback(() => {
    if (isAuthenticated) {
      if (userType === "user") {
        navigate("/user-dashboard");
      } else if (userType === "recruiter") {
        navigate("/recruiter-dashboard");
      }
    } else {
      navigate("/");
    }
  }, [isAuthenticated, userType, navigate]);

  return (
    <NavbarContainer>
      <Logo onClick={handleLogoClick}>JobConnect</Logo>
      <NavLinks>
        {isAuthenticated ? (
          <>
            <NavLink to={userType === "user" ? "/user-dashboard" : "/recruiter-dashboard"} className={location.pathname === (userType === "user" ? "/user-dashboard" : "/recruiter-dashboard") ? "active" : ""}>
              Dashboard
            </NavLink>
              <Button onClick={handleUpgradeToPremium}>
                Upgrade to Premium
              </Button>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        ) : (
          <>
            <NavLink to="/login" className={location.pathname === "/login" ? "active" : ""}>
              Login
            </NavLink>
            <NavLink to="/register" className={location.pathname === "/register" ? "active" : ""}>
              Register
            </NavLink>
          </>
        )}
      </NavLinks>
    </NavbarContainer>
  );
};

export default React.memo(Navbar);