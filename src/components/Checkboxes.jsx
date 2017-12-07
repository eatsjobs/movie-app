import React, { Component } from 'react';
import { 
    Checkbox
    , List
    , ListItem
    , ListHeader
} from 'react-onsenui';

export default class Checkboxes extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.renderHeader = this.renderHeader.bind(this);
        this.renderRow = this.renderRow.bind(this);
        this.selectedTypes = new Set();
    }

    handleChange (row) {
        if (this.selectedTypes.has(row)) {
            this.selectedTypes.delete(row);
        } else {
            this.selectedTypes.add(row);
        }
        this.props.onSelected([...this.selectedTypes]);
    }

    renderRow(row) {
        return (
            <ListItem key={row} tappable>
              <label className='left'>
                <Checkbox
                  inputId={`checkbox-${row}`}
                  onChange={this.handleChange.bind(this, row)}                  
                />
              </label>
              <label htmlFor={`checkbox-${row}`} className='center'>
                {row}
              </label>
            </ListItem>
          )
    }

    renderHeader() {
        return (<ListHeader>{this.props.title}</ListHeader>);
    }

    render() {
        return(
            <List
                dataSource={this.props.data}
                renderHeader={this.renderHeader}
                renderRow={this.renderRow}
          />
        )
    }
}