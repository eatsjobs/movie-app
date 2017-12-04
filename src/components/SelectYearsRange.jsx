import React, { Component } from 'react';
import { createSliderWithTooltip } from 'rc-slider';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import { denormalize } from '../lib/utils'

const ToolTipRange = createSliderWithTooltip(Range);

export class SelectYearsRange extends Component {
    constructor(props) {
        super(props);
        this.onAfterChange = this.onAfterChange.bind(this);
        const minYear = 1960;
        const maxYear = new Date().getFullYear();
        this.state = {
            value: [minYear, maxYear],
            minYear: minYear,
            currentYear: maxYear
        }
    }

    onAfterChange(change) {
        const min = denormalize((change[0] / 100), this.state.minYear, this.state.currentYear);
        const max = denormalize((change[1] / 100), this.state.minYear, this.state.currentYear);
        const value = [ Number(min.toFixed()), Number(max.toFixed()) ];
        this.setState({ value });
        this.props.onSelected(value);
    }

    render() { 
        return (<div style={{ display: 'flex', alignItems: 'center', height: '100%'}}>
            <section style={{ textAlign: 'center', width: '85%', margin: '0 auto' }}>
                <div>{this.state.value[0]}</div>
                <ToolTipRange defaultValue={[0, 100]} onAfterChange={this.onAfterChange} />
                <div>{this.state.value[1]}</div>
            </section>
        </div>)
    }
}
 
export default SelectYearsRange;