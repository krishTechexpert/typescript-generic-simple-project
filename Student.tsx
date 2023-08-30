// used single method handler for input,select,checkbox
// make some generic code for checkbox
// good project sample with typescript
// cover all input field

import React, { ChangeEvent, FormEvent, useState } from "react";
type Std = {
  name: string;
  stream: string;
  fees: number;
  class: string;
  mode: string;
  subject: string;
};

const stdValue: Std = {
  name: "",
  stream: "",
  fees: 100,
  class: "1",
  mode: "offline",
  subject: ""
};

type subjectStackProps = {
  name: string;
  checked: boolean;
}[];

const subjectStack: subjectStackProps = [
  { name: "hindi", checked: false },
  { name: "english", checked: false },
  { name: "Maths", checked: false },
  { name: "Science", checked: false },
  { name: "art", checked: false },
  { name: "CS", checked: false },
  { name: "Bio", checked: false }
];

type htmlElement = HTMLInputElement | HTMLSelectElement;

const Student = () => {
  const [student, setStudent] = useState<Std>(stdValue);
  const [myskills, setMySkills] = useState<subjectStackProps>(subjectStack);

  const inputHandler = (e: ChangeEvent<htmlElement>) => {
    const name: string = e.target.name;
    const value: string | number = e.target.value;
    setStudent((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const checkHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let updated: subjectStackProps = myskills.map((item, currentIndex) => {
      if (currentIndex === index) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
    setMySkills(updated);
  };

  function skillsCheckbox<T, Key extends keyof T>(
    programing: T[],
    property: Key,
    value: T[Key]
  ): T[] {
    return programing.filter((item) => item[property] === value);
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalObj = {
      ...student,
      subject: skillsCheckbox(myskills, "checked", true)
        .map((item) => item.name)
        .join(",")
    };
    alert(JSON.stringify(finalObj, null));
  };

  return (
    <>
      <h1>Student management System with generic typescript</h1>
      <form onSubmit={submitHandler}>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Name:
          <input
            type="text"
            value={student?.name}
            name="name"
            onChange={inputHandler}
          />
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Stream:
          <input
            type="text"
            value={student?.stream}
            name="stream"
            onChange={inputHandler}
          />
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Fees:
          <input
            type="number"
            value={student?.fees}
            name="fees"
            onChange={inputHandler}
          />
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Classes:
          <select
            value={student?.class}
            name="class"
            onChange={inputHandler}
            style={{ width: "100px" }}
          >
            <option value="Nursery">Nursery</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          mode:{student?.mode}
          {["offline", "online"].map((item, index) => {
            return (
              <label key="index">
                <input
                  type="radio"
                  name="mode"
                  value={item}
                  checked={student?.mode === item ? true : false}
                  onChange={inputHandler}
                />
                {item}
              </label>
            );
          })}
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          skiils:
          {myskills.map((item, index) => {
            return (
              <label key={index}>
                <input
                  type="checkbox"
                  checked={item.checked}
                  onChange={(e) => checkHandler(e, index)}
                />
                {item.name}
              </label>
            );
          })}
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};
export default Student;

