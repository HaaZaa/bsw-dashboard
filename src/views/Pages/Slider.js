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
  background-color: #f2f2f2;
  @media (max-width: 550px) {
    grid-template-columns: repeat(1, 1fr);
  }
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
  // Add new Slider Modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [input, setInput] = useState({});
  let handleChange = (props) => {
    let name = props.target.name;
    if (name === "addSlider") {
      let value = props.target.files[0];
      setInput((values) => ({ ...values, [name]: value }));
    }
  };
  let handleSubmit = (props) => {
    props.preventDefault();
    const formdata = new FormData();
    formdata.append("image", input.addSlider);
    formdata.append("active", true);
    axios
      .post("/slider/create", formdata)
      .then((response) => {
        fetchData();
        if (response.data.msg === "Slider Uploaded sucessfully!") {
          toast.success(response.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
          });
        } else {
          toast.error(response.data.msg, {
            position: toast.POSITION.BOTTOM_RIGHT,
            autoClose: 2000,
            pauseOnHover: false,
          });
        }
      })
      .catch((err) => {
        toast.error(err.response.data.msg, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
        });
      });
    toggle();
  };
  return (
    <div>
      <Header />
      {/* Add new slider */}
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
                  <Grid className="mt-3 ">
                    {slider.map((item) => {
                      return (
                        <Item>
                          <div style={{ minHeight: "10em" }}>
                            <img
                              style={{
                                width: "100%",
                                overflow: "hidden",
                                height: "10em",
                                aspectRatio: 1,
                              }}
                              alt=""
                              src={`http://bswengineering.com/api/${item?.image}`}
                            />
                          </div>
                          <div className=" mt-3">
                            <Button
                              color="btn btn-danger  mb-4 "
                              size="sm"
                              onClick={() => {
                                axios
                                  .delete(`/slider/delete/${item?._id}`)
                                  .then((response) => {
                                    fetchData();
                                    if (
                                      response.data.msg === "Slider Deleted!"
                                    ) {
                                      toast.success(response.data.msg, {
                                        position: toast.POSITION.BOTTOM_RIGHT,
                                        autoClose: 2000,
                                        pauseOnHover: false,
                                      });
                                    }
                                  })
                                  .catch((err) => {
                                    toast.error(err.response.data.msg, {
                                      position: toast.POSITION.BOTTOM_RIGHT,
                                      autoClose: 2000,
                                      pauseOnHover: false,
                                    });
                                  });
                                fetchData();
                              }}
                            >
                              Delete
                            </Button>
                            <label
                              className="custom-toggle custom-toggle-success"
                              style={{ marginLeft: "40%" }}
                            >
                              <input
                                type="checkbox"
                                checked={item.active}
                                onChange={() => {
                                  axios
                                    .put(`/slider/update/${item?._id}`)
                                    .then((response) => {
                                      fetchData();
                                      if (
                                        response.data.msg ===
                                          "Slider Activated" ||
                                        response.data.msg ===
                                          "Slider Deactivated"
                                      ) {
                                        toast.success(response.data.msg, {
                                          position: toast.POSITION.BOTTOM_RIGHT,
                                          autoClose: 2000,
                                          pauseOnHover: false,
                                        });
                                      } else {
                                        toast.error(response.data.msg, {
                                          position: toast.POSITION.BOTTOM_RIGHT,
                                          autoClose: 2000,
                                          pauseOnHover: false,
                                        });
                                      }
                                    })
                                    .catch((err) => {
                                      toast.error(err.response.data.msg, {
                                        position: toast.POSITION.BOTTOM_RIGHT,
                                        autoClose: 2000,
                                        pauseOnHover: false,
                                      });
                                    });
                                  fetchData();
                                }}
                              />

                              <span
                                className="custom-toggle-slider rounded-circle "
                                data-label-off="Disabled"
                                data-label-on="Enabled"
                              ></span>
                            </label>
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
