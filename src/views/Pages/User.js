import Header from "components/Headers/Header.js";
import React from "react";
import { Card, CardHeader, CardBody, Container, Row } from "reactstrap";

const User = () => {
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
                <Row>
                  <h1>this is the area the data will be shown</h1>
                </Row>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default User;
