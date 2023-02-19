function UserDropdownMenu({ dropdown, setDropdown, items }) {
  return (
    <div
      className={`${
        dropdown ? "dropdown-active" : "dropdown-inactive"
      } dropdown`}
    >
      {items.map((i) => i)}
    </div>
  );
}

export default UserDropdownMenu;
