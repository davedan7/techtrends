// 'rails react router' <- google
var Charts = React.createClass({
   getInitialState: function() {
    return {loading: true}
  },

  componentDidMount: function(){
    var url = "https://pipes.yahoo.com/pipes/pipe.run?_id=9cb44301dcece96db1d28de6959bd25c&_render=json&locationinput1="
    var fullUrl =  url + this.props.zipcode + '&textinput2=web+developer';
    $.getJSON(fullUrl).done(function(data){
      data.loading = false
      this.setState(data)
    }.bind(this))
  },

  render: function() {
    debugger
    return (<div>{JSON.stringify(this.state)}</div>) // if laoding, show laoding spin
  }
});
