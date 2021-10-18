import React, {useEffect,useState} from 'react';
import axios from "../../axios.js";
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    NavItem,
    NavLink,
    Nav,
    Progress,
    Table,
    Container,
    Row,
    Col,
  } from "reactstrap";
  import Header from 'components/Headers/Header.js';
const Product = () => {
    const [products,setProducts]=useState([]);
    useEffect(()=>{
        fetchData();
    },[])
    const fetchData=async()=>{
        const result=await axios.get(`/product`);
        setProducts(result.data)
    }
    return (
      
        <div>
          <Header />
            {console.log("products:",products)}
            <h1>Products</h1>
            <Card className="shadow">
              <CardHeader className="border-0">
                <Row className="align-items-center">
                  <div className="col">
                    <h3 className="mb-0">Page visits</h3>
                  </div>
                  <div className="col text-right">
                    <Button
                      color="primary"
                      href="#pablo"
                      onClick={(e) => e.preventDefault()}
                      size="sm"
                    >
                      See all
                    </Button>
                  </div>
                </Row>
              </CardHeader>
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
                    {console.log("before")}
                  {products.map((item)=>{
                      return(<tr>
                      <th scope="row">{item.name}</th>
                      <td>{item.categoryId.name}</td>
                      <td>{item.stock}</td>
                      <td>{item.price}</td>
                      {/* <td>
                        <i className="fas fa-arrow-up text-success mr-3" /> 46,53%
                      </td> */}
                    </tr>)
                  })}
                  {console.log("after")}
                </tbody>
              </Table>
            </Card>
        </div>
    )
}

export default Product
