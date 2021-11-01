import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import {
  Button,
  Card,
  CardHeader,
  Table,
  Row,
  Container,
  CardBody,
  Modal,
  Form,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/product`);
    setProducts(result.data);
  };
  // Add Product MODAL
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
      .post("/products/create", {
        Pname: inputs.Pname,
        Pdescription: inputs.Pdescription,
        Pprize: inputs.Pprize,
        CategoryID: inputs.CategoryID,
        Pstock: inputs.Pstock,
        Pimage: inputs.Pimage,
      })
      .then((response) => {
        fetchData();
        if (response.data.msg === "Product Added Succussfully") {
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
  return (
    <div>
      <Header />
      <Modal isOpen={modal}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Add New Product</ModalHeader>
          <ModalBody>
            <Input
              name="Pname"
              type="text"
              placeholder="Enter Product Name"
              onChange={handleChange}
              required
            ></Input>
            <Input
              name="Pdescription"
              type="textarea"
              placeholder="Enter Product Description"
              onChange={handleChange}
              className="mt-2"
              required
            ></Input>
            <Input
              name="Pprize"
              type="number"
              placeholder="Enter Product Prize"
              onChange={handleChange}
              className="mt-2"
              required
            ></Input>
            <Input
              name="CategoryID"
              type="text"
              placeholder="Enter Product's Category ID"
              onChange={handleChange}
              className="mt-2"
              required
            ></Input>
            <Input
              name="Pstock"
              type="number"
              placeholder="Enter Amount of Product in stock "
              onChange={handleChange}
              className="mt-2"
              required
            ></Input>
            <Input
              name="Pimage"
              type="file"
              placeholder="Upload product Image"
              onChange={handleChange}
              className="mt-2"
              required
            ></Input>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" type="submit">
              Submit
            </Button>
            <Button onClick={toggle} color="secondary">
              Cancel
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            {console.log("products:", products)}
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mt-0">Products details</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      herf="pablo"
                      size="sm"
                      onClick={toggle}
                    >
                      ADD PRODUCT
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Table body */}
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">product Image</th>
                      <th scope="col">product name</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Price</th>
                      <th scope="col">Featured</th>
                    </tr>
                  </thead>
                  <tbody className="align-item-center">
                    {products.map((item) => {
                      return (
                        <tr>
                          <td>
                            <img
                              src={`http://localhost:5000/${item.image}`}
                              height={"30vh"}
                              width={"20%"}
                            />
                          </td>
                          <td>{item.name}</td>
                          <td>{item.categoryId.name}</td>
                          <td>{item.stock}</td>
                          <td>{item.price}</td>
                          <td>
                            <Input type="checkbox" />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Product;
