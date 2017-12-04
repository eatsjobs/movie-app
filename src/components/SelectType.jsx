import React, { Component } from 'react';
import { 
    Radio
    , List
    , ListItem
    , ListHeader
} from 'react-onsenui';

export class SelectType extends Component {
    constructor(props) {
        super(props);
        this.handleSelection = this.handleSelection.bind(this);
        this.renderRadioRow = this.renderRadioRow.bind(this);
        this.state = {
            choices: ['movies', 'series'],
            selected: 'movies'
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

    render() { 
        return (
        <div>
            <List
                dataSource={this.state.choices}
                renderHeader={() => <ListHeader>Choose the type</ListHeader>}
                renderRow={this.renderRadioRow}
            />           
        </div>)
    }
}
 
export default SelectType;