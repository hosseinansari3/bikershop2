import React from "react";
import { useEffect, useState } from "react";

import ProductCart from "../../components/Body/ProductCart";
import { useSelector, useDispatch } from "react-redux";
import { getProducts, getProductsByFilter } from "../../actions/products";

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
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";
import Pagination from "../../components/Pagination/Pagination";
import axios from "axios";
import { fetchCategories } from "../../actions/categories";

function BikesPage() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.usersSignin.userInfo);

  const [priceRange, setPriceRange] = React.useState([2000, 5700]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [filters, setFilters] = useState({});

  const allCategories = useSelector((state) => state.categories);
  const { categories } = allCategories;

  const handlePriceChange = (event, newValue) => {
    console.log("range", newValue);
    setPriceRange(newValue);
    setFilters({ ...filters, priceMin: newValue[0], priceMax: newValue[1] });
  };

  const handleCheckboxChange = (e) => {
    const isChecked = e.target.checked;
    if (isChecked) {
      setSelectedCategories([...selectedCategories, e.target.value]);
    } else if (!isChecked) {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== e.target.value)
      );
    }
  };

  useEffect(() => {
    if (selectedCategories.length !== 0) {
      console.log("selectedCats", selectedCategories);
      setFilters({ ...filters, categories: selectedCategories });
    }
  }, [selectedCategories]);

  useEffect(() => {
    console.log("filters", filters);
    dispatch(getProductsByFilter(filters));
  }, [filters]);

  const product = useSelector((state) => state.products);
  const { loading, products, totalPages, pageSize, totalProducts } = product;

  const pageNumber = 1;

  const [filterStyle, setFilterStyle] = useState();
  const [filterOpen, setFilterOpen] = useState();
  const [page, setPage] = useState(pageNumber);
  const [pages, setPages] = useState();

  useEffect(() => {
    dispatch(getProducts(page));
    window.scrollTo({ top: 120, left: 0, behavior: "smooth" });
  }, [dispatch, page]);

  useEffect(() => {
    setPages(totalPages);
  }, [totalPages]);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

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
      {loading && <LoadingIndicator />}
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
              {categories?.map((category, index) => {
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        id={category.id}
                        value={category.name}
                        onChange={(e) => handleCheckboxChange(e)}
                      />
                    }
                    label={category.name}
                  />
                );
              })}
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
                image={p.images[0]}
                slug={p.slug}
              />
            );
          })}
        </div>
        <Pagination
          totalItems={totalProducts}
          pageSize={pageSize}
          page={page}
          pages={pages}
          changePage={setPage}
        />
      </div>
    </div>
  );
}

export default BikesPage;
