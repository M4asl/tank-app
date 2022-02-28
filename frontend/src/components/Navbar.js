import React, { useEffect } from "react";
import styled from "styled-components";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { RiFileList2Line, RiLogoutBoxRLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions/authActions";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const Navbar = () => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.login);

  const handleLogout = () => {
    dispatch(logout());
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <NavContainer>
      <Link to="/">
        <h3>TankApp</h3>
      </Link>
      {loading && <p>Loading...</p>}
      {userInfo && (
        <List>
          <ListItem>
            <Link to="/tanks/new">
              <AiOutlinePlusCircle />
            </Link>
          </ListItem>
          <ListItem>
            <Link to={`/tanks/by/${userInfo._id}`}>
              <RiFileList2Line />
            </Link>
          </ListItem>
          <ListItem onClick={handleLogout}>
            <RiLogoutBoxRLine />
          </ListItem>
        </List>
      )}
    </NavContainer>
  );
};

export default Navbar;

const NavContainer = styled.nav`
  margin: 10px;
  font-size: 2rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: ${({ theme }) => theme.text.secondary};
  a {
    color: ${({ theme }) => theme.text.secondary};
  }
`;

const List = styled.ul`
  display: flex;
`;

const ListItem = styled.li`
  font-size: 3rem;
  padding: 0px 5px;
  margin: 0px 10px;
`;
