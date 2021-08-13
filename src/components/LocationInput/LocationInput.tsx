import React from "react";
import { options } from "../../modules/utils/theme";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { setProvinceProps } from "../../interfaces";

function LocationInput({ setProvince }: setProvinceProps) {
  const [value, setValue] = React.useState<string | null>(null);
  const [inputValue, setInputValue] = React.useState("");

  const locationHandler = (event: any, type: string): void => {
    if (type === "location") {
      setProvince(event.target.innerText);
    }
  };

  return (
    <>
      <div className="location">
        <Autocomplete
          value={value}
          onChange={(_event: any, newValue: string | null) => {
            setValue(newValue);
          }}
          inputValue={inputValue}
          onInputChange={(event, newInputValue) => {
            setInputValue(newInputValue);
            locationHandler(event, "location");
          }}
          id="controllable-states-demo"
          options={options}
          renderInput={(params) => (
            <TextField
              {...params}
              label="지역 선택"
              variant="standard"
              className="loaction_label"
            />
          )}
        />
      </div>
    </>
  );
}

export default LocationInput;
