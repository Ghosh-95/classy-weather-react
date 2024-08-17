import React from "react";

class Input extends React.Component {
    render() {
        const { location, onChange } = this.props;

        return (
            <>
                <label htmlFor="search-input"></label>
                <input type="text" id="search-input" placeholder="search with location..." value={location} onChange={onChange} />
            </>
        );
    }
};

export default Input;