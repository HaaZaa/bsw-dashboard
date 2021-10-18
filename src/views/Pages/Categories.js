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
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Header />
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
                onChange={handleChange}
              >
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
            <Button
              type="submit"
              color="primary"
              //   onClick={
              //     // Work
              //     console.log("haalo")
              //   }
            >
              Submit
            </Button>
            <Button color="secondary" onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Container className="mt--6">
        <Row>
          <Col xl="4">
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Category</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={toggle}
                      size="md"
                    >
                      Add New Category
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
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
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
                            Edit
                          </Button>

                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
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
          {/* </Row>
      <Row className="mt-5"> */}
          {/* <Modal isOpen={subCategory}/>
      <Form>

      </Form> */}
          <Col className="mb-5 mb-xl-0" xl="7">
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
                      onClick={(e) => e.preventDefault()}
                      size="md"
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
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
                            size="sm"
                          >
                            Edit
                          </Button>

                          <Button
                            color="primary"
                            href="#pablo"
                            onClick={(e) => e.preventDefault()}
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
