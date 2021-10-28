import React from "react";
import Header from "components/Headers/Header.js";
import styled from "@emotion/styled";
import axios from "../../axios.js";
import { useEffect, useState } from "react";
import {
  Card,
  Row,
  CardHeader,
  Button,
  Container,
  CardBody,
  Table,
} from "reactstrap";

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 12px;
  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
  @media (max-width: 950px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
const Item = styled.div`
  display: inline-grid;
  text-align: center;
  min-height: 70px;
  background-color: #eee;
`;

const Slider = () => {
  const [slider, setSlider] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/slider`);
    setSlider(result.data);
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
                <h3 className="mb-0">Slider Details</h3>
              </CardHeader>
              <CardBody>
                <div>
                  <Grid className="mt-3">
                    {slider.map((item) => {
                      return (
                        <Item>
                          <img
                            src={`http://localhost:5000/${item.image}`}
                            width={"100%"}
                          />
                          <div className="mt-4">
                            <Button color="primary" size="sm">
                              Disable
                            </Button>
                            <Button color="primary" size="sm">
                              Delete
                            </Button>
                          </div>
                        </Item>
                      );
                    })}
                  </Grid>
                </div>
              </CardBody>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Slider;
