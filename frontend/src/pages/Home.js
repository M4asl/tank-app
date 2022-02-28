import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { listTanks } from "../actions/tankActions";
import styled from "styled-components";
import TankDetails from "../components/TankDetails";
import { toast } from "react-toastify";

const Home = ({ history }) => {
  const { userInfo, error: errorUserInfo } = useSelector(
    (state) => state.login
  );
  const { tanks, loading, error } = useSelector((state) => state.tankList);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
    dispatch(listTanks());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (errorUserInfo) {
      toast.error(errorUserInfo);
    }
  }, [error, errorUserInfo]);

  return (
    <HomeWrapper>
      {loading && <h1>Loader..</h1>}
      {!error &&
        !loading &&
        tanks.map((tank) => <TankDetails key={tank._id} tank={tank} />)}
    </HomeWrapper>
  );
};

export default Home;

const HomeWrapper = styled.div`
  max-width: 100%;
  margin: 50px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`;
