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
} from "reactstrap";
import Header from "components/Headers/Header.js";
const Product = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/product`);
    setProducts(result.data);
  };
  return (
    <div>
      <Header />
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
                      onClick={(e) => e.preventDefault()}
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
                      <th scope="col">product name</th>
                      <th scope="col">Category Name</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((item) => {
                      return (
                        <tr>
                          <th scope="row">{item.name}</th>
                          <td>{item.categoryId.name}</td>
                          <td>{item.stock}</td>
                          <td>{item.price}</td>
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
