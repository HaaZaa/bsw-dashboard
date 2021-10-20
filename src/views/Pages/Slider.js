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
  
} from "reactstrap";


const Grid = styled.div`
display: grid;
grid-template-columns: repeat(4,1fr);
grid-gap: 12px;
@media(max-width: 550px){
    grid-template-columns: repeat(1,1fr);
}
@media(max-width: 950px){
    grid-template-columns: repeat(2,1fr);
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
},[]);
const fetchData = async () =>{
  const result = await axios.get(`/slider`);
  setSlider(result.data);
};
  return (
    <div>
      <Header />

      <Container>
        <Card className="shadow">
          <CardHeader className="border-0">
            <Row className="align-items-center">
              <div className="col">
                <h3 className="mb-0">Slider</h3>
              </div>
            </Row>
          </CardHeader>
          </Card>
          <Grid className="mt-3">
          {slider.map((item)=>{
            return(

              <Item>
              <img src={`http://localhost:5000/${item.image}`} width={"100%"}/>
              <div className="mt-4">
              <Button
              color="primary"
              size="md">
                Disable
              </Button>
              <Button
              color="primary"
              size="md">
                Delete
              </Button>
              </div>
            </Item>
            )
          })}
              
          </Grid>
        
      </Container>
    </div>
  );
};

export default Slider;
