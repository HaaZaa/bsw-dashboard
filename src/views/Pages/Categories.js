import Header from "components/Headers/Header.js";
import Pagination from "components/Pagination/Pagination";
// import { useParams } from "react-router-dom";

import React, { useEffect, useState } from "react";
import axios from "../../axios.js";
import {
  Button,
  CardHeader,
  CardFooter,
  Card,
  Table,
  Container,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input,
} from "reactstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AvForm, AvField } from "availity-reactstrap-validation";

const Categories = () => {
  const [category, setCategory] = useState({});
  const [addCategory, setAddCategory] = useState([]);
  useEffect(() => {
    fetchData();
    fetchCatData();
  }, []);
  const fetchData = async () => {
    const result = await axios.get(`/category?page=1`);
    setCategory(result.data);
  };
  const fetchCatData = async () => {
    const result = await axios.get(`/category/all`);
    setAddCategory(result.data);
  };
  const [subCategory, setSubCategory] = useState({});
  useEffect(() => {
    fetchSubCatData();
  }, []);
  const fetchSubCatData = async () => {
    const result = await axios.get(`/category/subcategory?page=1`);
    setSubCategory(result.data);
  };

  // Category Modal
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const [inputs, setInputs] = useState({});
  let handleChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setInputs((values) => ({ ...values, [name]: value }));
  };
  let handleSubmit = (props) => {
    props.preventDefault();
    axios
      .post("/category/create", {
        name: inputs.name,
        parentCategory: inputs.parentCategory,
      })
      .then((response) => {
        fetchData();
        if (response.data.msg === "Category Created Sucessfully") {
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
  // edit category modal
  const [editCategory, setEditCategory] = useState(false);
  const [editModal, setEditModal] = useState({
    name: "",
    Category: "",
  });
  const EditToggle = () => {
    setEditCategory(!editCategory);
  };
  const [Cinputs, setCInputs] = useState({});
  let handleCategoryEdit = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setCInputs((values) => ({ ...values, [name]: value }));
  };
  let handleEditSubmit = (props) => {
    props.preventDefault();
    axios
      .put(`/category/${editModal._id}/update`, {
        name: editModal.name,
        parentCategory: Cinputs.Category,
      })
      .then((response) => {
        fetchData();
        if (response.data.msg === "Category Updated") {
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
        EditToggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // Sub-Category  Modal
  const [scModal, setSCModal] = useState(false);
  const scToggle = () => setSCModal(!scModal);
  const [scInputs, setscInputs] = useState({});
  let handleScChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setscInputs((values) => ({ ...values, [name]: value }));
  };
  let handleScSubmit = (props) => {
    props.preventDefault();
    axios
      .post("/category/subcategory/create", {
        name: scInputs.name,
        parentCategory: scInputs.parentCategory,
      })
      .then((response) => {
        fetchSubCatData();
        if (response.data.msg === "Category Created Sucessfully") {
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
    scToggle();
  };

  //Edit sub-category modal
  const [editScModal, setEditScModal] = useState(false);
  const [dataScModal, setDataScModal] = useState({
    name: "",
    parentCategory: "",
  });
  const ScEditToggle = () => {
    setEditScModal(!editScModal);
  };
  const [scEditModal, setscEditModal] = useState({});
  let handleEditScChange = (props) => {
    let name = props.target.name;
    let value = props.target.value;
    setscEditModal((values) => ({ ...values, [name]: value }));
  };
  let handleEditScSubmit = (props) => {
    props.preventDefault();
    axios
      .put(`/category/subcategory/${dataScModal._id}/update`, {
        name: dataScModal.name,
        parentCategory: scEditModal.subcategory,
      })
      .then((response) => {
        fetchSubCatData();
        if (response.data.msg === "Category Updated") {
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
        ScEditToggle();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // paginatoin functions for category

  const onPageNext = async () => {
    const result = await axios.get(`/category?page=${category?.next_page}`);
    setCategory(result.data);
  };
  const onPagePrevious = async () => {
    const result = await axios.get(`/category?page=${category?.previous_page}`);
    setCategory(result.data);
  };

  // paginatoin functions for sub-category

  const onScPageNext = async () => {
    const result = await axios.get(
      `/category/subcategory?page=${subCategory?.next_page}`
    );
    setSubCategory(result.data);
  };
  const onScPagePrevious = async () => {
    const result = await axios.get(
      `/category/subcategory?page=${subCategory?.previous_page}`
    );
    setSubCategory(result.data);
  };

  return (
    <div>
      <Header />
      <ToastContainer />
      {/* Add New category Modal */}
      <Modal isOpen={modal}>
        <AvForm onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Add New Category</ModalHeader>
          <ModalBody>
            <AvField
              name="name"
              type="text"
              onChange={handleChange}
              placeholder="Enter Category Name..."
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Category",
                },
              }}
            />
            <div className="mt-2">
              <Input
                type="select"
                name="parentCategory"
                id="parentCategory"
                defaultValue={"DEFAULT"}
                onChange={handleChange}
                required
              >
                <option value="DEFAULT" disabled>
                  Choose a Category ...
                </option>
                <option value={10001}>
                  Electronics Components, Power & Connectors
                </option>
                <option value={10002}>Electrical, Automation & Cables</option>
                <option value={10003}>Mechanical Products & Tools</option>
                <option value={10004}>IT, Test & Safety Equipment</option>
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button type="submit" className="btn btn-success" size="sm">
              Submit
            </Button>
            <Button color="secondary" onClick={toggle} size="sm">
              Cancel
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
      {/* Edit category modal */}
      <Modal isOpen={editCategory}>
        <AvForm onSubmit={handleEditSubmit}>
          <ModalHeader toggle={EditToggle}>Edit Category</ModalHeader>
          <ModalBody>
            <AvField
              name="name"
              type="text"
              onChange={(e) => {
                setEditModal((prev) => {
                  prev.name = e.target.value;
                  return { ...prev };
                });
              }}
              placeholder="Enter Category Name..."
              value={editModal.name}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Category",
                },
              }}
            />
            <div className="mt-2">
              <Input
                type="select"
                name="Category"
                id="parentCategoryEdit"
                defaultValue={editModal.parentCategory}
                onChange={handleCategoryEdit}
                required
              >
                <option value="DEFAULT" disabled>
                  Choose a Category ...
                </option>
                <option value={10001}>
                  Electronics Components, Power & Connectors
                </option>
                <option value={10002}>Electrical, Automation & Cables</option>
                <option value={10003}>Mechanical Products & Tools</option>
                <option value={10004}>IT, Test & Safety Equipment</option>
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button size="sm" className="btn btn-success" type="submit">
              Update
            </Button>
            <Button
              size="sm"
              color="secondary"
              onClick={EditToggle}
              type="button"
            >
              Cancel
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
      {/*  Add new Sub-Category MODAL */}

      <Modal isOpen={scModal}>
        <AvForm onSubmit={handleScSubmit}>
          <ModalHeader toggle={scToggle}>Add New Category</ModalHeader>
          <ModalBody>
            <AvField
              name="name"
              type="text"
              onChange={handleScChange}
              placeholder="Enter Sub-Category Name..."
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Sub-Category",
                },
              }}
            />
            <div className="mt-2">
              <Input
                type="select"
                defaultValue={"DEFAULT"}
                name="parentCategory"
                id="parentCategory"
                onChange={handleScChange}
              >
                <option value="DEFAULT" disabled>
                  Choose a Category ...
                </option>
                {addCategory.map((item, index) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" type="submit" size="sm">
              Submit
            </Button>
            <Button color="secondary" onClick={scToggle} size="sm">
              Cancel
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
      {/* Edit sub-category modal */}
      <Modal isOpen={editScModal}>
        <AvForm onSubmit={handleEditScSubmit}>
          <ModalHeader toggle={ScEditToggle}>Edit Sub-Category</ModalHeader>
          <ModalBody>
            <AvField
              name="name"
              type="text"
              onChange={(e) => {
                setDataScModal((prev) => {
                  prev.name = e.target.value;
                  return { ...prev };
                });
              }}
              placeholder="Enter Sub-Category Name..."
              value={dataScModal.name}
              validate={{
                required: {
                  value: true,
                  errorMessage: "Please enter a Sub-Category",
                },
              }}
            />
            <div className="mt-2">
              <Input
                type="select"
                defaultValue={dataScModal?.parentCategory?._id}
                name="subcategory"
                id="parentCategory"
                onChange={handleEditScChange}
              >
                <option value="DEFAULT" disabled>
                  Choose a Category ...
                </option>
                {addCategory.map((item, index) => {
                  return <option value={item._id}>{item.name}</option>;
                })}
              </Input>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button className="btn btn-success" type="submit" size="sm">
              Submit
            </Button>
            <Button color="secondary" onClick={ScEditToggle} size="sm">
              Cancel
            </Button>
          </ModalFooter>
        </AvForm>
      </Modal>
      {/* category table */}
      <Container className="mt--9">
        <Row>
          <Col xl="4" className="mt-5 mb-xl-0">
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Category</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="btn btn-info"
                      href="#H@za"
                      onClick={toggle}
                      size="sm"
                    >
                      Add New Category
                    </Button>
                  </div>
                </Row>
              </CardHeader>

              <Table className="align-items-center  table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Categories Names</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {category?.categories?.map((item) => {
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>
                          <Button
                            className="btn btn-success"
                            href="#H@za"
                            onClick={() => {
                              setEditModal(item);
                              EditToggle();
                            }}
                            size="sm"
                          >
                            Edit
                          </Button>

                          <Button
                            className="btn btn-danger "
                            href="#pablo"
                            onClick={() => {
                              axios
                                .delete(`/category/${item._id}/delete`)
                                .then((response) => {
                                  fetchData();
                                  console.log(response);
                                })
                                .catch((err) => {
                                  console.log(err);
                                });
                            }}
                            size="sm"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
              <CardFooter>
                <Pagination
                  previous_page={category?.previous_page}
                  current_page={category?.current_page}
                  next_page={category?.next_page}
                  onPageNext={onPageNext}
                  onPagePrevious={onPagePrevious}
                  has_previous_page={category.has_previous_page}
                  has_next_page={category.has_next_page}
                />
              </CardFooter>
            </Card>
          </Col>
          {/* Sub-category table */}
          <Col className="mt-5 mb-xl-0" xl="7">
            <Card className="shadow">
              <CardHeader className="bg-transparent border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Sub-Categories</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="btn btn-info"
                      href="#H@aZa"
                      onClick={scToggle}
                      size="sm"
                    >
                      Add New Sub-Category
                    </Button>
                  </div>
                </Row>
              </CardHeader>
              <Table className="align-items-center table-flush" responsive>
                <thead className="thead-light">
                  <tr>
                    <th scope="col">Sub-Category</th>
                    <th scope="col">Category</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {subCategory?.categories?.map((item) => {
                    return (
                      <tr>
                        <td>{item?.name}</td>
                        <td>{item?.parentCategory?.name}</td>
                        <td>
                          <Button
                            className="btn btn-success"
                            href="#H@zA"
                            onClick={() => {
                              setDataScModal(item);
                              ScEditToggle();
                            }}
                            size="sm"
                          >
                            Edit
                          </Button>
                          <Button
                            className="btn btn-danger"
                            onClick={() => {
                              axios
                                .delete(
                                  `/category/subcategory/${item._id}/delete`
                                )
                                .then((response) => {
                                  fetchSubCatData();
                                  if (
                                    response.data.msg === "Category Deleted!"
                                  ) {
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
                            }}
                            size="sm"
                          >
                            Delete
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                  <tr></tr>
                </tbody>
              </Table>
              <CardFooter>
                <Pagination
                  previous_page={subCategory?.previous_page}
                  current_page={subCategory?.current_page}
                  next_page={subCategory?.next_page}
                  onPageNext={onScPageNext}
                  onPagePrevious={onScPagePrevious}
                  has_previous_page={subCategory.has_previous_page}
                  has_next_page={subCategory.has_next_page}
                />
              </CardFooter>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Categories;
