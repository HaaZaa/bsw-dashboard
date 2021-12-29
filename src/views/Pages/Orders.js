import React from "react";
import Header from "components/Headers/Header.js";
import Pagination from "components/Pagination/Pagination";
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
  Col,
  Label,
  CardFooter,
} from "reactstrap";
const Orders = () => {
  const [order, setOrder] = useState([]);
  const [selected, setSelected] = useState();
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/order`);

    setOrder(result.data);
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
        <Modal
          isOpen={modal}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={toggle}>ORDER INFORMATION</ModalHeader>
            <ModalBody>
              <Row>
                <Col>
                  <h1 className="text-left text-danger">BSW-Engineering</h1>
                </Col>
                <Col>
                  <h3 className="text-right">{selected?.address}</h3>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col>
                  <h1 className="text-left">
                    Invoice No.{selected?.invoiceNo}
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr className="my-3" />
                  <h4 className="text-left">{selected?.name}</h4>
                  <h4 className="text-left">{selected?.email}</h4>
                  <h4 className="text-left">{selected?.address}</h4>
                  <h4 className="text-left">{selected?.phoneNo}</h4>
                </Col>
              </Row>

              <Table>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Unit-Cost</th>
                  <th scope="col">Quantity</th>
                  <th scope="col">Total</th>
                </tr>

                <tbody>
                  {/* {order?.orders?.cartId?.product?.map((item) => {
                    return (
                      <tr>
                        <td> {item?.price}</td>
                      </tr>
                    );
                  })} */}
                </tbody>
              </Table>
              <Row className="mt-5">
                <Col>
                  <h3 className="text-left ml-9">SubTotal:</h3>
                </Col>
                <Col>
                  <h3 className="text-right mr-9">${selected?.goodsTotal}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className="text-left ml-9">GST:</h3>
                </Col>
                <Col>
                  <h3 className="text-right mr-9">${selected?.tax}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className="text-left ml-9">Delivery Charges:</h3>
                </Col>
                <Col>
                  <h3 className="text-right mr-9">
                    ${selected?.deliveryCharges}
                  </h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className="text-left ml-9">Grand Total:</h3>
                </Col>
                <Col>
                  <h3 className="text-right mr-9">${selected?.grandTotal}</h3>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                size="sm"
                href="#H@aZa"
                className="btn btn-dark"
                onClick={() => {
                  axios
                    .get(`/order/invoice/${selected.cartId.orderId}`)
                    .then((response) => {
                      fetchData();
                      console.log(response);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
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
                      {order?.orders?.map((item) => {
                        return (
                          <tr>
                            <td>
                              <Button
                                className="btn btn-success"
                                href="#H@za"
                                onClick={() => {
                                  toggle();
                                  setSelected(item);
                                }}
                                size="sm"
                              >
                                View
                              </Button>
                            </td>
                            <td>{item?.userId?.name}</td>
                            <td>{item?.phoneNo}</td>
                            <td>{item?.address}</td>
                            <td>{item?.invoiceNo}</td>
                            <td>{item?.grandTotal}</td>
                            <td>{item?.status}</td>
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
                                    herf="#H@za"
                                    onClick={(e) => e.preventDefault()}
                                    defaultValue={0}
                                  >
                                    In production
                                  </DropdownItem>
                                  <DropdownItem
                                    herf="#H@za"
                                    onClick={(e) => e.preventDefault()}
                                    defaultValue={1}
                                  >
                                    On its way
                                  </DropdownItem>
                                  <DropdownItem
                                    herf="#H@za"
                                    onClick={(e) => e.preventDefault()}
                                    defaultValue={2}
                                  >
                                    delivered
                                  </DropdownItem>
                                  <DropdownItem
                                    herf="#H@za"
                                    onClick={(e) => e.preventDefault()}
                                    defaultValue={3}
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
              <CardFooter>
                <Pagination />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Orders;
