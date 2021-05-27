const Toggle = React.createClass({
  getInitialState () {
      return {
          isChecked: false
      };
  },
  
  componentWillMount () {
      this.id = `toggle_${Math.random().toString().replace(/0\./, '')}`;
  },
   
  handleChange () {
      this.setState({isChecked: !this.state.isChecked});
      console.log('CHANGE!');
  },
   
  render () {
      return (
         <div>
              <input onChange={this.handleChange} id={this.id} type="checkbox" checked={this.state.isChecked} />
              <label htmlFor={this.id}>Label</label>
         </div>
     );
 } 
});

ReactDOM.render(<Toggle />, document.body); 