import { useState } from "react";
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";
import { toast } from "react-toastify";
import axios from "../../axios";
import { UpdateStore } from "../../StoreContext";
import { useHistory } from "react-router";

const Login = () => {
  // getting update store function from update store context
  const updateStore = UpdateStore();
  const history = useHistory();

  // states
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  // onSubmit
  const onSubmit = async (e) => {
    e.preventDefault();
    if (!values.email || !values.password) {
      toast.error("Both email and password are required!");
    } else {
      const result = await axios.post(`/user/admin/login`, values);
      if (result.data === "Invalid email or password") {
        toast.error("Invalid email or password");
      } else {
        updateStore({ loggedIn: true, user: result.data });
        toast.success("Logged in Successfully!");
        history.push("/admin/index");
      }
    }
  };

  // handle change function
  const handleChange = (name, value) => {
    setValues((prev) => {
      prev[name] = value;
      return { ...prev };
    });
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardHeader className="bg-transparent pb-1">
            <div className=" text-center">
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
            <div className="text-muted text-center mt-2 ">
              <span>BSW Engineering</span>
            </div>
          </CardHeader>
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small>Sign in with credentials</small>
            </div>
            <Form role="form" onSubmit={onSubmit}>
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Email"
                    type="email"
                    autoComplete="new-email"
                    name="email"
                    value={values.email}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </InputGroup>
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    placeholder="Password"
                    type="password"
                    autoComplete="new-password"
                    name="password"
                    value={values.password}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                  />
                </InputGroup>
              </FormGroup>

              <div className="text-center">
                <Button className="my-4" color="primary" type="submit">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        {/* <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
        </Row> */}
      </Col>
    </>
  );
};

export default Login;
