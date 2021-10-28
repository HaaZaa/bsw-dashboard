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
} from "reactstrap";
const Orders = () => {
  const [order, setOrders] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/orders`);
    setOrders(result.data);
  };
  return (
    <div>
      <Header />
      <Container className="mt--7" fluid>
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
                        <th scope="col">User-ID</th>
                        <th scope="col">Total-prize</th>
                        <th scope="col">Tax</th>
                        <th scope="col">Delivery=Charges</th>
                        <th scope="col">Grand-Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Set-Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* {order.map((item) => {
                        return (
                          // <tr>
                          //   <td>{item.userId}</td>
                          //   <td>{item.totalPrice}</td>
                          //   <td>{item.tax}</td>
                          //   <td>{item.deliveryCharges}</td>
                          //   <td>{item.grandTotal}</td>
                          //   <td>
                          //     <Badge color="" className="badge-dot mr-4">
                          //       <i className="bg-warning" />
                          //       pending
                          //     </Badge>
                          //   </td>
                          //   <td className="text-center">
                          //     <UncontrolledDropdown>
                          //       <DropdownToggle
                          //         className="btn-icon-only text-light"
                          //         herf="#pablo"
                          //         role="button"
                          //         size="sm"
                          //         color=""
                          //         onClick={(e) => e.preventDefault()}
                          //       >
                          //         <i className="fas fa-ellipsis-v" />
                          //       </DropdownToggle>
                          //       <DropdownMenu
                          //         className="dropdown-menu-arrow"
                          //         right
                          //       >
                          //         <DropdownItem
                          //           herf="#pablo"
                          //           onClick={(e) => e.preventDefault()}
                          //         >
                          //           In production
                          //         </DropdownItem>
                          //         <DropdownItem
                          //           herf="#pablo"
                          //           onClick={(e) => e.preventDefault()}
                          //         >
                          //           On its way
                          //         </DropdownItem>
                          //         <DropdownItem
                          //           herf="#pablo"
                          //           onClick={(e) => e.preventDefault()}
                          //         >
                          //           delivered
                          //         </DropdownItem>
                          //         <DropdownItem
                          //           herf="#pablo"
                          //           onClick={(e) => e.preventDefault()}
                          //         >
                          //           pending
                          //         </DropdownItem>
                          //       </DropdownMenu>
                          //     </UncontrolledDropdown>
                          //   </td>
                          // </tr>
                        );
                      })} */}
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
