import React, { Component } from 'react';
import { 
    Radio
    , List
    , ListItem
    , ListHeader
} from 'react-onsenui';

export class RadioSelect extends Component {
    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
        this.renderRadioRow = this.renderRadioRow.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.state = {            
            selected: this.props.choices[0]
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.choices !== this.state.choices) {
            this.setState({ choices: nextProps.choices });
        }
    }

    handleSelection(selection) {        
        this.setState({ selected: selection }, () => this.props.onSelected(this.state.selected) );        
    }

    renderRadioRow(row) {
        
        const copy = row.split('');
        copy[0] = copy[0].toLocaleUpperCase();
        return (<ListItem key={row} tappable>
            <label className='left'>
            <Radio
                inputId={`radio-${row}`}
                checked={row === this.state.selected}
                onChange={this.handleSelection.bind(this, row)}
            />
            </label>
            <label htmlFor={`radio-${row}`} className='center'>
            {copy.join('')}
            </label>
        </ListItem>);
    }

    renderHeader() {
        return (<ListHeader>{this.props.title}</ListHeader>);
    }

    render() { 
        return (
        <div>
            <List
                dataSource={this.props.choices}
                renderHeader={this.renderHeader}
                renderRow={this.renderRadioRow}
            />
        </div>)
    }
}
 
export default RadioSelect;