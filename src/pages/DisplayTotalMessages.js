import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTotalMessages, getInputsValues } from "../redux";
import { Table, Row, Col, Form, Button } from "react-bootstrap";
import Select from "react-select";
import { DatePickerComp, TableRow, SelectComp } from "../components";

const DisplayTotalMessages = () => {
  const dispatch = useDispatch();
  const { totals, inputs, isLoading } = useSelector(
    (state) => state.messagesReducer
  );

  const [startDate, setStartDate] = useState(new Date("2022/04/01"));
  const [endDate, setEndDate] = useState(new Date());
  const [selectedOptions, setSelectedOptions] = useState({
    startDate: startDate.toLocaleDateString(),
    endDate: endDate.toLocaleDateString(),
  });

  useEffect(() => {
    dispatch(getTotalMessages(selectedOptions));
    dispatch(getInputsValues());
  }, []);

  const inputsLength = Object.keys(inputs).length;

  //return countries data for the select input
  const getCountriesForSelect = async () => {
    return inputs.countries;
  };

  //return users data for the select input
  const getUsersForSelect = async () => {
    return inputs.users;
  };

  //styling for the select inputs
  const style = {
    control: (base) => ({
      ...base,
      border: "1px solid #4F4F4F",
    }),
  };

  //add selected country to selectedOption obj
  const handleCountry = (option) => {
    setSelectedOptions((selectedOptions) => ({
      ...selectedOptions,
      countryId: option.cnt_id,
    }));
  };

  //add selected user to selectedOption obj
  const handleUser = (option) => {
    setSelectedOptions((selectedOptions) => ({
      ...selectedOptions,
      userId: option.id,
    }));
  };

  //add selected start date to selectedOption obj
  const handleStartDate = (date) => {
    setStartDate(date);
    setSelectedOptions((selectedOptions) => ({
      ...selectedOptions,
      startDate: date.toLocaleDateString(),
    }));
  };

  //add selected end date to selectedOption obj
  const handleEndDate = (date) => {
    setEndDate(date);
    setSelectedOptions((selectedOptions) => ({
      ...selectedOptions,
      endDate: date.toLocaleDateString(),
    }));
  };

  const handleCountryTitle = (e) => {
    return e.cnt_title;
  };

  const handleCountryValue = (e) => {
    return e.cnt_id;
  };

  const handleUserTitle = (e) => {
    return e.usr_name;
  };

  const handleUserValue = (e) => {
    return e.id;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getTotalMessages(selectedOptions));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col lg={1}></Col>
          <Col lg={10} className="d-flex align-items-center">
            <DatePickerComp
              label="From"
              selected={startDate}
              handleStartDate={handleStartDate}
            />
            <DatePickerComp
              label="To"
              selected={endDate}
              handleStartDate={handleEndDate}
            />
            <Form.Group className="mb-3 ms-3" style={{ width: "200px" }}>
              <Form.Label>Country</Form.Label>
              {inputsLength > 0 ? (
                <SelectComp
                  style={style}
                  title={handleCountryTitle}
                  value={handleCountryValue}
                  load={getCountriesForSelect}
                  placeHolder="Select Country"
                  change={handleCountry}
                />
              ) : (
                <>
                  <Select styles={style} placeholder={"Please wait.."} />
                </>
              )}
            </Form.Group>
            <Form.Group className="mb-3 ms-4" style={{ width: "200px" }}>
              <Form.Label>User</Form.Label>
              {inputsLength > 0 ? (
                <SelectComp
                  style={style}
                  title={handleUserTitle}
                  value={handleUserValue}
                  load={getUsersForSelect}
                  placeHolder="Select User"
                  change={handleUser}
                />
              ) : (
                <>
                  <Select styles={style} placeholder={"Please wait.."} />
                </>
              )}
            </Form.Group>
            <Button
              variant="outline-primary"
              className="mt-2 ms-5"
              type="submit"
              disabled={isLoading}
            >
              Search
            </Button>
          </Col>
          <Col lg={1}></Col>
        </Row>
      </Form>

      <Row>
        <Col lg={1}></Col>
        <Col lg={10}>
          <Table striped bordered hover>
            <thead className="text-center">
              <tr>
                <th>Date</th>
                <th>Successfully sent</th>
                <th>Failed</th>
              </tr>
            </thead>
            <tbody>
              {totals.length ? (
                <>
                  {totals.map((total) => {
                    return <TableRow {...total} key={total.date} />;
                  })}
                </>
              ) : isLoading ? (
                <TableRow placeHolder="Please Wait..." />
              ) : (
                <TableRow placeHolder="No Data To Display" />
              )}
            </tbody>
          </Table>
        </Col>
        <Col lg={1}></Col>
      </Row>
    </>
  );
};

export default DisplayTotalMessages;
