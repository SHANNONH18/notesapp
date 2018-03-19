var { Router,
      Route,
      IndexRoute,
      IndexLink,
      Link } = ReactRouter;

//var SubmitButton = React.createClass({
//    render:function() {
//    var buttonStyle = {
//                    backgroundColor: "#4CAF50",
//                    border: "none",
//                    borderRadius:5,
//                    color: "white",
//                    padding: "10px 32px",
//                    textAlign: "center",
//                    textDecoration: "none",
//                    fontSize: 16,
//                    right: 60,
//                    margin: "0px 0px",
//                    cursor: "pointer"
//            }
//    return (
//     <h2><a style={buttonStyle}>Submit</a></h2>
//     );
//    }
//})
//var NoteForm = React.createClass({
//    render:function() {
//            var noteCardStyle = {
//                height:50,
//                width:"100%",
//                borderRadius: 5,
//                padding:0,
//                margin:10,
//                alignItems : "flex-start",
//                verticalAlign : "center",
//                WebKitFilter: "drop-shadow(0px 0px 5px #666)",
//                filter: "drop-shadow(0px 0px 5px #666)"
//            };
//            return (
//            <div style={noteCardStyle}>
//                <p>Note:<textInput height="20" width="400"/><SubmitButton/></p>
//            </div>
//            );
//        }
//})

var Note = React.createClass({
    render:function() {
        var noteCardStyle = {
            height:100,
            width:"100%",
            borderRadius: 5,
            padding:0,
            margin:10,
            backgroundColor:"#FFF",
            alignItems : "flex-start",
            verticalAlign : "center",
            WebKitFilter: "drop-shadow(0px 0px 5px #666)",
            filter: "drop-shadow(0px 0px 5px #666)"
        };
        return (
        <div style={noteCardStyle}>
            <p>{this.props.note}</p>
        </div>
        );
    }
});

var NotesCard = React.createClass({

  loadNotesFromServer: function() {
    var self = this;
    $.ajax({
        url: "http://localhost:8101/api/notes/all",
      }).then(function(data) {
        self.setState({ notes: data});
      });

  },
  getInitialState: function() {
    return { notes: [] };
  },
  componentDidMount: function() {
    this.loadNotesFromServer();
  },
  render:function() {
          var horizontalBoxStyle = {
              height:"100%",
              width:"100%",
              padding:0,
              backgroundColor:"#2b2727",
              display:"flex",
              alignItems:"initial",
              paddingLeft:20,
              verticalAlign: "top"
          };
    var renderData = [];
    for(var i=0;i<this.state.notes.length;i++){
        var card = <Note note={this.state.notes[i].note}/>
        renderData.push(card);
    }
    return (<div style={horizontalBoxStyle}>{renderData}</div> );
  }
});

var ResourcesPage = React.createClass({
    render:function() {
        return(
            <div>
                 <ul>
                     <li><a href="http://localhost:8101/swagger-ui.html">REST Docs</a></li>
                 </ul>
            </div>
        )
    }
});



var App = React.createClass({
  render:function() {
    return(
    <div>
       <h1>Modern Workstation</h1>
       <ul className="header">
          <li><a>Home</a></li>
          <li><a>Notes</a></li>
        </ul>
        <ResourcesPage/>
        <NotesCard/>
    </div>
    );
  }
});



 ReactDOM.render(
    <div>
        <Router>
            <Route path="/devtools" component={ResourcesPage}/>
        </Router>
        <App />
    </div>,
     document.querySelector("#container")
 );



