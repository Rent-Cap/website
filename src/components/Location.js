import React from "react";
import AppContext from "./AppContext"

class Location extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            num: 0
        }
    }

    updateMe = (input, updateContext) => {
        this.setState({ num: input });
        updateContext('num', input);
    }

    render() {
        return (
            <AppContext.Consumer>
                {({num, updateContext}) => (
                    <input type="number" value={num} onChange={(e)=>{this.updateMe(e.target.value, updateContext)}}></input>
                )}
            </AppContext.Consumer>
        )
    }
}

export default Location;
