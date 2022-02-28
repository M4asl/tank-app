import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import FormContainer from "../components/FormContainer.js";
// import Loader from "../components/Layout/Loader";
import { toast } from "react-toastify";
import { createTank } from "../actions/tankActions";

const CreateTank = ({ history, location }) => {
  const dispatch = useDispatch();
  const { userInfo, error } = useSelector((state) => state.login);
  const {
    success,
    error: errorTankCreate,
    loading: loadingTankCreate,
  } = useSelector((state) => state.tankCreate);
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
    if (success) {
      history.push(`/tanks/by/${userInfo._id}`);
    }
  }, [success]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }

    if (errorTankCreate) {
      toast.error(errorTankCreate);
    }
  }, [error, errorTankCreate]);

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
      createTank(
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
        userInfo._id
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
      <FormContainer
        title={"Create tank"}
        data={data}
        values={values}
        setValues={setValues}
        handleSubmit={handleSubmit}
        loading={loadingTankCreate}
        location={location}
        vintage={vintage}
        setVintage={setVintage}
        dateInCountry={dateInCountry}
        setDateInCountry={setDateInCountry}
      />
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled.div`
  width: 100%;
  height: 100vh;
  margin-bottom: 50px;
`;

export default CreateTank;
