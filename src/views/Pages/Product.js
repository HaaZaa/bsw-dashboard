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
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  ModalFooter,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
const Product = () => {
  const [products, setProducts] = useState({});
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/product?page=1`);

    setProducts(result.data);
  };
  const [subCategory, setSubCategory] = useState([]);
  useEffect(() => {
    fetchSubCatData();
  }, []);
  const fetchSubCatData = async () => {
    const result = await axios.get(`/category/subcategory`);
    setSubCategory(result.data);
  };
  {
    /*///////////////////////////////// MODAL Add Product /////////////////////////////////////*/
  }
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [inputs, setInputs] = useState({});

  let handleChange = (props) => {
    let name = props.target.name;
    if (name === "Pimage" || name === "pPDF") {
      let value = props.target.files[0];
      setInputs((values) => ({ ...values, [name]: value }));
    } else {
      let value = props.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  let handleSubmit = (props) => {
    props.preventDefault();
    const formdata = new FormData();
    formdata.append("name", inputs.Pname);
    formdata.append("image", inputs.Pimage);
    formdata.append("pdf", inputs.pPDF);
    formdata.append("stock", inputs.Pstock);
    formdata.append("price", inputs.Pprize);
    formdata.append("categoryId", inputs.CategoryID);
    formdata.append("description", inputs.Pdescription);
    formdata.append("mpn", inputs.PpartNo);
    axios
      .post("/product/create", formdata)
      .then((response) => {
        fetchData();
        if (response.data.msg === "Product created sucessfully!") {
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
        toast.error(err.response.data.message, {
          position: toast.POSITION.BOTTOM_RIGHT,
          autoClose: 2000,
          pauseOnHover: false,
        });
      });
    toggle();
  };
  {
    /*///////////////////////////////// MODAL Edit Product /////////////////////////////////////*/
  }
  const [Pmodal, setPModal] = useState(false);
  const [modalData, setModalData] = useState({
    pname: "",
    pdescription: "",
    pprice: 0,
    PMN: "",
    pStock: "",
    pCategory: "",
    pImg: [],
    pPDF: [],
  });
  const Ptoggle = () => {
    setPModal(!Pmodal);
  };
  const [Pinputs, setPInputs] = useState({});
  let handlePChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setPInputs((values) => ({ ...values, [name]: value }));
  };
  let handlePSubmit = (props) => {
    props.preventDefault();
    axios
      .post("/product/update", {
        Pname: Pinputs.Pname,
        Pdescription: Pinputs.Pdescription,
        Pprize: Pinputs.Pprize,
        CategoryID: Pinputs.CategoryID,
        Pstock: Pinputs.Pstock,
        Pimage: Pinputs.Pimage,
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
    Ptoggle();
  };
  return (
    <div>
      <Header />
      {/*///////////////////////////////// MODAL Add Product /////////////////////////////////////*/}
      <Modal isOpen={modal}>
        <AvForm onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Add New Product</ModalHeader>
          <ModalBody>
            <AvField
              name="Pname"
              type="text"
              placeholder="Enter Product Name"
              onChange={handleChange}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Product name",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                },

                minLength: {
                  value: 4,
                  errorMessage: "Your name must be between 4 and 16 characters",
                },
                maxLength: {
                  value: 16,
                  errorMessage: "Your name must be between 4 and 16 characters",
                },
              }}
            />
            <AvField
              name="Pdescription"
              type="textarea"
              placeholder="Enter Product Description"
              onChange={handleChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter  Description",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                },

                minLength: {
                  value: 6,
                  errorMessage: "Your name must be between 6 and 16 characters",
                },
                maxLength: {
                  value: 16,
                  errorMessage: "Your name must be between 6 and 16 characters",
                },
              }}
            />
            <AvField
              name="Pprize"
              type="number"
              placeholder="Enter Product Price"
              onChange={handleChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Price",
                },
                pattern: {
                  value: "^[0-9]+$",
                  errorMessage: "Tax must be composed only with numbers",
                },
                minLength: {
                  value: 2,
                  errorMessage: "Product Price must be atleast 2 digits",
                },

                maxLength: {
                  value: 2,
                  errorMessage: "Maximum Lenght sholud be 2-Digits",
                },
              }}
            />
            <AvField
              name="PpartNo"
              type="text"
              placeholder="Enter Manufacture Part Number"
              onChange={handleChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Manufacture Part Number",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage:
                    "Tax must be composed only with Characters and numbers",
                },

                minLength: {
                  value: 3,
                  errorMessage:
                    "  Manufacture Part Numbe must be atleast 3 digits",
                },

                maxLength: {
                  value: 5,
                  errorMessage: "Maximum Lenght sholud be 5-Digits",
                },
              }}
            />
            <AvField
              name="Pstock"
              type="number"
              placeholder="Enter Amount of Product in stock "
              onChange={handleChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Product in stock",
                },
                pattern: {
                  value: "^[0-9]+$",
                  errorMessage: "Tax must be composed only with numbers",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Minimum Lenght sholud be atleast 1-Digits",
                },

                maxLength: {
                  value: 4,
                  errorMessage: "Maximum Lenght sholud be 4-Digits",
                },
              }}
            />

            <Input
              type="select"
              className="mt-2"
              defaultValue={"DEFAULT"}
              name="CategoryID"
              id="parentCategory"
              onChange={handleChange}
            >
              <option value="DEFAULT" disabled>
                Choose a Category ...
              </option>
              {subCategory.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </Input>

            <label>
              Button to Feature product :{" "}
              <input type="checkbox" name="Featured" onChange={handleChange} />
            </label>

            <h5 className="mt-2">Upload product image</h5>
            <Input
              name="Pimage"
              type="file"
              placeholder="Upload product Image"
              onChange={handleChange}
              className="mt-2"
              required
              multiple
            ></Input>
            <h5 className="mt-2">Upload product PDF file</h5>
            <Input
              name="pPDF"
              type="file"
              onChange={handleChange}
              className="mt-2"
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
        </AvForm>
      </Modal>
      {/*///////////////////////////////// MODAL Edit Product /////////////////////////////////////*/}
      <Modal isOpen={Pmodal}>
        <AvForm onSubmit={handlePSubmit}>
          <ModalHeader toggle={Ptoggle}>Edit Product Details</ModalHeader>
          <ModalBody>
            <AvField
              name="Pname"
              type="text"
              value={modalData.pname}
              onChange={(e) => {
                setModalData((prev) => {
                  prev.pname = e.target.value;
                  return { ...prev };
                });
              }}
              placeholder="Enter Product Name"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Product name",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                },

                minLength: {
                  value: 4,
                  errorMessage: "Your name must be between 4 and 16 characters",
                },
                maxLength: {
                  value: 16,
                  errorMessage: "Your name must be between 4 and 16 characters",
                },
              }}
            />
            <AvField
              name="Pdescription"
              type="textarea"
              placeholder="Enter Product Description"
              onChange={handlePChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter  Description",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                },

                minLength: {
                  value: 6,
                  errorMessage:
                    "Product Description must be between 6 and 16 characters",
                },
                maxLength: {
                  value: 16,
                  errorMessage:
                    "Product Description must be between 6 and 16 characters",
                },
              }}
            />
            <AvField
              name="Pprize"
              type="number"
              placeholder="Enter Product Price"
              onChange={handlePChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Price",
                },
                pattern: {
                  value: "^[0-9]+$",
                  errorMessage: "Tax must be composed only with numbers",
                },
                minLength: {
                  value: 2,
                  errorMessage: "Product Price must be atleast 2 digits",
                },

                maxLength: {
                  value: 2,
                  errorMessage: "Maximum Lenght sholud be 2-Digits",
                },
              }}
            />
            <AvField
              name="_PpartNo"
              type="text"
              placeholder="Enter Manufacture Part Number"
              onChange={handleChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Manufacture Part Number",
                },
                pattern: {
                  value: "^[A-Za-z0-9]+$",
                  errorMessage:
                    "Tax must be composed only with Characters and numbers",
                },

                minLength: {
                  value: 3,
                  errorMessage:
                    "  Manufacture Part Numbe must be atleast 3 digits",
                },

                maxLength: {
                  value: 5,
                  errorMessage: "Maximum Lenght sholud be 5-Digits",
                },
              }}
            />
            <AvField
              name="Pstock"
              type="number"
              placeholder="Enter Amount of Product in stock "
              onChange={handlePChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Product in stock",
                },
                pattern: {
                  value: "^[0-9]+$",
                  errorMessage: "Tax must be composed only with numbers",
                },
                minLength: {
                  value: 1,
                  errorMessage: "Minimum Lenght sholud be atleast 1-Digits",
                },

                maxLength: {
                  value: 4,
                  errorMessage: "Maximum Lenght sholud be 4-Digits",
                },
              }}
            />

            <Input
              className="mt-2"
              type="select"
              defaultValue={"DEFAULT"}
              name="parentCategory"
              id="parentCategory"
              onChange={handlePChange}
            >
              <option value="DEFAULT" disabled>
                Choose a Category ...
              </option>
              {subCategory.map((item) => {
                return <option value={item._id}>{item.name}</option>;
              })}
            </Input>

            <h5 className="mt-2">Upload product image</h5>
            <Input
              name="Pimage"
              type="file"
              placeholder="Upload product Image"
              onChange={handlePChange}
              className="mt-2"
              required
            ></Input>
            <h5 className="mt-2">Upload product PDF file</h5>
            <Input
              name="product PDF Details"
              type="file"
              onChange={handlePChange}
              className="mt-2"
              required
            ></Input>
          </ModalBody>
          <ModalHeader>
            <Button size="sm" className="btn btn-success" type="submit">
              Submit
            </Button>
            <Button size="sm" color="secondary" onClick={Ptoggle} type="button">
              Cancel
            </Button>
          </ModalHeader>
        </AvForm>
      </Modal>
      {/*///////////////////////////////// Product Table /////////////////////////////////////*/}
      <Container className="mt--7" fluid>
        <Row>
          <div className="col">
            <Card className="shadow">
              <CardHeader className="bg-transparent">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mt-0">Products details</h3>
                  </div>

                  <div className="col text-right">
                    <Button
                      color="btn btn-info"
                      herf="#H@za"
                      size="sm"
                      onClick={toggle}
                    >
                      ADD NEW PRODUCT
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <CardBody>
                {/* Table body */}
                <Table className="align-items-center table-flush" responsive>
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">product Image</th>
                      <th scope="col">product name</th>
                      <th scope="col">Manufactures Part#</th>
                      <th scope="col">Stock</th>
                      <th scope="col">Price</th>
                      <th scope="col">Actions</th>
                      <th scope="col">Featured</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products?.products?.map((item) => {
                      return (
                        <tr>
                          <td>
                            <img
                              src={`http://localhost:5000/${item?.image}`}
                              width={"50px"}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "http://localhost:5000/uploads/images/default.png";
                              }}
                            />
                          </td>
                          <td>{item?.name}</td>
                          <td>{item?.mpn}</td>
                          <td>{item?.stock}</td>
                          <td>{item?.price}</td>

                          <td>
                            <Button
                              className="btn btn-success"
                              size="sm"
                              onClick={() => {
                                setModalData((prev) => {
                                  prev.pname = item.name;
                                  prev.pdescription = item.description;
                                  prev.pprice = item.price;
                                  prev.PMN = item.PMN;
                                  prev.pStock = item.stock;
                                  prev.pCategory = item.categoryId.name;
                                  prev.pImg = item.image;
                                  prev.pPDF = item.PDF;
                                  return { ...prev };
                                });
                                Ptoggle();
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className="btn btn-danger"
                              size="sm"
                              onClick={() => {
                                axios
                                  .put(`/product/${item._id}/delete`)
                                  .then((responce) => {
                                    fetchData();
                                    console.log(responce.data);
                                  })
                                  .catch((err) => {
                                    console.log(err);
                                  });
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                          <td>
                            <label className="custom-toggle custom-toggle-success">
                              {/* {item.active === true ? (
                                <input type="checkbox" checked />
                              ) : ( */}
                              <input
                                type="checkbox"
                                checked={item.featured}
                                onChange={() => {
                                  axios
                                    .put(`/product/${item?._id}/feature`)
                                    .then((response) => {
                                      fetchData();
                                      if (
                                        (response.data.msg ===
                                          "Product Added to Featured Products!") |
                                        (response.data.msg ===
                                          "Product Removed from Featured Products!")
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
                          </td>
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
