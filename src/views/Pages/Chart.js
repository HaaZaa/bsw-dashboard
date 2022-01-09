import { useState, useEffect } from "react";
import Chart from "chart.js";
import axios from "../../axios.js";
import React from "react";
// react plugin used to create charts
import { Line, Bar } from "react-chartjs-2";
// reactstrap components
import { Card, CardHeader, CardBody, Container, Row, Col } from "reactstrap";
// core components
import {
  chartOptions,
  parseOptions,
  salesChart,
  totalOrders,
} from "../../variables/charts.js";

const ChartPage = () => {
  const [sales, setSales] = useState(salesChart);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    await axios.get(`/dashboard/graph`).then((result) => {
      totalOrders.data.labels = result.data.orders_month.month;
      totalOrders.data.datasets[0].data = result.data.orders_month.count;
      // ! Sales Chart data
      setSales((prev) => {
        prev.data.labels = result.data.sales_month.month;
        prev.data.datasets[0].data = result.data.sales_month.sales;
        return { ...prev };
      });
    });
    // ! Orders chart data
  };
  if (window.Chart) {
    parseOptions(Chart, chartOptions());
  }
  return (
    <Container className="mt--7" fluid>
      <Row>
        <Col className="mb-5 mb-xl-0" xl="8">
          <Card className="bg-gradient-default shadow">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h6 className="text-uppercase text-light ls-1 mb-1">
                    Overview
                  </h6>
                  <h2 className="text-white mb-0">Sales value</h2>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              {/* Chart */}
              <div className="chart">
                <Line
                  data={sales.data}
                  options={sales.options}
                  getDatasetAtEvent={(e) => console.log(e)}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col xl="4">
          <Card className="shadow">
            <CardHeader className="bg-transparent">
              <Row className="align-items-center">
                <div className="col">
                  <h6 className="text-uppercase text-muted ls-1 mb-1">
                    Performance
                  </h6>
                  <h2 className="mb-0">Total orders</h2>
                </div>
              </Row>
            </CardHeader>
            <CardBody>
              {/* Chart */}
              <div className="chart">
                <Bar data={totalOrders.data} options={totalOrders.options} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChartPage;
