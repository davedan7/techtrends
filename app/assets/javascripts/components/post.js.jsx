// e.currentTarget.form.elements.zipcode.value
// $(e.currentTarget.form).serializeArray()[0].value

var Post = React.createClass({
  propTypes: { // used for sharing components
    name: React.PropTypes.string,
  },

  getInitialState: function (){
    return {
      zipcode: false
    }
  },

  submitSearch: function (e){
    e.preventDefault();
    this.setState({zipcode: e.currentTarget.form.elements.zipcode.value})
  },

  render: function() {
    var charts
    if (this.state.zipcode) {
      charts = <Charts zipcode={this.state.zipcode} />
    } else {
      charts = "" // loading ? 
    }
    return (
      <div className="container" id="search-field">
        <div className="row">
          <form className="center col s4 offset-s4">
            <input name='zipcode' type="text" className="center-align" placeholder="Insert Your Zip Code" required />
            <button onClick={this.submitSearch} className="waves-effect waves-light btn z-depth-2 yellow darken-1 black-text">
              Submit</button>
            <p className="center-align">
            <a className="tooltipped black-text" data-position="bottom" data-delay="50" data-tooltip="Put in your zip code and hit submit to see current language trends.">Need help?</a>
            </p>
          </form>
        </div>
        <div className="center row">
          <h5 className="medium job-chart">Developer jobs in {this.state.zipcocde}</h5>
          {charts}
        </div>
      </div>
    );
  }
});
