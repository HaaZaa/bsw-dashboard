import {
  Button,
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Col,
  CardFooter,
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import { AvForm, AvField } from "availity-reactstrap-validation";
import axios from "../../axios.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
const Profile = () => {
  const [tax, setTax] = useState({});
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/dashboard/gettax`);

    setTax(result.data);
  };
  //handle tax and delivery
  const [input, setInput] = useState({});
  let handleTaxChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setInput((values) => ({ ...values, [name]: value }));
    console.log(
      "🚀 ~ file: AccountSetting.js ~ line 35 ~ handleTaxChange ~ input",
      name
    );
  };
  let handleTaxSubmit = (props) => {
    console.log(
      "🚀 ~ file: AccountSetting.js ~ line 37 ~ handleTaxSubmit ~ props",
      props
    );
    props.preventDefault();
    axios
      .put("/dashboard/settax", {
        tax: input.tax,
        delivery: input.delivery,
      })
      .then((response) => {
        fetchData();
        if (response.data.msg === "Tax info Updated!") {
          toast.success(response.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
          });
        } else {
          toast.warning(response.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <Header />
      <ToastContainer />

      {/* Page content */}
      <Container className="mt--7" fluid>
        <Row>
          <Col className="order-xl-2 mb-5 mb-xl-0" xl="4">
            <Card className="card-profile bg-secondary shadow">
              <CardHeader>
                <div className="text-center">
                  <span>
                    <img
                      width={"25%"}
                      alt="..."
                      src={
                        require("../../assets/img/brand/bsw-logo-small_-removebg-preview.png")
                          .default
                      }
                    />
                  </span>
                </div>
              </CardHeader>
              <CardBody>
                <AvForm onSubmit={handleTaxSubmit}>
                  <h6 className="heading-small text-muted mb-4">
                    TAX and Delivery Charges
                  </h6>

                  <div className="pl-lg-4">
                    <Col lg="8">
                      <label className="form-control-label">
                        TAX on orders ($)
                      </label>
                      <AvField
                        name="tax"
                        type="number"
                        placeholder="TAX"
                        value={tax.tax}
                        onChage={handleTaxChange}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter TAX",
                          },
                          pattern: {
                            value: "^[0-9]+$",
                            errorMessage:
                              "Tax must be composed only with numbers",
                          },

                          maxLength: {
                            value: 2,
                            errorMessage: "Maximum Lenght sholud be 2-Digits",
                          },
                        }}
                      >
                        $
                      </AvField>
                    </Col>

                    <Col lg="8">
                      <label className="form-control-label">
                        Delivery Charges on orders (%)
                      </label>
                      <AvField
                        name="delivery"
                        type="number"
                        placeholder="Delivery Charges"
                        value={tax.delivery}
                        onChage={handleTaxChange}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter Delivery Charges",
                          },
                          pattern: {
                            value: "^[0-9]+$",
                            errorMessage:
                              "Delivery Charges must be composed only with numbers",
                          },

                          maxLength: {
                            value: 2,
                            errorMessage: "Maximum Lenght sholud be 2-Digits",
                          },
                        }}
                      />
                    </Col>
                  </div>
                  <div className="text-right">
                    <Button
                      className="btn btn-success "
                      type="submit"
                      size="sm"
                    >
                      UPDATE
                    </Button>
                  </div>
                </AvForm>
              </CardBody>

              <CardFooter className="text-right"></CardFooter>
            </Card>
          </Col>
          <Col className="order-xl-1" xl="8">
            <Card className="bg-secondary shadow">
              <CardHeader className="bg-white border-0">
                <Row className="align-items-center">
                  <Col xs="8">
                    <h3 className="mb-0">Admin account</h3>
                  </Col>
                </Row>
              </CardHeader>
              <CardBody>
                <AvForm>
                  <h6 className="heading-small text-muted mb-4">
                    User information
                  </h6>
                  <div className="pl-lg-4">
                    <Row>
                      <Col lg="8">
                        <label className="form-control-label">Name</label>
                        <AvField
                          name="name"
                          type="text"
                          placeholder="Enter UserName"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter your name",
                            },
                            pattern: {
                              value: "^[A-Za-z0-9]+$",
                            },

                            minLength: {
                              value: 6,
                              errorMessage:
                                "Your name must be between 6 and 16 characters",
                            },
                            maxLength: {
                              value: 16,
                              errorMessage:
                                "Your name must be between 6 and 16 characters",
                            },
                          }}
                        />
                      </Col>
                      <Col lg="8">
                        <label className="form-control-label">
                          Email Address
                        </label>
                        <AvField
                          name="email"
                          type="email"
                          placeholder="Enter your Email"
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter your E-mail",
                            },
                            pattern: {
                              value: "^[A-Za-z0-9]+$",
                            },

                            maxLength: {
                              value: 2,
                              errorMessage: "Maximum Lenght sholud be 2-Digits",
                            },
                          }}
                        />
                      </Col>
                    </Row>
                  </div>
                  <div className="text-right">
                    <Button className="btn btn-success" type="submit" size="sm">
                      Save Changes
                    </Button>
                  </div>
                </AvForm>
                <hr className="my-4" />
                {/* Change password */}
                <AvForm>
                  <h6 className="heading-small text-muted mb-4">
                    Change Password
                  </h6>

                  <div className="pl-lg-4">
                    <Col lg="8">
                      <label className="form-control-label">
                        Current Password
                      </label>
                      <AvField
                        name="currentpassword"
                        type="password"
                        placeholder="Enter your current password"
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter your current Password",
                          },
                          pattern: {
                            value: "^[A-Za-z0-9]+$",
                            errorMessage:
                              "Delivery Charges must be composed only with numbers",
                          },
                        }}
                      />
                    </Col>
                  </div>

                  <div className="pl-lg-4">
                    <Col lg="8">
                      <label className="form-control-label">New Password</label>
                      <AvField
                        name="newpassword"
                        type="password"
                        placeholder="Enter new password"
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter new password",
                          },
                          pattern: {
                            value: "^[A-Za-z0-9]+$",
                          },
                        }}
                      />
                    </Col>
                  </div>

                  <div className="pl-lg-4">
                    <Col lg="8">
                      <label className="form-control-label">
                        Confirm Password
                      </label>
                      <AvField
                        name="confirmpassword"
                        type="password"
                        placeholder="Confirm new password"
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please confirm your new password",
                          },
                          match: {
                            value: "newpassword",
                            errorMessage:
                              "the password you entered does not match",
                          },
                          pattern: {
                            value: "^[A-Za-z0-9]+$",
                          },
                        }}
                      />
                    </Col>
                    <div className="text-right">
                      <Button
                        className="btn btn-success"
                        type="submit"
                        size="sm"
                      >
                        Update
                      </Button>
                    </div>
                  </div>

                  {/* <hr className="my-4" /> */}
                </AvForm>
              </CardBody>
              <CardFooter></CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
