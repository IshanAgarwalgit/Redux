import { useDispatch, useSelector } from "react-redux";

import { useHistory } from "react-router-dom";
import { useState } from "react";
import { userAdded } from "./usersSlice";

export function AddUser() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [error, setError] = useState(null);

  const handleName = (e) => setName(e.target.value);
  const handleAge = (e) => setAge(e.target.value);
  const handleGender = (e) => setGender(e.target.value);

  const usersAmount = useSelector((state) => state.users.entities.length);

  const handleClick = () => {
    if (name && age && gender) {
      dispatch(
        userAdded({
          id: usersAmount + 1,
          name,
          age,
          gender
        })
      );

      setError(null);
      history.push("/");
    } else {
      setError("Fill in all fields");
    }

    setName("");
    setAge("");
    setGender("");
  };

  return (
    <div className="container">
      <div className="row">
        <h1>Add user</h1>
      </div>
      <div className="row">
        <div className="three columns">
          <label htmlFor="nameInput">Name</label>
          <input
            className="u-full-width"
            type="text"
            id="nameInput"
            onChange={handleName}
            value={name}
          />
          <label htmlFor="ageInput">Age</label>
          <input
            className="u-full-width"
            type="number"
            id="ageInput"
            onChange={handleAge}
            value={age}
          />
          <label htmlFor="genderInput">Gender</label>
          <select id="genderInput" value={gender} onChange={handleGender} >
            <option value='' >Choose</option>
            <option value='Male' >Male</option>
            <option value='Female'>Female</option>
          </select>
          {error && error}
          <button onClick={handleClick} className="button-primary">
            Add user
          </button>
        </div>
      </div>
    </div>
  );
}
