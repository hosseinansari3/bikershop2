import React from "react";
import { useEffect, useState } from "react";

import ProductCart from "../../components/Body/ProductCart";
import { useSelector, useDispatch } from "react-redux";
import { getProducts } from "../../actions/products";

import Slider from "@mui/material/Slider";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

import FilterAltIcon from "@mui/icons-material/FilterAlt";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import "./BikesPage.css";

function BikesPage() {
  const dispatch = useDispatch();

  const [priceRange, setPriceRange] = React.useState([2000, 5700]);

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const product = useSelector((state) => state.products);
  const { products, loading } = product;

  const [filterStyle, setFilterStyle] = useState();
  const [filterOpen, setFilterOpen] = useState();

  const fliterClickHandler = () => {
    setFilterStyle({ left: "-10px" });
  };

  const backClickHandler = () => {
    setFilterStyle({ left: "-850px" });
  };

  const filterToggleHandler = () => {
    setFilterOpen(!filterOpen);
  };

  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4">
      <div
        className={`filter-products relative w-60 ${
          filterOpen ? "filter-open" : "filter-close"
        } `}
      >
        <div onClick={filterToggleHandler} className="back-button lg:hidden">
          <ArrowBackIcon />
          BACK
        </div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Price Range</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Slider
              min={0}
              max={9500}
              value={priceRange}
              onChange={handlePriceChange}
              aria-label="Default"
              valueLabelDisplay="auto"
            />
            <div className="priceRange-inputs">
              <input
                value={priceRange[0]}
                type="text"
                onChange={(e) => setPriceRange([e.target.value, priceRange[1]])}
              />
              <input
                value={priceRange[1]}
                type="text"
                onChange={(e) => setPriceRange([priceRange[0], e.target.value])}
              />
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Categories</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="E-Bikes"
              />
              <FormControlLabel control={<Checkbox />} label="Junior Bikes" />
              <FormControlLabel
                control={<Checkbox />}
                label="Ladies Specific"
              />
              <FormControlLabel control={<Checkbox />} label="Mountain Bikes" />
              <FormControlLabel control={<Checkbox />} label="Other" />
              <FormControlLabel control={<Checkbox />} label="Road Bikes" />
            </FormGroup>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Suspension</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel control={<Checkbox />} label="Dual Suspension" />
            <FormControlLabel control={<Checkbox />} label="Hardtail" />
            <FormControlLabel control={<Checkbox />} label="Rigid" />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Material</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel control={<Checkbox />} label="Carbon" />
            <FormControlLabel control={<Checkbox />} label="Aluminium" />
            <FormControlLabel control={<Checkbox />} label="Other" />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Brands</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel control={<Checkbox />} label="BIANCHI" />
            <FormControlLabel control={<Checkbox />} label="CIPOLLINI" />
            <FormControlLabel control={<Checkbox />} label="FUJI" />
            <FormControlLabel control={<Checkbox />} label="GT" />
            <FormControlLabel control={<Checkbox />} label="KTM" />
            <FormControlLabel control={<Checkbox />} label="SCOTT" />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>Size</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FormControlLabel control={<Checkbox />} label="28C" />
            <FormControlLabel control={<Checkbox />} label="25C" />
            <FormControlLabel control={<Checkbox />} label="30C" />
            <FormControlLabel control={<Checkbox />} label="32C" />
            <FormControlLabel control={<Checkbox />} label="35C" />
          </AccordionDetails>
        </Accordion>
      </div>
      <div className="col-span-3">
        <div className="list-topBar lg:hidden">
          <div onClick={filterToggleHandler} className="filter-button">
            <FilterAltIcon />
            <span>Filter</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 BikesPage">
          {products.map((p) => {
            return (
              <ProductCart
                key={p._id}
                price={p.price}
                title={p.title}
                image={p.image}
                id={p._id}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default BikesPage;
