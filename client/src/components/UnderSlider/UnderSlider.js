import React from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import "./UnderSlider.css";
import MounBike from "../../assets/images/Mountain-bike.jpg";
import CrossBike from "../../assets/images/Cross-Bike.jpg";
import CityBike from "../../assets/images/City-Bike.jpg";
import RoadBike from "../../assets/images/Road-bike.jpg";

function UnderSlider() {
  return (
    <Row>
      <Col>
        <div className={"Mountain-Bike " + "wrapper"}>
          <div className="Image-cover">
            <div className="Image-over-text">MOUNTAIN</div>
          </div>
          <img className="Image" src={MounBike} />
        </div>
        <div className={"City-Bike " + "wrapper"}>
          <div className="Image-cover">
            <div className="Image-over-text">MOUNTAIN</div>
          </div>
          <img className="Image" src={CityBike}></img>
        </div>
      </Col>

      <Col>
        <div className={"Road-Bike " + "wrapper"}>
          <div className="Image-cover">
            <div className="Image-over-text">MOUNTAIN</div>
          </div>
          <img className="Image" src={RoadBike} />
        </div>
        <div className={"Cross-Bike " + "wrapper"}>
          <div className="Image-cover">
            <div className="Image-over-text">MOUNTAIN</div>
          </div>
          <img className="Image" src={CrossBike}></img>
        </div>
      </Col>
    </Row>
  );
}

export default UnderSlider;
