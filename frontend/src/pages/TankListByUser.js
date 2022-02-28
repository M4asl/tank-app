import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listTanksByUser } from "../actions/tankActions";
import styled from "styled-components";
import TankDetails from "../components/TankDetails";
import { getUserDetails } from "../actions/authActions";
import { FaUserAlt } from "react-icons/fa";
import { IoMdRadioButtonOn } from "react-icons/io";

const TankListByUser = ({ history, match }) => {
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.login);
  const { tanks, loading, error } = useSelector(
    (state) => state.tankListByUser
  );
  const {
    user: currentUserInfo,
    loading: loadingCurrentUser,
    error: errorCurrentUser,
  } = useSelector((state) => state.currentUser);

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listTanksByUser(userInfo._id));
    dispatch(getUserDetails(match.params.userId));
  }, []);

  return (
    <ScreenWrapper>
      {(loading || loadingCurrentUser) && (
        <h1 style={{ textAlign: "center" }}>Loader..</h1>
      )}
      {!loadingCurrentUser && !errorCurrentUser && currentUserInfo && (
        <PresidentCardWrapper>
          <AvatarContainer>
            <FaUserAlt />
          </AvatarContainer>

          <FirstName>First name: {currentUserInfo.firstName}</FirstName>
          <LastName>Last name: {currentUserInfo.lastName}</LastName>
          <EmailText>Email: {currentUserInfo.email}</EmailText>
          {currentUserInfo.atomicButton ? (
            <AtomicButton>
              Atomic button:
              <IoMdRadioButtonOn />
            </AtomicButton>
          ) : (
            <AtomicButton>Atomic button: false</AtomicButton>
          )}
        </PresidentCardWrapper>
      )}
      <TankDetailsWrapper>
        {!error &&
          !loading &&
          tanks.map((tank) => <TankDetails key={tank._id} tank={tank} />)}
        {tanks.length === 0 && !loading && <h1>No tanks yet..</h1>}
      </TankDetailsWrapper>
    </ScreenWrapper>
  );
};

export default TankListByUser;

const ScreenWrapper = styled.div`
  max-width: 100%;
  margin: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media only ${({ theme }) => theme.breakpoints.sm} {
    margin: 30px 5px;
  }
`;

const TankDetailsWrapper = styled.div`
  max-width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;

const PresidentCardWrapper = styled.div`
  width: 300px;
  margin: 0 auto;
  line-height: 1.5;
  text-align: center;
`;

const AvatarContainer = styled.div`
  width: 100%;
  svg {
    font-size: 3rem;
  }
`;
const FirstName = styled.h3``;
const LastName = styled.h3``;
const EmailText = styled.h3``;
const AtomicButton = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  color: #e92c2c;
  svg {
    font-size: 2.5rem;
  }
`;
