import React from "react";
import Header from "components/Headers/Header.js";
import { useEffect, useState } from "react";
import axios from "../../axios.js";
import {
  Card,
  Container,
  CardBody,
  CardHeader,
  Row,
  Table,
  Badge,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
} from "reactstrap";
const Orders = () => {
  const [order, setOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/order`);
    setOrders(result.data);
  };
  ////////////////////////////////// Invoice Modal ////////////////////////////////
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  let handleSubmit = (props) => {
    props.preventDefault();
    axios
      .get(`/order`, {})
      .then((response) => {
        fetchData();
      })
      .catch((err) => {
        console.log(err);
      });
    toggle();
  };
  return (
    <div>
      <Header />
      <Container className="mt--7" fluid>
        <Modal isOpen={modal}>
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={toggle}>ORDER INFORMATION</ModalHeader>
            <ModalBody>
              <label>User-Name :</label>
              {/* {userId.name} */}
            </ModalBody>
            <ModalFooter>
              <Button
                type="submit"
                size="sm"
                href="#H@aZa"
                className="btn btn-dark"
              >
                Download
              </Button>
              <Button
                type="submit"
                size="sm"
                href="#H@aZa"
                color="secondany"
                onClick={toggle}
              >
                Cancel
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <h3 className="mb-0">Order Details</h3>
              </CardHeader>
              <CardBody>
                <div>
                  <Table className="align-item-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Actions</th>
                        <th scope="col">User-Name</th>
                        <th scope="col">Phone No.</th>
                        <th scope="col">Address</th>
                        <th scope="col">Invoice No.</th>
                        <th scope="col">Grand-Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Set-Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {order.map((item) => {
                        return (
                          <tr>
                            <td>
                              <Button
                                className="btn btn-success"
                                href="#H@za"
                                onClick={toggle}
                                size="sm"
                              >
                                View
                              </Button>
                            </td>
                            <td>{item.userId.name}</td>
                            <td>{item.phoneNo}</td>
                            <td>{item.address}</td>
                            <td>{item.invoiceNo}</td>
                            <td>{item.grandTotal}</td>
                            <td>
                              <Badge color="" className="badge-dot mr-4">
                                <i className="bg-warning" />
                                pending
                              </Badge>
                            </td>
                            <td className="text-center">
                              <UncontrolledDropdown>
                                <DropdownToggle
                                  className="btn-icon-only text-light"
                                  herf="#pablo"
                                  role="button"
                                  size="sm"
                                  color=""
                                  onClick={(e) => e.preventDefault()}
                                >
                                  <i className="fas fa-ellipsis-v" />
                                </DropdownToggle>
                                <DropdownMenu
                                  className="dropdown-menu-arrow"
                                  right
                                >
                                  <DropdownItem
                                    herf="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    In production
                                  </DropdownItem>
                                  <DropdownItem
                                    herf="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    On its way
                                  </DropdownItem>
                                  <DropdownItem
                                    herf="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    delivered
                                  </DropdownItem>
                                  <DropdownItem
                                    herf="#pablo"
                                    onClick={(e) => e.preventDefault()}
                                  >
                                    pending
                                  </DropdownItem>
                                </DropdownMenu>
                              </UncontrolledDropdown>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Orders;
