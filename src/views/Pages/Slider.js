import React from "react";
import Header from "components/Headers/Header.js";
import styled from "@emotion/styled";
import axios from "../../axios.js";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import {
  Card,
  Row,
  CardHeader,
  Button,
  Container,
  CardBody,
  Modal,
  Form,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
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
  {
    /* ////////////////////////////////////// ADD-SLIDER //////////////////////// */
  }
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [input, setInput] = useState({});
  let handleChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setInput((values) => ({ ...values, [name]: value }));
  };
  let handleSubmit = (props) => {
    props.preventDefault();
    axios
      .post("/slider/create", {
        addSlider: input.addSlider,
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
      {/* ////////////////////////////////////// ADD-SLIDER //////////////////////// */}
      <Modal isOpen={modal}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Add new Slider</ModalHeader>
          <ModalBody>
            <h3>Upload an image for Slider</h3>
            <Input
              className="mt-2"
              name="addSlider"
              type="file"
              onChange={handleChange}
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
        {/* Table */}
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <div>
                  <h3 className="mb-0">Slider Details</h3>
                </div>
                <div className="col text-right">
                  <Button color="btn btn-info" size="sm" onClick={toggle}>
                    ADD NEW SLIDER
                  </Button>
                </div>
              </CardHeader>
              <CardBody>
                <div>
                  <Grid className="mt-3">
                    {slider.map((item) => {
                      return (
                        <Item>
                          <img
                            alt=""
                            src={`http://localhost:5000/${item.image}`}
                            width={"100%"}
                          />
                          <div className=" mt-2">
                            <Button color="btn btn-info" size="sm">
                              Edit
                            </Button>
                            <Button color="btn btn-danger" size="sm">
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
