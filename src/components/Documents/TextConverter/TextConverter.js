import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {windowAlert} from "../../Error/Alerts"

import "./TextConverter.css";
const TextConverter = () => {
  const [Text, setText] = useState("");
  const [Search, setSearch] = useState("");

  const params = useParams();
  const id = params.documentid.toString();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  let options = {
    url: `http://localhost:3001/documents/:${id}/to-text`,
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json;charset=UTF-8",
      jwt: localStorage.getItem("token"),
    },
  };
  useEffect(() => {
    const convertToText = async () => {
      await axios(options)
        .then((documents) => {
          console.log(documents);
        //  eslint-disable-next-line no-lone-blocks 
          {
            if (documents.data.result.length > 0) {
              localStorage.setItem(
                "documents",
                JSON.stringify(documents.data.result)
              );
              console.log(documents.data.result);
              setText(documents.data.result);
            }
          }
          
        })
        .catch((error) => {
          console.log(error);
          windowAlert(error.response.data.message);
        });
    };
    convertToText();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function convertUpperCase() {
    let newText = Text.toUpperCase();
    setText(newText);
  }
  const convertLowerCase = () => {
    let newText = Text.toLowerCase();
    setText(newText);
  };
  const removeExtraSpace = () => {
    let newText = Text.split(/[ ]+/);
    setText(newText.join(" "));
  };
  const copyText = () => {
    let boxText = document.getElementById("myBox");
    boxText.select();
    navigator.clipboard.writeText(boxText.value);
  };
  const handleChange = () => {};
  const handleSearch = () => {
    var hasValue = Text.includes(Search);
    if (hasValue) {
      windowAlert("value found");
    } else {
      windowAlert("value not found");
    }
  };

  return (
    <div className="container">
      {Text.length !== 0 ? (
        <div className="text-area">
          <div className="search-bar">
            <input
              name="search"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              placeholder="Search for word"
            ></input>
            <button onClick={handleSearch}>search</button>
          </div>
          <textarea
            onChange={handleChange}
            value={Text}
            placeholder="no text found"
            className="output"
            type="text"
            id="myBox"
            rows="20"
            cols="100"
          ></textarea>
          <button onClick={convertUpperCase}> Convert To Uppercase</button>
          <button onClick={convertLowerCase}> Convert To LowerCase</button>
          <button onClick={copyText}> copy text</button>
          <button onClick={removeExtraSpace}> remove Extra Space</button>
        </div>
      ) : (
        <div className="loader">
          <img
            src="https://quizgamefinal.netlify.app/img/loader.gif"
            alt="loading"
            className="loader-img"
          />
          <h1>we value your time,</h1>
          <p> please wait</p>
        </div>
      )}
    </div>
  );
};

export default TextConverter;
