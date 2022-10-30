export const dropdownMenu = ({ options, onOptionClicked, selectedOption }) => {
  <div className="menus-container">
    <span className="dropdown-label">Select Sensor Data</span>
    <ReactDropdown
      options={options}
      value={onOptionClicked}
      onChange={({ selectedOption }) => setSelected(selectedOption)}
    />
  </div>;
};
