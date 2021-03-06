import React from "react";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";
import { formatMoney } from "../helpers/helpers";
import { secondaryColor } from "../helpers/colors";
import estimateStore from "../stores/estimateStore";
import { translateComponent } from "../helpers/helpers";
import translations from "../helpers/translations";
import languageStore from "../stores/languageStore";

const EstimateCostDisplay = () => {
  let styling = {
    color: `${secondaryColor}`,
    fontWeight: "normal",
    textAlign: "right",
  };
  const { setTaxPercentage, taxPercentage, estimateItems } = estimateStore();

  const handleChange = (e) => {
    setTaxPercentage(Number(e.target.value));
  };

  let subtotalCost = estimateItems.reduce((acc, item) => {
    return acc + Number(item.metricPrice) * Number(item.quantity);
  }, 0);
  let taxCost = subtotalCost * taxPercentage;
  let totalCost = subtotalCost + subtotalCost * taxPercentage;
  let { language } = languageStore();
  let { estimateCostDisplay } = translations;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
      }}
    >
      <RadioGroup row aria-label="taxPercentage" name="taxPercentage">
        <FormControlLabel
          control={
            <Radio
              checked={taxPercentage === 0.06}
              onChange={handleChange}
              value="0.06"
              name="taxPercentage"
              color="primary"
            />
          }
          label="6%"
        />
        <FormControlLabel
          control={
            <Radio
              checked={taxPercentage === 0.23}
              onChange={handleChange}
              value="0.23"
              name="taxPercentage"
              color="primary"
            />
          }
          label="23%"
        />
      </RadioGroup>

      <div style={styling}>
        <p>
          {translateComponent(estimateCostDisplay.subtotal, language)}:{" "}
          <strong>{formatMoney(subtotalCost)}</strong>
        </p>
        <p>
          {translateComponent(estimateCostDisplay.tax, language)}:{" "}
          <strong> {formatMoney(taxCost)}</strong>
        </p>
        <p>
          {translateComponent(estimateCostDisplay.total, language)}:{" "}
          <strong>{formatMoney(totalCost)}</strong>
        </p>
      </div>
    </div>
  );
};

export default EstimateCostDisplay;
