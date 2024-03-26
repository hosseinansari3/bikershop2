import * as React from "react";
import Rating from "@mui/material/Rating";

import { useDispatch } from "react-redux";
import { reviewChange } from "../actions/reviews";

export default function StarRating({ readOnly, rateValue }) {
  const [value, setValue] = React.useState(0);

  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(reviewChange("rating", value));
  }, [value]);

  return (
    <Rating
      readOnly={readOnly}
      name="simple-controlled"
      value={rateValue ? rateValue : value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
    />
  );
}
