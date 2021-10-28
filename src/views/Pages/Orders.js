import React from "react";
import Header from "components/Headers/Header.js";
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
                        <th scope="col">Order ID</th>
                        <th scope="col">UserName</th>
                        <th scope="col">Billing Address </th>
                        <th scope="col">Amount</th>
                        <th scope="col">Status</th>
                        <th scope="col">Set Status</th>
                      </tr>
                    </thead>
                    <tbody className="font-weight-700">
                      <tr>
                        <td>6$%*3542</td>
                        <td>Najam</td>
                        <td>house#abc,street,lhr,pakistan</td>
                        <td>12345</td>
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
                            <DropdownMenu className="dropdown-menu-arrow" right>
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
                      <tr>
                        <td>6$%*3542</td>
                        <td>Najam</td>
                        <td>house#abc,street,lhr,pakistan</td>
                        <td>12345</td>
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
                            <DropdownMenu className="dropdown-menu-arrow" right>
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
                      <tr>
                        <td>6$%*3542</td>
                        <td>Najam</td>
                        <td>house#abc,street,lhr,pakistan</td>
                        <td>12345</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-success" />
                            Delivered
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
                            <DropdownMenu className="dropdown-menu-arrow" right>
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
                      <tr>
                        <td>6$%*3542</td>
                        <td>Najam</td>
                        <td>house#abc,street,lhr,pakistan</td>
                        <td>12345</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-danger" />
                            in production
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
                            <DropdownMenu className="dropdown-menu-arrow" right>
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
                      <tr>
                        <td>6$%*3542</td>
                        <td>Najam</td>
                        <td>house#abc,street,lhr,pakistan</td>
                        <td>12345</td>
                        <td>
                          <Badge color="" className="badge-dot mr-4">
                            <i className="bg-info" />
                            on its way
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
                            <DropdownMenu className="dropdown-menu-arrow" right>
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
                      <tr>
                        <td>6$%*3542</td>
                        <td>Najam</td>
                        <td>house#abc,street,lhr,pakistan</td>
                        <td>12345</td>
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
                            <DropdownMenu className="dropdown-menu-arrow" right>
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
                      <tr>
                        <td>6$%*3542</td>
                        <td>Najam</td>
                        <td>house#abc,street,lhr,pakistan</td>
                        <td>12345</td>
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
                            <DropdownMenu className="dropdown-menu-arrow" right>
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
