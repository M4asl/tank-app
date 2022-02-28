import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import { deleteTank } from "../actions/tankActions";

const TankDetails = ({ tank }) => {
  const dispatch = useDispatch();
  const { userInfo, loading, error } = useSelector((state) => state.login);
  const {
    success,
    loading: loadingDelete,
    error: errorDelete,
  } = useSelector((state) => state.tankDelete);

  useEffect(() => {
    if (success) {
      window.location.reload();
    }
    if (error) {
      toast.error(error);
    }
    if (errorDelete) {
      toast.error(errorDelete);
    }
  }, [success, errorDelete, error, dispatch]);

  const deleteHandler = () => {
    dispatch(deleteTank(tank._id));
  };
  return (
    <CardWrapper>
      <TankHeader>{tank.model}</TankHeader>
      <InfoList>
        <InfoListItem>
          <InfoListItemSpan>Numer boczny:</InfoListItemSpan>
          <InfoListItemText>{tank.sideNumber}</InfoListItemText>
        </InfoListItem>
        <InfoListItem>
          <InfoListItemSpan>Producent:</InfoListItemSpan>
          <InfoListItemText>{tank.producer}</InfoListItemText>
        </InfoListItem>
        <InfoListItem>
          <InfoListItemSpan>Aktualna modyfikajca:</InfoListItemSpan>
          <InfoListItemText>{tank.currentModification}</InfoListItemText>
        </InfoListItem>
        <InfoListItem>
          <InfoListItemSpan>Rocznik:</InfoListItemSpan>
          <InfoListItemText>{tank.vintage}</InfoListItemText>
        </InfoListItem>
        <InfoListItem>
          <InfoListItemSpan>Data wprowadzenia do kraju:</InfoListItemSpan>
          <InfoListItemText>
            {tank.dateInCountry.substring(0, 10)}
          </InfoListItemText>
        </InfoListItem>
        <InfoListItem>
          <InfoListItemSpan>Aktualny przebieg:</InfoListItemSpan>
          <InfoListItemText>{tank.mileage}</InfoListItemText>
        </InfoListItem>
        <InfoListItem>
          <InfoListItemSpan>Ilosc amunicji:</InfoListItemSpan>
          <InfoListItemText>{tank.quantityAmmunition}</InfoListItemText>
        </InfoListItem>
        <InfoListItem>
          <InfoListItemSpan>Grubosc pancerza:</InfoListItemSpan>
          <InfoListItemText>Przod: {tank.armor.armorFront}</InfoListItemText>
          <InfoListItemText>Bok: {tank.armor.armorSide}</InfoListItemText>
          <InfoListItemText>Tyl: {tank.armor.armorBack}</InfoListItemText>
        </InfoListItem>
        <InfoListItem>
          <InfoListItemSpan>Data stworzenia:</InfoListItemSpan>
          <InfoListItemText>{tank.createdAt.substring(0, 10)}</InfoListItemText>
        </InfoListItem>
        <InfoListItem>
          <InfoListItemSpan>Data aktualizacji:</InfoListItemSpan>
          <InfoListItemText>{tank.updatedAt.substring(0, 10)}</InfoListItemText>
        </InfoListItem>
      </InfoList>
      {!loading && userInfo._id === tank.user && (
        <ButtonContainer>
          <ButtonUpdate>
            <Link to={`/tanks/update/${tank._id}`}>UPDATE</Link>
          </ButtonUpdate>
          <ButtonDelete onClick={deleteHandler}>
            {loadingDelete ? "Loading.." : "DELETE"}
          </ButtonDelete>
        </ButtonContainer>
      )}
    </CardWrapper>
  );
};

const CardWrapper = styled.div`
  min-width: 300px;
  min-height: 600px;
  padding: 20px;
  margin: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.bg.card};
  border: 1px solid ${({ theme }) => theme.bg.colorBorder};
`;

const TankHeader = styled.h3`
  color: ${({ theme }) => theme.text.secondary};
  text-align: center;
`;

const InfoList = styled.ul`
  height: 500px;
  padding-bottom: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const InfoListItem = styled.li``;

const InfoListItemSpan = styled.span`
  color: ${({ theme }) => theme.text.secondary};
`;

const InfoListItemText = styled.p``;

const ButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;
const ButtonUpdate = styled.button`
  width: 120px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: ${({ theme }) => theme.text.secondary};
  border: 2px solid ${({ theme }) => theme.text.secondary};
  font-weight: 700;
  a {
    color: ${({ theme }) => theme.text.secondary};
  }
`;
const ButtonDelete = styled.button`
  width: 120px;
  height: 35px;
  margin-top: 20px;
  background: transparent;
  color: #e92c2c;
  border: 2px solid #e92c2c;
  font-weight: 700;
`;

export default TankDetails;
