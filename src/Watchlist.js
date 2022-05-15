import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth, db } from "./firebase.js";
import { useNavigate, Link } from "react-router-dom";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import "./Watchlist.css";
import { CheckIcon, AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Input, Button } from "@chakra-ui/react";

export default function WatchList() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        navigate("/");
      }
    });
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });

    setTodo("");
  };

  // update
  const handleUpdate = (todo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <div className="homepage">
      <Button top={-9} right={0} position="absolute">
        <Link to={"/"}>Discover Anime (random)</Link>
      </Button>
      {isEdit ? (
        <div>
          <CheckIcon onClick={handleEditConfirm} className="add-confirm-icon" />
        </div>
      ) : (
        <div>
          <AddIcon onClick={writeToDatabase} className="add-confirm-icon" />
        </div>
      )}

      <Input
        w={"auto"}
        top={6}
        // right={450}
        position={"absolute"}
        // className="add-edit-input"
        type="text"
        placeholder="Movie? Anime? ..."
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />

      {todos.map((todo) => (
        <div style={{ transform: "translate(100px,80px)" }} className="todo">
          <h1>{todo.todo}</h1>
          <EditIcon
            fontSize="large"
            onClick={() => handleUpdate(todo)}
            className="edit-button"
          />
          <DeleteIcon
            fontSize="large"
            onClick={() => handleDelete(todo.uidd)}
            className="delete-button"
          />
        </div>
      ))}
    </div>
  );
}
