import Header from "components/Headers/Header.js";
import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import {
  Button,
  CardHeader,
  Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
  Form,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Categories = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/category`);
    setCategory(result.data);
  };
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    fetchSubCatData();
  }, []);
  const fetchSubCatData = async () => {
    const result = await axios.get(`/category/subcategory`);
    setSubCategory(result.data);
  };
  // Category Modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [inputs, setInputs] = useState({});
  let handleChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  let handleSubmit = (props) => {
    props.preventDefault();
    axios
      .post("/category/create", {
        name: inputs.name,
        parentCategory: inputs.parentCategory,
      })
      .then((response) => {
        fetchData();
        if (response.data.msg === "Category Created Sucessfully") {
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
    toggle();
  };
  // Sub-Category  Modal
  const [scModal, setSCModal] = useState(false);
  const scToggle = () => setSCModal(!scModal);
  const [scInputs, setscInputs] = useState({});
  let handleScChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setscInputs((values) => ({ ...values, [name]: value }));
  };
  let handleScSubmit = (props) => {
    props.preventDefault();
    axios
      .post("/category/subcategory/create", {
        name: scInputs.name,
        parentCategory: scInputs.parentCategory,
      })
      .then((response) => {
        fetchSubCatData();
        if (response.data.msg === "Category Created Sucessfully") {
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
    scToggle();
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      <Modal isOpen={modal}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Add New Category</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              name="name"
              required
              onChange={handleChange}
            ></Input>
            <div className="mt-2">
              <Input
                type="select"
                name="parentCategory"
                id="parentCategory"
                defaultValue={"DEFAULT"}
                onChange={handleChange}
                required
              >
                <option value="DEFAULT" disabled>
                  Choose a Category ...
                </option>
                <option value={10001}>
                  Electronics Components, Power & Connectors
                </option>
                <option value={10002}>Electrical, Automation & Cables</option>
                <option value={10003}>Mechanical Products & Tools</option>
                <option value={10004}>IT, Test & Safety Equipment</option>
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" color="primary">
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      {/* //? SC MODAL */}

      <Modal isOpen={scModal}>
        <Form onSubmit={handleScSubmit}>
          <ModalHeader toggle={scToggle}>Add New Category</ModalHeader>
          <ModalBody>
            <Input
              type="text"
              name="name"
              required
              onChange={handleScChange}
            ></Input>
            <div className="mt-2">
              <Input
                type="select"
                defaultValue={"DEFAULT"}
                name="parentCategory"
                id="parentCategory"
                onChange={handleScChange}
              >
                <option value="DEFAULT" disabled>
                  Choose a Category ...
                </option>
                {category.map((item, index) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" type="submit">
              Submit
            </Button>
            <Button color="secondary" onClick={scToggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>

      <Container className="mt--9">
        <Row>
          <Col xl="4" className="mt-5">
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Category</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={toggle}
                      size="sm"
                    >
                      Add New Category
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center  table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Categories Names</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category.map((item) => {
                    return (
                      <tr>
                        <td scope="row">{item.name}</td>
                        <td>
                          <Button
                            className="btn btn-success"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
                            Edit
                          </Button>

                          <Button
                            className="btn btn-danger"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
                            {/* trash icon  */}
                            {/* <i className="fa-solid fa-trash-can" /> */}
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Card>
          </Col>

          <Col className="mt-5 mb-xl-0" xl="7">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Sub-Categories</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={scToggle}
                      size="sm"
                    >
                      Add New Sub-Category
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sub-Category</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategory.map((item) => {
                    return (
                      <tr>
                        <td scope="row">{item.name}</td>
                        <td scope="row">{item.parentCategory.name}</td>
                        <td>
                          <Button
                            className="btn btn-success"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
                            Edit
                          </Button>

                          <Button
                            className="btn btn-danger"
                            href="#pablo"
                            onClick={() => {
                              axios
                                .delete(
                                  `/category/subcategory/${item._id}/delete`
                                )
                                .then((response) => {
                                  fetchSubCatData();
                                  console.log(response);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                            size="sm"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr></tr>
                </tbody>
              </Table>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Categories;
