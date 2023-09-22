import { Component } from "react";

export default class Button extends Component {
    render(){
        return this.props.isRender && <button className="Button">Load more</button>
          
    }
}