
import "./App.css";

import React, { useState } from "react";
import {marked} from "marked";
import useLocalStorage from "./components/useLocalStorage";

const App = () => {
  const [code, setCode] = useLocalStorage("markdown", "## Hello");
  const [compiled, setCompiled] = useState(marked(code));
  const [hide, setHide] = useState(true);
  const [docs, setDocs] = useState(null);
  const [showDocs, setShowDocs] = useState(false);

  const openMD = () => {
    setHide(true);
    setShowDocs(false);
  };

  const openPreview = () => {
    setHide(false);
    setShowDocs(false);
  };

  const handleChange = (e) => {
    const newCode = e.target.value;
    setCode(newCode);
    setCompiled(marked(newCode));
  };

  const fetchDocs = async () => {
    try {
      const response = await fetch(
        "https://cors-anywhere.herokuapp.com/https://www.markdownguide.org/api/v1/basic-syntax.json"
      );
      const responseData = await response.json();
      console.log(responseData.basic_syntax);
      setDocs(responseData.basic_syntax);
      setShowDocs(true);
      setHide(false);
    } catch (error) {
      console.error("Error fetching docs:", error);
    }
  };

  return (
    <>
      <h1>MarkDown Previewer React App</h1>

      <div className="container">
        <div className="btns">
          <button onClick={openMD} className="btn">
            MarkDown
          </button>
          <button onClick={fetchDocs}>Docs</button>
          <button onClick={openPreview}>Preview</button>
        </div>

        {hide ? (
          <div>
            <textarea onChange={handleChange} value={code} />
          </div>
        ) : null}

        {showDocs && docs ? (
          <p>
             <div className="docs-container">
            
            <ul className="docs-list">
              {docs.map((doc, index) => (
                <li key={index} className="doc-item">
                  <h3>{doc.name}</h3>
                  <p>{doc.description}</p>
                  

                  {doc.examples && doc.examples.length > 0 && (
                    <div className="examples">
                     
                      {doc.examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="example-item">
                           <h4>Examples {exampleIndex+1}:</h4>
                          <h5>-Markdown:</h5>
                          <p>{example.markdown}</p>
                          <h5>-HTML:</h5>
                          <p>
                            {example.html }
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                
                  {doc.examples && doc.examples.length > 0 && (
                    <div className="examples">
                     
                      {doc.additional_examples.map((example, exampleIndex) => (
                        <div key={exampleIndex} className="example-item">
                         
                          <h3>{example.name}</h3>
                          <p>{example.description}</p>
                           <h5>-Markdown:</h5>
                          <h3>{example.markdown}</h3>
                          <h5>-HTML:</h5>
                          <p dangerouslySetInnerHTML={{ __html: example.html }}></p>
                        </div>
                      ))}
                    </div>
                  )}
                  <pre></pre>
                </li>
                
              ))}
            </ul>
          </div>
          
          </p>
        ) : null}

        {!hide && !showDocs ? (
          <div>
            <textarea value={compiled} readOnly />
          </div>
        ) : null}
      </div>
    </>
  );
};

export default App;
