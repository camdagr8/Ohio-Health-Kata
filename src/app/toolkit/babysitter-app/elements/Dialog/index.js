/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Slider from 'components/Slider';

/**
 * -----------------------------------------------------------------------------
 * React Component: Dialog
 * -----------------------------------------------------------------------------
 */

class Dialog extends Component {
    static dependencies() {
        return typeof module !== 'undefined' ? module.children : [];
    }

    constructor(props) {
        super(props);
        this.state = Object.assign({}, this.props);
    }

    componentDidMount() {
        if (this.state.hasOwnProperty('mount')) {
            this.state.mount(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => {
            return Object.assign({}, prevState, nextProps);
        });
    }

    render() {
        return (
            <div className="dialog">
                <header className="dialog-header">
                    <h1 className="h6">Pay Calculator</h1>
                </header>
                <div className="dialog-body">
                    Select your start and end time:
                </div>
                <div className="dialog-slider">
                    <Slider offset={40} start={'5:00pm'} end={'4:00am'} />
                </div>
                <footer className={`dialog-footer`}>
                    <div className={`h6`}>Today's Pay</div>
                    <div className={`h1`}>$100.00</div>
                </footer>
            </div>
        );
    }
}

// Default properties
Dialog.defaultProps = {};

export default Dialog;
