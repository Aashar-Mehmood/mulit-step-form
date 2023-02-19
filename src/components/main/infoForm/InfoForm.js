import Header from "../Header";
import { useContext, useState, useEffect } from "react";
import {
  incrementStepContext,
  userDataContext,
  setUserDataContext,
} from "../../../App";

export default function InforForm() {
  const incrementStep = useContext(incrementStepContext);

  const userData = useContext(userDataContext);
  const setUserData = useContext(setUserDataContext);

  const [dataIsValid, setDataIsValid] = useState(false);
  const [nextBtnClicked, setNextBtnClicked] = useState(false);
  const [data, setData] = useState(userData[0]);

  function validateData() {
    setData((prevData) =>
      prevData.map((field) => {
        if (field.value.length > 0) {
          if (field.name === "email") {
            if (
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                field.value
              )
            ) {
              return {
                ...field,
                hasCorrectFormat: true,
              };
            } else {
              return {
                ...field,
                hasCorrectFormat: false,
              };
            }
          }
          if (field.name === "phone") {
            if (/^[0-9]*$/.test(field.value)) {
              return {
                ...field,
                hasCorrectFormat: true,
              };
            } else {
              return {
                ...field,
                hasCorrectFormat: false,
              };
            }
          }
          return {
            ...field,
            isFilled: true,
          };
        } else {
          return field;
        }
      })
    );
    setDataIsValid(
      data.every((field) => field.isFilled && field.hasCorrectFormat)
    );
  }

  useEffect(() => {
    if (dataIsValid) {
      setUserData((prevData) => {
        return prevData.map((dataArray, index) => {
          if (index === 0) {
            return [...data];
          } else {
            return dataArray;
          }
        });
      });
      console.log(userData);
      incrementStep();
    }
  }, [dataIsValid]);

  function handleChange(e) {
    const { name, value } = e.target;
    setData((prevData) => {
      return prevData.map((dataObj) => {
        if (dataObj.name === name) {
          if (value.length > 0) {
            if (name === "email") {
              if (
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
                  value
                )
              ) {
                return {
                  ...dataObj,
                  value: value,
                  isFilled: true,
                  hasCorrectFormat: true,
                };
              } else {
                return {
                  ...dataObj,
                  value: value,
                  isFilled: true,
                  hasCorrectFormat: false,
                };
              }
            }
            if (name === "phone") {
              if (/^[0-9]*$/.test(value)) {
                return {
                  ...dataObj,
                  value: value,
                  isFilled: true,
                  hasCorrectFormat: true,
                };
              } else {
                return {
                  ...dataObj,
                  value: value,
                  isFilled: true,
                  hasCorrectFormat: false,
                };
              }
            }
            return {
              ...dataObj,
              value: value,
              isFilled: true,
            };
          } else {
            return {
              ...dataObj,
              value: value,
              isFilled: false,
            };
          }
        } else {
          return dataObj;
        }
      });
    });
  }
  const headerData = {
    title: "Personal info",
    description: "Please provide your name, email address, and phone number.",
  };
  return (
    <div className="container" id="infoForm">
      <Header {...headerData} />

      <div className="form">
        <form>
          <div>
            <label htmlFor="name">
              Name
              {nextBtnClicked && !data[0].isFilled && (
                <span className="required">This field is required</span>
              )}
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="e.g Aashar Mehmmod"
              value={data[0].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="email">
              Email Address
              {nextBtnClicked && !data[1].isFilled && (
                <span className="required">This field is required</span>
              )}
              {nextBtnClicked &&
                data[1].isFilled &&
                !data[1].hasCorrectFormat && (
                  <span className="invalid">Invalid Email Format </span>
                )}
            </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="e.g aashar@gmail.com"
              value={data[1].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <label htmlFor="phone">
              Phone Number
              {nextBtnClicked && !data[2].isFilled && (
                <span className="required">This field is required</span>
              )}
              {nextBtnClicked &&
                data[2].isFilled &&
                !data[2].hasCorrectFormat && (
                  <span className="invalid">Only numeric values allowed </span>
                )}
            </label>
            <input
              type="text"
              name="phone"
              id="phone"
              placeholder="e.g +1 234 5678 9"
              value={data[2].value}
              onChange={(e) => handleChange(e)}
            />
          </div>
        </form>
      </div>
      <footer>
        <button
          className="next-step btn end"
          onClick={() => {
            setNextBtnClicked(true);
            validateData();
          }}
        >
          Next Step
        </button>
      </footer>
    </div>
  );
}
