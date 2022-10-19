import React, { useState } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Link from "next/link";

class Welcome extends React.Component {
  constructor(props) {
    console.log("constructor");
    console.log("props:");
    console.log(props);
    super(props);
    // 不要在這裡呼叫 this.setState()！
    this.state = { counter: 0 };
    // this.handleClick = this.handleClick.bind(this);
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate");
    console.log("nextProps");
    console.log(nextProps);
    console.log("nextState");
    console.log(nextState);
    return true;
  }
  render() {
    console.log("render");
    return (
      <div>
        <h1>Hello, {`${this.props.name}, count: ${this.state.counter}`}</h1>
        <button
          onClick={() => this.setState({ counter: this.state.counter + 1 })}
        >
          加加
        </button>
      </div>
    );
  }
  componentDidMount() {
    console.log("componentDidMount");
  }
  componentDidUpdate() {
    console.log("componentDidUpdate");
  }
  componentWillUnmount() {
    console.log("componentWillUnmount");
  }
}

export default function LifeCycle() {
  const [isWelcome, setIsWelcome] = useState(false);
  return (
    <div>
      活動報名
      <div>
        <button
          onClick={() => setIsWelcome((preWel) => !preWel)}
        >{`show welcome: ${isWelcome}`}</button>
      </div>
      {isWelcome && <Welcome name={"STAR"}></Welcome>}
    </div>
  );
}
