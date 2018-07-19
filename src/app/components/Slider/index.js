/**
 * -----------------------------------------------------------------------------
 * Imports
 * -----------------------------------------------------------------------------
 */
import React, { Component, Fragment } from 'react';
import moment from 'moment';

/**
 * -----------------------------------------------------------------------------
 * React Component: Slider
 * -----------------------------------------------------------------------------
 */

export default class Slider extends Component {
    constructor(props) {
        super(props);

        this.state = { ...this.props };

        this.onMouseDown = this.onMouseDown.bind(this);
        this.onMouseMove = this.onMouseMove.bind(this);
        this.onMouseUp = this.onMouseUp.bind(this);
        this.getTime = this.getTime.bind(this);
        this.update = this.update.bind(this);
        this.labelStart = null;
        this.labelEnd = null;
        this.timeStart = null;
        this.timeEnd = null;
        this.cont = null;
        this.elm = null;
        this.dragStart = 0;
        this.pos = 0;
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

    onMouseDown(e) {
        this.elm = e.currentTarget;
        window.onmouseup = this.onMouseUp;
        window.onmousemove = this.onMouseMove;
        this.dragStart = this.elm.offsetLeft;
        this.pos = e.pageX;

        let id = this.elm.id;

        let label = id === 'timeStart' ? this.labelStart : this.labelEnd;

        if (label) {
            this.labelStart.style.zIndex = 1;
            this.labelEnd.style.zIndex = 1;
            label.style.zIndex = 10;
        }
    }

    onMouseMove(e) {
        e.preventDefault();
        if (!this.elm) {
            return;
        }
        let { offset = 0 } = this.state;
        let delta = window.event.pageX - this.pos;
        let x = this.dragStart + delta;

        let id = this.elm.id;
        let max, min;

        if (id === 'timeStart') {
            min = 0;
            max = this.timeEnd.offsetLeft - this.timeStart.offsetWidth;
        } else {
            min = this.timeStart.offsetLeft + this.timeStart.offsetWidth;
            max = this.cont.offsetWidth - this.timeEnd.offsetWidth;
        }

        x = Math.max(min, x);
        x = Math.min(x, max);

        let percent = x / (this.cont.offsetWidth - this.elm.offsetWidth);
        let time = moment(this.getTime(percent));

        let label = id === 'timeStart' ? this.labelStart : this.labelEnd;

        let st =
            id === 'timeStart'
                ? { start: time.format('h:00a') }
                : { end: time.format('h:00a') };

        if (label) {
            this.labelStart.style.zIndex = 1;
            this.labelEnd.style.zIndex = 1;
            let lx = x - (label.offsetWidth / 2 - this.elm.offsetWidth / 2);
            label.style.left = `${lx}px`;
            label.style.zIndex = 10;
            setTimeout(() => {
                label.style.display = 'block';
            }, 100);
        }

        this.setState(st);
        this.elm.style.left = `${x}px`;
        this.update();
    }

    onMouseUp(e) {
        if (!this.elm) {
            return;
        }

        let x = this.elm.offsetLeft;
        let max = this.cont.offsetWidth - this.elm.offsetWidth;
        let percent = x / max;

        this.elm.onmouseup = null;
        this.elm.onmousemove = null;
        this.elm = null;
        this.dragStart = 0;

        this.update();
    }

    getTime(percent) {
        let { min, max } = this.state;
        min = min.valueOf();
        max = max.valueOf();

        let diff = Math.abs(min - max);
        return Math.ceil(min + percent * diff);
    }

    update() {
        let { start, end, onChange } = this.state;

        if (!start || !end) {
            return;
        }

        if (typeof onChange === 'function') {
            let props = { ...this.state };
            delete props.onChange;
            onChange({ type: 'change', ...props });
        }
    }

    render() {
        let { min, max, start, end } = this.state;

        return (
            <div
                className={`slider`}
                ref={elm => {
                    this.cont = elm;
                }}
            >
                <div
                    id="labelStart"
                    className={`slider-label`}
                    ref={elm => {
                        this.labelStart = elm;
                    }}
                >
                    {start}
                </div>
                <div
                    id="labelEnd"
                    className={`slider-label`}
                    ref={elm => {
                        this.labelEnd = elm;
                    }}
                >
                    {end}
                </div>
                <div
                    id="timeStart"
                    className={`slider-handle`}
                    onMouseDown={this.onMouseDown}
                    draggable={false}
                    ref={elm => {
                        this.timeStart = elm;
                    }}
                />
                <div
                    id="timeStop"
                    className={`slider-handle`}
                    onMouseDown={this.onMouseDown}
                    draggable={false}
                    ref={elm => {
                        this.timeEnd = elm;
                    }}
                />
            </div>
        );
    }
}

Slider.defaultProps = {
    min: moment(new Date('2000-04-22 17:00:00.000')),
    max: moment(new Date('2000-04-23 04:00:00.000')),
    start: null,
    end: null
};
