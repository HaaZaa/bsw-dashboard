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
  CardFooter,
} from "reactstrap";
import Header from "components/Headers/Header.js";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from "availity-reactstrap-validation";
import Pagination from "components/Pagination/Pagination.js";

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
    const result = await axios.get(`/category/subcategory/product`);
    setSubCategory(result.data);
  };
  // add Product Modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [inputs, setInputs] = useState({});

  let handleChange = (props) => {
    let name = props.target.name;
    if (name === "Pimage" || name === "pPDF") {
      if (name === "Pimage") {
        let value = [];
        for (let i = 0; i < props.target.files.length; i++) {
          value.push(props.target.files[i]);
        }
        setInputs((values) => ({ ...values, [name]: value }));
      } else {
        let value = props.target.files[0];
        setInputs((values) => ({ ...values, [name]: value }));
      }
    } else {
      let value = props.target.value;
      setInputs((values) => ({ ...values, [name]: value }));
    }
  };

  let handleSubmit = (props) => {
    props.preventDefault();
    const formdata = new FormData();
    formdata.append("name", inputs.Pname);
    formdata.append("pdf", inputs.pPDF);
    formdata.append("stock", inputs.Pstock);
    formdata.append("price", inputs.Pprize);
    formdata.append("categoryId", inputs.CategoryID);
    formdata.append("description", inputs.Pdescription);
    formdata.append("mpn", inputs.PpartNo);
    for (let i = 0; i < inputs.Pimage.length; i++) {
      formdata.append(`image`, inputs.Pimage[i]);
    }
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
  // Edit Product Modal
  const [Pmodal, setPModal] = useState(false);
  const [modalData, setModalData] = useState({
    pname: "",
    pdescription: "",
    pprice: 0,
    mpn: "",
    pStock: "",
    pCategory: "",
    Pimage: [],
    pPDF: [],
    _id: "",
  });
  const Ptoggle = () => {
    setPModal(!Pmodal);
  };

  let handleEditChange = (props) => {
    let name = props.target.name;
    if (name === "Pimage" || name === "pPDF") {
      if (name === "Pimage") {
        let value = [];
        for (let i = 0; i < props.target.files.length; i++) {
          value.push(props.target.files[i]);
        }
        setModalData((values) => ({ ...values, [name]: value }));
      } else {
        let value = props.target.files[0];
        setModalData((values) => ({ ...values, [name]: value }));
      }
    } else {
      let value = props.target.value;
      setModalData((values) => ({ ...values, [name]: value }));
    }
  };

  let handleEditSubmit = (props) => {
    props.preventDefault();
    const formdata = new FormData();
    formdata.append("name", modalData.pname);
    formdata.append("pdf", modalData.pPDF);
    formdata.append("stock", modalData.pStock);
    formdata.append("price", modalData.pprice);
    formdata.append("categoryId", modalData.pCategory);
    formdata.append("description", modalData.pdescription);
    formdata.append("mpn", modalData.mpn);
    for (let i = 0; i < modalData.Pimage.length; i++) {
      formdata.append(`image`, modalData.Pimage[i]);
    }
    axios
      .put(`/product/${modalData._id}/update`, formdata)
      .then((response) => {
        fetchData();
        if (response.data.msg === "Product Updated Sucessfully!") {
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

  const onPageNext = async () => {
    const result = await axios.get(`/product?page=${products?.next_page}`);
    setProducts(result.data);
  };
  const onPagePrevious = async () => {
    const result = await axios.get(`/product?page=${products?.previous_page}`);
    setProducts(result.data);
  };

  return (
    <div>
      <Header />
      {/* Add Product Modal */}
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

                minLength: {
                  value: 6,
                  errorMessage: "Your name must be atleast 10 characters",
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
            <Input name="pPDF" type="file" onChange={handleChange} className="mt-2" required></Input>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" type="submit" size="sm">
              Submit
            </Button>
            <Button onClick={toggle} color="secondary" size="sm">
              Cancel
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
      {/*///////////////////////////////// MODAL Edit Product /////////////////////////////////////*/}
      <Modal isOpen={Pmodal}>
        <AvForm onSubmit={handleEditSubmit}>
          <ModalHeader toggle={Ptoggle}>Edit Product Details</ModalHeader>
          <ModalBody>
            <AvField
              name="pname"
              type="text"
              value={modalData.pname}
              onChange={handleEditChange}
              placeholder="Enter Product Name"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Product name",
                },
              }}
            />
            <AvField
              name="pdescription"
              type="textarea"
              placeholder="Enter Product Description"
              value={modalData.pdescription}
              onChange={handleEditChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter  Description",
                },

                minLength: {
                  value: 6,
                  errorMessage: "Product Description must be atleast 10 characters",
                },
              }}
            />
            <AvField
              name="pprice"
              type="number"
              placeholder="Enter Product Price"
              value={modalData.pprice}
              onChange={handleEditChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Price",
                },
              }}
            />
            <AvField
              name="mpn"
              type="text"
              placeholder="Enter Manufacture Part Number"
              value={modalData.mpn}
              onChange={handleEditChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Manufacture Part Number",
                },
              }}
            />
            <AvField
              name="pStock"
              type="number"
              placeholder="Enter Amount of Product in stock "
              value={modalData.pStock}
              onChange={handleEditChange}
              className="mt-2"
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter Product in stock",
                },
              }}
            />

            <Input
              className="mt-2"
              type="select"
              defaultValue={"DEFAULT"}
              name="pCategory"
              id="parentCategory"
              value={modalData.pCategory}
              onChange={handleEditChange}
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
              className="mt-2"
              onChange={handleEditChange}
              required
              multiple
            />
            <h5 className="mt-2">Upload product PDF file</h5>
            <Input name="pPDF" type="file" className="mt-2" onChange={handleEditChange} required />
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
                    <Button color="btn btn-info" herf="#H@za" size="sm" onClick={toggle}>
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
                              alt="No Image"
                              src={`http://localhost:5000/${item?.image}`}
                              width={"50px"}
                              // onErrorImageURL="https://via.placeholder.com/1000x600?text=No+Image+1"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src =
                                  "https://thumbs.dreamstime.com/b/no-image-icon-vector-available-picture-symbol-isolated-white-background-suitable-user-interface-element-205805243.jpg";
                              }}
                              // onError={(e) => {
                              //   e.target.src = require("../../assets/img/brand/bsw-logo-small_-removebg-preview.png");
                              // }}
                            />
                          </td>
                          <td>{item?.name}</td>
                          <td>{item?.mpn}</td>
                          <td>{item?.stock}</td>
                          <td>${item?.price}</td>

                          <td>
                            <Button
                              className="btn btn-success"
                              size="sm"
                              onClick={() => {
                                setModalData((prev) => {
                                  prev.pname = item.name;
                                  prev.pdescription = item.description;
                                  prev.pprice = item.price;
                                  prev.mpn = item.mpn;
                                  prev.pStock = item.stock;
                                  prev.pCategory = item.categoryId._id;
                                  prev.Pimage = item.image;
                                  prev.pPDF = item.pdf;
                                  prev._id = item._id;
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
                                        (response.data.msg === "Product Added to Featured Products!") |
                                        (response.data.msg === "Product Removed from Featured Products!")
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
              <CardFooter>
                <Pagination
                  previous_page={products?.previous_page}
                  current_page={products?.current_page}
                  next_page={products?.next_page}
                  onPageNext={onPageNext}
                  onPagePrevious={onPagePrevious}
                  has_previous_page={products.has_previous_page}
                  has_next_page={products.has_next_page}
                />
              </CardFooter>
            </Card>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default Product;
