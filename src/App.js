import React, { Component } from "react";
import { render } from "react-dom";
import {
  ContainerQuery,
  ReactContainerQuery,
  applyContainerQuery,
} from "react-container-query";
import classNames from "classnames";
import "./App.scss";

class Item extends React.Component {
  render() {
    return (
      <div
        className={classNames(
          "item",
          "clearfix",
          this.props.className,
          this.props.containerQuery
        )}
        style={{ width: this.props.width }}
      >
        <div className="image"></div>
        <div className="name"></div>
        <div className="text">
          <div className="line line-1"></div>
          <div className="line line-2"></div>
        </div>
      </div>
    );
  }
}

const query = {
  "item-wide": {
    minWidth: 180,
  },
};

const ResponsiveItem = applyContainerQuery(Item, query);

class Resizable extends React.Component {
  constructor(props) {
    super(props);
    this.state = { width: 200 };
  }

  render() {
    const items = [];
    for (let i = 0; i < 10; i++) {
      items.push(<ResponsiveItem key={i} />);
    }

    return (
      <div className="side-bar" style={{ width: this.state.width }}>
        <div className="bar-content">{items}</div>
        <div
          className="draggable"
          onMouseDown={this.onMouseDown.bind(this)}
        ></div>
      </div>
    );
  }

  onMouseDown() {
    const mousemoveHandler = ({ pageX }) => {
      this.setState({
        width: `${Math.max(80, pageX)}px`,
      });
    };

    const mouseupHandler = (event) => {
      document.removeEventListener("mousemove", mousemoveHandler, false);
      document.removeEventListener("mouseup", mouseupHandler, false);
    };

    document.addEventListener("mousemove", mousemoveHandler, false);
    document.addEventListener("mouseup", mouseupHandler, false);
  }
}

const App = (props) => (
  <div className="container">
    <Resizable />
    <p className="intro">
      Drag the gray bar to resize the sidebar. When it's narrow, the content
      will collapse.
    </p>
  </div>
);

export default App;
