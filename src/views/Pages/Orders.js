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

  const onPageNext = () => {
    axios.get(`/orderr?page=${order?.next_page}`).then((res) => {
      setOrder(res.data);
    });
  };
  const onPagePrevious = () => {
    axios.get(`/orderr?page=${order?.previous_page}`).then((res) => {
      setOrder(res.data);
    });
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
                  {selected?.cartId?.product?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.productId?.name}</td>
                        <td>${item?.productId?.price}</td>
                        <td>{item?.quatity}</td>
                        <td>{item?.productId?.price * item?.quatity}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <Row className="mt-5">
                <Col>
                  <h3 className="text-left">SubTotal:</h3>
                </Col>
                <Col>
                  <h3 className="text-right ">${selected?.goodsTotal}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className="text-left ">GST:</h3>
                </Col>
                <Col>
                  <h3 className="text-right ">${selected?.tax}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className="text-left ">Delivery Charges:</h3>
                </Col>
                <Col>
                  <h3 className="text-right ">${selected?.deliveryCharges}</h3>
                </Col>
              </Row>
              <Row>
                <Col>
                  <h3 className="text-left ">Grand Total:</h3>
                </Col>
                <Col>
                  <h3 className="text-right ">${selected?.grandTotal}</h3>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <div>
                <a
                  href={`https://bswengineering.com/api/order/invoice/${selected?._id}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  Download
                </a>
              </div>

              <Button
                type="submit"
                size="sm"
                href="#H@aZa"
                color="secondary"
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

                            <td>{item?.name}</td>
                            <td>{item?.phoneNo}</td>
                            <td>
                              {item?.address.substring(0, 25)}
                              {item?.address.length > 25 && "..."}
                            </td>
                            <td>{item?.invoiceNo}</td>
                            <td>${item?.grandTotal}</td>
                            {item.status === 0 ? (
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-primary" />
                                  pending
                                </Badge>
                              </td>
                            ) : item.status === 1 ? (
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-info" />
                                  Processing
                                </Badge>
                              </td>
                            ) : item.status === 2 ? (
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-warning" />
                                  On its way
                                </Badge>
                              </td>
                            ) : item.status === 3 ? (
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-success" />
                                  Delivered
                                </Badge>
                              </td>
                            ) : item.status === 4 ? (
                              <td>
                                <Badge color="" className="badge-dot mr-4">
                                  <i className="bg-danger" />
                                  Cancel Order
                                </Badge>
                              </td>
                            ) : null}
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
                                    onClick={() =>
                                      axios
                                        .put(
                                          `/order/status/${item._id}?status=1`
                                        )
                                        .then((response) => {
                                          fetchData();
                                          console.log(response);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        })
                                    }
                                  >
                                    Processing
                                  </DropdownItem>
                                  <DropdownItem
                                    herf="#H@za"
                                    onClick={() =>
                                      axios
                                        .put(
                                          `/order/status/${item._id}?status=2`
                                        )
                                        .then((response) => {
                                          fetchData();
                                          console.log(response);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        })
                                    }
                                  >
                                    On its way
                                  </DropdownItem>
                                  <DropdownItem
                                    herf="#H@za"
                                    onClick={() =>
                                      axios
                                        .put(
                                          `/order/status/${item._id}?status=3`
                                        )
                                        .then((response) => {
                                          fetchData();
                                          console.log(response);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        })
                                    }
                                  >
                                    Delivered
                                  </DropdownItem>
                                  <DropdownItem
                                    herf="#H@za"
                                    onClick={() =>
                                      axios
                                        .put(
                                          `/order/status/${item._id}?status=4`
                                        )
                                        .then((response) => {
                                          fetchData();
                                          console.log(response);
                                        })
                                        .catch((err) => {
                                          console.log(err);
                                        })
                                    }
                                  >
                                    Cancel Order
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
                <Pagination
                  previous_page={order?.previous_page}
                  current_page={order?.current_page}
                  next_page={order?.next_page}
                  onPageNext={onPageNext}
                  onPagePrevious={onPagePrevious}
                  has_previous_page={order.has_previous_page}
                  has_next_page={order.has_next_page}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Orders;
