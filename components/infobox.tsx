import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Switch from "@mui/material/Switch";
import Slider from "@mui/material/Slider";
import Box from "@mui/material/Box";

interface infoboxprop {
  title: string;
  content: string;
}
const Infobox: React.FC<infoboxprop> = (props: infoboxprop) => {
  const [checked, setChecked] = useState<boolean>(true);

  const marks = [
    {
      value: 0,
      label: "0%",
    },
    {
      value: 20,
      label: "20%",
    },
    {
      value: 40,
      label: "40%",
    },
    {
      value: 60,
      label: "60%",
    },
    {
      value: 80,
      label: "80%",
    },
    {
      value: 100,
      label: "100%",
    },
  ];

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  function valuetext(value: number) {
    return `${value}%`;
  }

  return (
    <div style={{ margin: "1rem" }}>
      <Card sx={{ maxWidth: 400 }}>
        <CardContent>
          <div style={{ marginBottom: 10, fontWeight: "bold" }}>
            {props.title}
          </div>
          <div>{props.content}</div>
        </CardContent>
        <CardActions>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ marginLeft: "0.5rem" }}>Bruk konsistenssjekk:</div>
            <Switch
              checked={checked}
              onChange={handleChange}
              inputProps={{ "aria-label": "controlled" }}
            />
            <div style={{ marginTop: "2rem", marginLeft: "0.5rem" }}>
              Andel besvarelser som skal revurderes:
            </div>

            <Box sx={{ width: 300, margin: "1rem" }}>
              {checked ? (
                <Slider
                  aria-label="Custom marks"
                  defaultValue={10}
                  getAriaValueText={valuetext}
                  step={10}
                  valueLabelDisplay="auto"
                  marks={marks}
                />
              ) : (
                <Slider
                  disabled
                  aria-label="Custom marks"
                  defaultValue={10}
                  getAriaValueText={valuetext}
                  step={10}
                  valueLabelDisplay="auto"
                  marks={marks}
                />
              )}
            </Box>
          </div>
        </CardActions>
      </Card>
    </div>
  );
};

export default Infobox;
