import React, { Component } from 'react';

export default class SelectBox extends Component {
  constructor() {
    super();

    this.handleClick = this.handleClick.bind(this);
    this.state = {
      allChecked: false,
      checkedCount: 0,
      options: [
        { value: 'selectAll', text: 'Select All' },
        { value: 'orange', text: 'Orange' },
        { value: 'apple', text: 'Apple' },
        { value: 'grape', text: 'Grape' }
      ]
    };
  }

  handleClick(e) 
  {
    let clickedValue = e.target.value;

    if (clickedValue === 'selectAll' && this.refs.selectAll.getDOMNode().checked) 
    {
        for (let i = 1; i < this.state.options.length; i++) 
        {
            let value = this.state.options[i].value;
            this.refs[value].getDOMNode().checked = true;
        }
        this.setState({
            checkedCount: this.state.options.length - 1
        });

    } 
    else if (clickedValue === 'selectAll' && !this.refs.selectAll.getDOMNode().checked) 
    {
        for (let i = 1; i < this.state.options.length; i++) 
        {
            let value = this.state.options[i].value;
            this.refs[value].getDOMNode().checked = false;
        }
        this.setState({
            checkedCount: 0
        });
    }

    if (clickedValue !== 'selectAll' && this.refs[clickedValue].getDOMNode().checked) 
    {
        this.setState({
            checkedCount: this.state.checkedCount + 1
        });
    } 
    else if (clickedValue !== 'selectAll' && !this.refs[clickedValue].getDOMNode().checked) 
    {
        this.setState({
            checkedCount: this.state.checkedCount - 1
        });
    }
  }

  render() 
  {
    console.log('Selected boxes: ', this.state.checkedCount);

    const options = this.state.options.map(option => {
      return (
        <input onClick={this.handleClick} type='checkbox' name={option.value} key={option.value}
               value={option.value} ref={option.value} > {option.text} </input>
      );
    });


    return (
      <div className='SelectBox'>
        <form>
          {options}
        </form>
      </div>
    );
  }
}