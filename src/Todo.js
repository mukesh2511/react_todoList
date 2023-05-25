import React, { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import NoteAltIcon from "@mui/icons-material/NoteAlt";
import "./index.css";

// get the data from localstorage
const getLocalData = () => {
  const lists = localStorage.getItem("myTodoList");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputdata, setInputData] = useState("");
  const [checklist, setInputchecklist] = useState("Check List");
  const [item, setItem] = useState(getLocalData());
  const [isEditItem, setIsEditItem] = useState("");
  const [toggleBtn, setToggleBtn] = useState(false);

  // add the items
  const addItem = () => {
    if (!inputdata) {
      alert("Plz fill data");
    } else if (inputdata && toggleBtn) {
      setItem(
        item.map((currElem) => {
          if (currElem.id === isEditItem) {
            return { ...currElem, name: inputdata };
          } else {
            return currElem;
          }
        })
      );
      setInputData("");
      setIsEditItem(null);
      setToggleBtn(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputdata,
      };

      setItem([...item, myNewInputData]);
      setInputData("");
    }
  };
  const editItem = (index) => {
    const item_todo_edited = item.find((currElem) => {
      return currElem.id === index;
    });
    setInputData(item_todo_edited.name);
    setIsEditItem(index);
    setToggleBtn(true);
  };

  const deleteItem = (index) => {
    const updatedItems = item.filter((currElem) => {
      return currElem.id !== index;
    });
    setItem(updatedItems);
  };
  const mouseOver = () => {
    if (checklist === "Check List") {
      setInputchecklist("Remove All");
    }
  };
  const mouseOut = () => {
    setInputchecklist("Check List");
  };
  const clearAll = () => {
    setItem([]);
  };
  useEffect(() => {
    localStorage.setItem("myTodoList", JSON.stringify(item));
  });

  return (
    <>
      <div className="main-div">
        <div className="component ">
          <div className="img-container">
            <NoteAltIcon className="notes" />
          </div>
          <h2 className="title ">Add Your List Here ✌️</h2>
          <div className="input-area">
            <input
              className="input"
              type="text"
              placeholder="Write here...."
              autoFocus
              value={inputdata}
              onChange={(event) => setInputData(event.target.value)}
            />
            {toggleBtn ? (
              <ModeEditOutlineIcon className="add" onClick={addItem} />
            ) : (
              <AddIcon className="add" onClick={addItem} />
            )}
          </div>
          <div className="showItem">
            <button
              className="btn"
              onMouseEnter={mouseOver}
              onMouseLeave={mouseOut}
              onClick={clearAll}
            >
              {checklist}
            </button>
          </div>
        </div>
        <div className="showItems">
          {item.map((currElem) => {
            return (
              <div className="eachItem " key={currElem.id}>
                <p>{currElem.name}</p>

                <div className="todo-btn">
                  <ModeEditOutlineIcon
                    className="button add"
                    onClick={() => editItem(currElem.id)}
                  />
                  <DeleteIcon
                    className="button add"
                    onClick={() => deleteItem(currElem.id)}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Todo;
