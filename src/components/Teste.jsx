import React from "react";

class Teste extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "Joabe Thomas",
    };
  }
  componentDidMount() {
    console.log("é executado quando o usuario acessa pela primeira vez");
  }

  render() {
    return <h1>{this.state.message} </h1>;
  }
}

export default Teste;
