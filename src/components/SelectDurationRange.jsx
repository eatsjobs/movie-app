import React, { Component } from 'react';
import { createSliderWithTooltip } from 'rc-slider';
import Range from 'rc-slider/lib/Range';
import 'rc-slider/assets/index.css';
import { denormalize, normalize } from '../lib/utils'
const ToolTipRange = createSliderWithTooltip(Range);

export class SelectDurationRange extends Component {
    constructor(props) {
        super(props);
        this.onAfterChange = this.onAfterChange.bind(this);
        const minDuration = 0;
        const maxDuration = 60 * 4;
        this.state = {
            value: [ minDuration, maxDuration ],
            minDuration,
            maxDuration
        }
    }

    onAfterChange(change) {
        const min = denormalize((change[0] / 100), this.state.minDuration, this.state.maxDuration);
        const max = denormalize((change[1] / 100), this.state.minDuration, this.state.maxDuration);
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
 
export default SelectDurationRange;