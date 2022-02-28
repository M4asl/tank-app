import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormContainer from "../components/FormContainer.js";
// import Loader from "../components/Layout/Loader";
import { toast } from "react-toastify";
import { tankDetails, updateTank } from "../actions/tankActions.js";

const CreateTank = ({ history, location, match }) => {
  const dispatch = useDispatch();
  const { loading, userInfo, error } = useSelector((state) => state.login);
  const {
    tank,
    loadingTankDetails,
    error: errorTankDetails,
  } = useSelector((state) => state.tankDetails);
  const { success, error: errorTankUpdate } = useSelector(
    (state) => state.tankUpdate
  );

  const [values, setValues] = useState({
    sideNumber: "",
    producer: "",
    model: "",
    currentModification: "",
    quantityAmmunition: 1,
    mileage: 1,
    armorFront: 1,
    armorSide: 1,
    armorBack: 1,
  });

  const [vintage, setVintage] = useState(new Date());
  const [dateInCountry, setDateInCountry] = useState(new Date());

  useEffect(() => {
    dispatch(tankDetails(match.params.tankId));
  }, []);

  useEffect(() => {
    if (success) history.push(`/tanks/by/${userInfo._id}`);
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
    if (errorTankDetails) {
      toast.error(errorTankDetails);
    }
    if (errorTankUpdate) {
      toast.error(errorTankUpdate);
    }
  }, [errorTankDetails, errorTankUpdate, error]);

  useEffect(() => {
    if (tank) {
      setValues({
        sideNumber: tank.sideNumber,
        producer: tank.producer,
        model: tank.model,
        currentModification: tank.currentModification,
        quantityAmmunition: tank.quantityAmmunition,
        mileage: tank.mileage,
        armorFront: tank.armor.armorFront,
        armorSide: tank.armor.armorSide,
        armorBack: tank.armor.armorBack,
      });
    }
  }, [dispatch, tank]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      !values.sideNumber ||
      !values.producer ||
      !values.model ||
      !values.currentModification ||
      !values.quantityAmmunition ||
      !values.mileage ||
      !values.armorFront ||
      !values.armorSide ||
      values.armorBack ||
      !vintage ||
      !dateInCountry
    ) {
      toast.error("All fields are required!");
    }
    if (!userInfo._id) {
      toast.error("You are not logged in.");
    }
    if (
      values.quantityAmmunition < 1 ||
      values.mileage < 1 ||
      values.armorFront < 1 ||
      values.armorSide < 1 ||
      values.armorBack < 1
    ) {
      toast.error("Values must be greather 0");
    }
    dispatch(
      updateTank(
        values.sideNumber,
        values.producer,
        values.model,
        values.currentModification,
        values.quantityAmmunition,
        values.mileage,
        values.armorFront,
        values.armorSide,
        values.armorBack,
        vintage,
        dateInCountry,
        match.params.tankId
      )
    );
  };

  const data = [
    {
      id: 1,
      name: "sideNumber",
      type: "text",
      placeholder: "Side number",
      htmlFor: "side_number_field",
      label: "Side number",
      value: values.sideNumber,
    },
    {
      id: 2,
      name: "producer",
      type: "text",
      placeholder: "Producer",
      htmlFor: "producer_field",
      label: "Producer",
      value: values.producer,
    },
    {
      id: 3,
      name: "model",
      type: "text",
      placeholder: "Model",
      htmlFor: "model_field",
      label: "Model",
      value: values.model,
    },
    {
      id: 4,
      name: "currentModification",
      type: "text",
      placeholder: "Current modification",
      htmlFor: "current_modification_field",
      label: "Current modification",
      value: values.currentModification,
    },
    {
      id: 5,
      name: "quantityAmmunition",
      type: "number",
      placeholder: "Quantity ammunition",
      htmlFor: "quantity_ammunition_field",
      label: "Quantity ammunition",
      value: values.quantityAmmunition,
    },
    {
      id: 6,
      name: "mileage",
      type: "number",
      placeholder: "Mileage",
      htmlFor: "mileage_field",
      label: "Mileage",
      value: values.mileage,
    },
    {
      id: 7,
      name: "armorFront",
      type: "number",
      placeholder: "Armor front",
      htmlFor: "armor_front_field",
      label: "Armor front",
      value: values.armorFront,
    },
    {
      id: 8,
      name: "armorSide",
      type: "number",
      placeholder: "Armor side",
      htmlFor: "armor_side_field",
      label: "Armor side",
      value: values.armorSide,
    },
    {
      id: 9,
      name: "armorBack",
      type: "number",
      placeholder: "Armor back",
      htmlFor: "armor_back_field",
      label: "Armor back",
      value: values.armorBack,
    },
  ];

  return (
    <RegisterWrapper>
      {loadingTankDetails ? (
        <h1 style={{ textAlign: "center" }}>Loading...</h1>
      ) : (
        <FormContainer
          title={"Update tank"}
          data={data}
          values={values}
          setValues={setValues}
          handleSubmit={handleSubmit}
          loading={loading}
          location={location}
          vintage={vintage}
          setVintage={setVintage}
          dateInCountry={dateInCountry}
          setDateInCountry={setDateInCountry}
        />
      )}
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: 50px;
`;

export default CreateTank;
