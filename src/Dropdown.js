import React from 'react';

export const Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => (
  <select id={id} onChange={event => onSelectedValueChange(event.target.value)}>
    {options.map(({ value, label }) => (
      <option value={value} selected={value === selectedValue}>
        {label}
      </option>
    ))}
  </select>
);




// export const dropdownMenu = ({ options, onOptionClicked, selectedOption }) => {
//   <div className="menus-container">
//     <span className="dropdown-label">Select Sensor Data</span>
//     <ReactDropdown
//       options={options}
//       value={onOptionClicked}
//       onChange={({ selectedOption }) => setSelected(selectedOption)}
//     />
//   </div>;
// };
