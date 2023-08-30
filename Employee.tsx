// used sepeare/different method  handler for each input,select,checkbox
// make some generic code for checkbox
// good project sample with typescript
// cover all input field

import React, { ChangeEvent, FormEvent, useState } from "react";
type Emp = {
  name: string;
  desg: string;
  salary: number;
  exp: string;
  workMode: string;
  skills: string;
};

type techStackProps = {
  name: string;
  checked: boolean;
}[];

const techStack: techStackProps = [
  { name: "html", checked: false },
  { name: "css", checked: false },
  { name: "javascript", checked: false },
  { name: "reactjs", checked: false },
  { name: "redux", checked: false },
  { name: "next.js", checked: false },
  { name: "unit testing", checked: false }
];

const Employee = () => {
  const [emp, setEmp] = useState<Emp | null>(null);
  const [totalExp, setTotalExp] = useState<string>("0");
  const [workMode, setWorkMode] = useState<string>("WFO");
  const [myskills, setMySkills] = useState<techStackProps>(techStack);

  const inputHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const name: string = e.target.name;
    const value: string | number = e.target.value;
    setEmp((prev) => {
      // ! we used that for not null we are sure, errro will remove
      return { ...prev!, [name]: value };
    });
  };

  const expHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    setTotalExp(e.target.value);
  };

  const modeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setWorkMode(e.target.value);
  };

  const checkHandler = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    let updated: techStackProps = myskills.map((item, currentIndex) => {
      if (currentIndex === index) {
        return { ...item, checked: !item.checked };
      } else {
        return item;
      }
    });
    setMySkills(updated);
  };

  function skillsCheckbox<T, Key extends keyof T>(
    programming: T[],
    property: Key,
    value: T[Key]
  ): T[] {
    return programming.filter((item) => item[property] === value);
  }

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalObj = {
      ...emp,
      exp: totalExp,
      workMode: workMode,
      skills: skillsCheckbox(myskills, "checked", true)
        .map((item) => item.name)
        .join(",")
    };
    alert(JSON.stringify(finalObj, null));
  };

  return (
    <>
      <h1>Employee management System</h1>
      <form onSubmit={submitHandler}>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Name:
          <input
            type="text"
            value={emp?.name}
            name="empName"
            onChange={inputHandler}
          />
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Designation:
          <input
            type="text"
            value={emp?.desg}
            name="empDesg"
            onChange={inputHandler}
          />
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Salary:
          <input
            type="number"
            value={emp?.salary}
            name="empSalary"
            onChange={inputHandler}
          />
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          Experience(years):
          <select
            value={totalExp}
            name="experience"
            onChange={expHandler}
            style={{ width: "100px" }}
          >
            <option value="0">Fresher</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5+</option>
          </select>
        </label>
        <label style={{ marginBottom: "10px", display: "block" }}>
          work mode:
          {["WFO", "WFH"].map((item, index) => {
            return (
              <label key={index}>
                <input
                  type="radio"
                  name="workMode"
                  value={item}
                  checked={workMode === item ? true : false}
                  onChange={modeHandler}
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
export default Employee;

