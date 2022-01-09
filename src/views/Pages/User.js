import Header from "components/Headers/Header.js";
import React, { useState, useEffect } from "react";
import { Card, CardHeader, CardBody, Container, Row, Table } from "reactstrap";
import axios from "../../axios.js";

const User = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/user`);
    setUsers(result.data);
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
                <h3 className="mb-0">User information</h3>
              </CardHeader>
              <CardBody>
                <div>
                  <Table className="align-item-center table-flush" responsive>
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">User-Name</th>
                        <th scope="col">E-Mail</th>
                        <th scope="col">User-Address</th>
                        <th scope="col">Status</th>
                        <th scope="col">Role</th>
                        <th scope="col">Contact-No</th>
                      </tr>
                    </thead>
                    <tbody>
                      {users.map((item) => {
                        return (
                          <tr>
                            <td>{item.name}</td>
                            <td>{item.email}</td>
                            <td>
                              {item?.address.substring(0, 25)}
                              {item?.address.length > 25 && "..."}
                            </td>
                            {item.status === true ? (
                              <td>Active</td>
                            ) : (
                              <td>InActive</td>
                            )}
                            <td>{item.role}</td>
                            <td>{item.phone_no}</td>
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

export default User;
