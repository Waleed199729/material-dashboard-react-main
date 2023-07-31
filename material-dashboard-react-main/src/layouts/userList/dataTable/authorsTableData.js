import React, { useState } from "react";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
import MDSnackbar from "components/MDSnackbar";
import { Grid } from "@mui/material";
import MDButton from "components/MDButton";
import PropTypes from "prop-types";

// Images
import team2 from "assets/images/team-5.jpg";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteUser, userToBeUpdated } from "../../../Redux/Actions";

export default function data() {
  const users = useSelector((state) => state.users.users);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleDelete = (id) => {
    dispatch(deleteUser(id));
  };

  const handleEdit = (item) => {
    dispatch(userToBeUpdated(item)); //dispatching with action
    navigate("/userform"); //after dispatching navigate to userfrom
  };

  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ title, description }) => (
    <MDBox lineHeight={1} textAlign="left">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {title}
      </MDTypography>
      <MDTypography variant="caption">{description}</MDTypography>
    </MDBox>
  );
  Job.propTypes = {
    //defining the job proptype
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  };

  Author.propTypes = {
    //defining the author proptype
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  };

  return {
    columns: [
      { Header: "Users-Profile", accessor: "author", width: "45%", align: "left" },
      { Header: "Name", accessor: "function", align: "left" },
      { Header: "Email", accessor: "status", align: "center" },
      { Header: "Password", accessor: "employed", align: "center" },
      { Header: "action", accessor: "action", align: "center" },
    ],

    rows: users.map((item) => ({
      author: <Author image={team2} name={item.name} email={item.email} />,
      function: <Job title={item.name} />,
      status: (
        <MDBox ml={-1}>
          <MDBadge badgeContent={item.email} color="success" variant="gradient" size="sm" />
        </MDBox>
      ),
      employed: (
        <MDTypography component="a" href="#" variant="caption" color="text" fontWeight="medium">
          {item.password}
        </MDTypography>
      ),
      action: (
        <>
          <MDTypography
            component="button"
            variant="caption"
            onClick={() => handleEdit(item)}
            color="text"
            fontWeight="medium"
          >
            Edit
          </MDTypography>
          <br />
          <MDTypography
            component="button"
            variant="caption"
            onClick={() => handleDelete(item.id)}
            color="text"
            fontWeight="medium"
            className="btn btn-danger"
          >
            Delete
          </MDTypography>
        </>
      ),
    })),
  };
}
