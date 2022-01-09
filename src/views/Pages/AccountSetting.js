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
import { Store } from "StoreContext.js";
import { useState, useEffect } from "react";
const Profile = () => {
  const store = new Store();

  useEffect(() => {
    fetchData();
  }, []);
  const [input, setInput] = useState({});

  const fetchData = async () => {
    const result = await axios.get(`/dashboard/gettax`);

    setInput((prev) => {
      prev.tax = result.data.tax;
      prev.delivery = result.data.delivery;
      return { ...prev };
    });
  };
  //handle tax and delivery
  let handleTaxChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;

    setInput((values) => ({ ...values, [name]: value }));
  };
  let handleTaxSubmit = (props) => {
    props.preventDefault();
    axios
      .post("/dashboard/settax", {
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
  //  handleChange User name Email
  const [userData, setUserData] = useState(store.user);
  let handleUserChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;

    setUserData((values) => ({ ...values, [name]: value }));
  };
  let handleUserSubmit = (props) => {
    props.preventDefault();
    axios
      .put(`/user/update/${store.user._id}`, {
        name: userData.name,
        email: userData.email,
      })
      .then((response) => {
        fetchData();
        store.user.name = userData.name;
        store.user.email = userData.email;
        if (response.data.msg === "User updated Sucessfully!") {
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
  // user password update
  const [password, setPassword] = useState({});
  let handlePassChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setPassword((values) => ({ ...values, [name]: value }));
  };
  let handlePassSubmit = (props) => {
    props.preventDefault();
    const data = {
      oldPass: password.currentpassword,
      newPass: password.newpassword,
      newPassConfirm: password.newpassword,
    };
    axios.put(`/user/update/password/${store.user._id}`, data).then((res) => {
      if (res.data.err) {
        toast.error(res.data.err);
      } else {
        toast.success(res.data.msg);
      }
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
                        value={input.tax}
                        onChange={handleTaxChange}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter TAX",
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
                        value={input.delivery}
                        onChange={handleTaxChange}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter Delivery Charges",
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
                      disabled={!input.tax || !input.delivery}
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
              <CardBody onSubmit={handleUserSubmit}>
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
                          value={store.user.name}
                          onChange={handleUserChange}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter your name",
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
                          value={store.user.email}
                          onChange={handleUserChange}
                          validate={{
                            required: {
                              value: true,
                              errorMessage: "Please enter your E-mail",
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
                <AvForm onSubmit={handlePassSubmit}>
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
                        onChange={handlePassChange}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter your current Password",
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
                        onChange={handlePassChange}
                        validate={{
                          required: {
                            value: true,
                            errorMessage: "Please enter new password",
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
                        onChange={handlePassChange}
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
