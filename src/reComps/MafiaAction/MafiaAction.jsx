import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem } from "../../redux/arraySlice";
import { Link } from "react-router-dom";

function MafiaAction() {
  const array = useSelector((state) => state.array);
  const dispatch = useDispatch();

  const handleAddItem = (item) => {
    dispatch(addItem(item));
  };

  const handleRemoveItem = (item) => {
    dispatch(removeItem(item));
  };

  return (
    <div>
      <ul>
        {array.map((item) => (
          <li key={item}>
            {item}
            <button onClick={() => handleRemoveItem(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={() => handleAddItem("New Item")}>Add Item</button>
      <Link to={"/"}>aleko</Link>
    </div>
  );
}

export default MafiaAction;
