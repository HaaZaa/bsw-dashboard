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

const Profile = () => {
  return (
    <>
      <Header />

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
                {/* <div className="d-flex justify-content-between">
                  <Button
                    className="mr-4"
                    color="info"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Connect
                  </Button>
                  <Button
                    className="float-right"
                    color="default"
                    href="#pablo"
                    onClick={(e) => e.preventDefault()}
                    size="sm"
                  >
                    Message
                  </Button>
                </div> */}
              </CardHeader>
              <CardBody>
                <AvForm>
                  <h6 className="heading-small text-muted mb-4">
                    TAX and Delivery Charges
                  </h6>

                  <div className="pl-lg-4">
                    <Col lg="8">
                      <label className="form-control-label">
                        TAX on orders
                      </label>
                      <AvField
                        name="tax"
                        type="number"
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
                      />
                    </Col>

                    <Col lg="8">
                      <label className="form-control-label">
                        Delivery Charges on orders
                      </label>
                      <AvField
                        name="delivery"
                        type="number"
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
                    <Button className="btn btn-success " types="submit">
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
                    <Button className="btn btn-success" type="submit">
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
                        type="text"
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
                      <Button className="btn btn-success" type="submit">
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
