/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import Slider from 'components/Slider';
import calc from 'components/Calculator/calculate';
import { Helmet } from 'react-helmet';

/**
 * -----------------------------------------------------------------------------
 * React Component: Calculator
 * -----------------------------------------------------------------------------
 */

export default class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = { ...this.props };
        this.onChange = this.onChange.bind(this);
    }

    componentDidMount() {
        if (this.state.hasOwnProperty('mount')) {
            this.state.mount(this);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(prevState => ({
            ...prevState,
            ...nextProps
        }));
    }

    onChange(e) {
        let { start, end } = e;
        let data = calc({ start, end });
        let pay = data.pay.total;

        this.setState({ pay, data, start, end });
    }

    moneyFormat(x) {
        return Number(x)
            .toFixed(2)
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

    render() {
        let { pay = 0, start, end, data, labels } = this.state;
        pay = this.moneyFormat(pay);

        return (
            <Fragment>
                <Helmet>
                    <title>Pay Calculator</title>
                    <meta
                        name="description"
                        content="Pay calculator code challenge"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1, maximum-scale=1"
                    />
                    <html lang="en" />
                </Helmet>
                <main role="main">
                    <div className="dialog">
                        {!data ? null : (
                            <aside className="dialog-aside">
                                <ul>
                                    <li>
                                        <span
                                            className={
                                                'dialog-aside-label heading'
                                            }
                                        >
                                            Rate
                                        </span>
                                        <span
                                            className={
                                                'dialog-aside-hours heading'
                                            }
                                        >
                                            Hrs
                                        </span>
                                        <span
                                            className={
                                                'dialog-aside-total heading'
                                            }
                                        >
                                            Total
                                        </span>
                                    </li>
                                    {Object.keys(data.scale).map((k, i) => {
                                        return (
                                            <li key={`totals-${i}`}>
                                                <span
                                                    className={
                                                        'dialog-aside-label'
                                                    }
                                                >
                                                    {labels[k]}
                                                </span>
                                                <span
                                                    className={
                                                        'dialog-aside-hours'
                                                    }
                                                >
                                                    {data.hours[k]}
                                                </span>
                                                <span
                                                    className={
                                                        'dialog-aside-total'
                                                    }
                                                >
                                                    ${this.moneyFormat(
                                                        data.pay[k]
                                                    )}
                                                </span>
                                            </li>
                                        );
                                    })}
                                </ul>
                            </aside>
                        )}
                        <header className="dialog-header">
                            <h1 className="h6">Pay Calculator</h1>
                        </header>
                        <div className="dialog-body">
                            Select your start and end time:
                        </div>
                        <div className="dialog-slider">
                            <Slider
                                onChange={this.onChange}
                                start={start}
                                end={end}
                            />
                        </div>
                        <footer className="dialog-footer">
                            {!pay ? null : (
                                <Fragment>
                                    <div className="h6">Total Pay</div>
                                    <div className="h1">${pay}</div>
                                </Fragment>
                            )}
                        </footer>
                    </div>
                </main>
            </Fragment>
        );
    }
}

Calculator.defaultProps = {
    pay: 0.0,
    labels: {
        reg: 'Base',
        bed: 'Bedtime',
        over: 'Overtime'
    }
};
