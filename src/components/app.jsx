import React, { Component } from "react";

import PhaseDiagram from "./diagram";
import SideBar from "./sidebar";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "Fe-C phase diagram",
      description: "Work in progress from state.",
    };
  }

  render() {
    return (
      <>
        <div className="main-container">
          <div className="diagram-container">
            <PhaseDiagram />
          </div>
          <div id="info-window">
            <h1>Iron-Carbon phase diagram</h1>
            <SideBar
              title={this.state.title}
              description={this.state.description}
            />
            <div className="copyrights">
              <p>By Mallory Wittwer, 2022</p>
              <a
                href="https://github.com/MalloryWittwer/FeC-phase-diagram"
                target="_blank"
              >
                View code
              </a>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
