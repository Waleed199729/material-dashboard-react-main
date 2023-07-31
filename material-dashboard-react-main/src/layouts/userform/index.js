// react-router-dom components
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { addUsers, updateUser } from "Redux/Actions";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import { useNavigate } from "react-router-dom/dist";

function Cover() {
  const editingUser = useSelector((state) => state.users.editingUser);

  const dispatch = useDispatch();

  let initialValues = null;
  if (editingUser) {
    initialValues = {
      id: editingUser.id,
      name: editingUser.name,
      email: editingUser.email,
      password: editingUser.password,
      agreeTerms: editingUser.agreeTerms,
    };
  } else {
    initialValues = {
      id: 0,
      name: "",
      email: "",
      password: "",
      agreeTerms: true,
    };
  }

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    agreeTerms: Yup.boolean().oneOf([true], "You must accept the terms and conditions"),
  });
  const navigate = useNavigate();

  const handleSubmit = (values, { resetForm }) => {
    let newUser = values;
    newUser.id = Date.now(); //Date.now only give us the timeStamp
    debugger;
    console.log(newUser);
    if (editingUser) {
      const updatedRecord = {
        id: editingUser.id,
        name: values.name,
        email: values.email,
        password: values.password,
        agreeTerms: values.agreeTerms,
      };
      dispatch(updateUser(updatedRecord));
    } else {
      dispatch(addUsers(newUser));
    }
    resetForm();
    navigate("/userlist");
    // Handle form submission
  };
  debugger;

  return (
    <CoverLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={3}
          mt={-3}
          p={3}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Enter your email and password to register
          </MDTypography>
        </MDBox>

        <MDBox pt={4} pb={6} px={4}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            enableReinitialize={true}
          >
            {({ isSubmitting }) => (
              <Form>
                <Field
                  name="name"
                  type="text"
                  label="Name"
                  as={MDInput}
                  variant="standard"
                  fullWidth
                />
                <ErrorMessage
                  name="name"
                  component={MDTypography}
                  variant="caption"
                  color="error"
                />

                <Field
                  name="email"
                  type="email"
                  label="Email"
                  as={MDInput}
                  variant="standard"
                  fullWidth
                />
                <ErrorMessage
                  name="email"
                  component={MDTypography}
                  variant="caption"
                  color="error"
                />

                <Field
                  name="password"
                  type="password"
                  label="Password"
                  as={MDInput}
                  variant="standard"
                  fullWidth
                />
                <ErrorMessage
                  name="password"
                  component={MDTypography}
                  variant="caption"
                  color="error"
                />

                <Field name="agreeTerms" type="checkbox" as={Checkbox} />
                <Field
                  name="agreeTerms"
                  component={MDTypography}
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
                >
                  &nbsp;&nbsp;I agree the&nbsp;
                </Field>
                <MDTypography
                  component="a"
                  href="#"
                  variant="button"
                  fontWeight="bold"
                  color="info"
                  textGradient
                >
                  Terms and Conditions
                </MDTypography>
                <ErrorMessage
                  name="agreeTerms"
                  component={MDTypography}
                  variant="caption"
                  color="error"
                />

                <MDButton
                  type="submit"
                  variant="gradient"
                  color="info"
                  fullWidth
                  enable={isSubmitting}
                >
                  Sign In
                </MDButton>
              </Form>
            )}
          </Formik>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;
