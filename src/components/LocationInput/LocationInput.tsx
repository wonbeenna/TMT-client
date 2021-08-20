import { useState } from "react";
import { options } from "../../modules/utils/theme";
import { setProvinceProps } from "../../interfaces";
import "./LocationInput.css";

function LocationInput({ setProvince }: setProvinceProps) {
  const [value, setValue] = useState<string>("");

  const locationHandler = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    type: string
  ) => {
    if (type === "location") {
      setProvince(event.target.value);
    }
  };

  return (
    <>
      <div className="location">
        <select
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            locationHandler(e, "location");
          }}
        >
          <option value={""}>지역검색</option>
          {options.map((el, idx) => {
            return (
              <option value={el} key={idx}>
                {el}
              </option>
            );
          })}
        </select>
      </div>
    </>
  );
}

export default LocationInput;
