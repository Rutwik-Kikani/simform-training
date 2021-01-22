import React, { Component } from "react";
import classes from "./App.css";
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import Aux from '../hoc/Auxiliary';
import withClass from '../hoc/withClass';

// App Component as class base Component
class App extends Component {

  constructor(props){
    super(props);
    console.log('[App.js] constructor');
  }

  state = {
    persons: [
      { id:'a', name: "Rutwik", age: 21 },
      { id:'b', name: "Zansi", age: 16 },
      { id:'c', name: "Sanket", age: 22 },
      { id:'d', name: "Bansi", age: 18 }
    ],
    otherKey: "Some Other Value",
    showPerson: false,
    showCockpit: true,
    changeCounter: 0,
  };

  static getDerivedStateFromProps(props, state){
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }
  
  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps,nextState){
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate(){
    console.log('[App.js] componentDidUpdate');
  }

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( p => p.id === id )
    // change the name of found person in state
    const person = {...this.state.persons[personIndex]};
    //const person = Object.assign({},this.state.persons[personIndex])
    person.name = event.target.value;

    //change in array
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    //better way to update state that depend on old state
    this.setState((prevState, props) => {
      return{
        persons: persons,
        changeCounter: prevState.changeCounter+1,
      }
    });
  }

  deletePersonHandler = (personIndex) => {
    // const persons = this.state.persons; //persons is pointer to state.persons don't dp this.
    //create copy and then update state
    // const person = this.state.persons.splice();
    const persons = [...this.state.persons];
    persons.splice(personIndex,1); //see the splice documentation on mnd
    // console.log(persons)
    this.setState({persons: persons});
  }

  togglePersonsHandler = () => {
    const doesShow = this.state.showPerson;
    this.setState({showPerson: !doesShow});
  }

  

  render() {
    console.log('[App.js] rendering...')
    let persons =null;

    

    if(this.state.showPerson){

      persons = (        
           <Persons
           persons={this.state.persons}
           clicked={this.deletePersonHandler}
           changed={this.nameChangeHandler} />         
      );
   
    }

    

    return (
      
      <Aux classes={classes.App}>
        <button onClick={() => {this.setState({showCockpit:false})}}/>
        {this.state.showCockpit?<Cockpit
        title={this.props.appTitle}
        personsLength={this.state.persons.length}
        showPerson={this.state.showPerson}
        clicked={this.togglePersonsHandler}/>:null}
        {persons}
      </Aux>
        
      
      
    );
  }
}

export default withClass(App,classes.App);


/*
//  app component with function base component
 const app = (props) => {
  const [personsState, setPersonsState] = useState({
    persons: [
      { name: "Rutwik", age: 21 },
      { name: "Zansi", age: 16 },
      { name: "Sanket", age: 22 },
      { name: "Bansi", age: 18 },
    ],
  });

  const [otherState, setOtherState] = useState({otherKey: "otherValue"})

  console.log(personsState, otherState);

  const switchButtonHandler = () => {
    // console.log('was Clicked');
    // Don't Do thisthis.state.persons[0].name = "Rakesh";
    setPersonsState({
      persons: [
        { name: "Naruto", age: 20 },
        { name: "Vegeta", age: 15 },
        { name: "Goku", age: 20 },
        { name: "Natsu", age: 15 },
      ],

    });
  };

  return (
    <div className="App">
      <h1>Hello I Am React App</h1>
      <p>This is working</p>
      <button onClick={switchButtonHandler}>Switch Name</button>
      <Person name={personsState.persons[0].name} age={personsState.persons[0].age}>
        Hobbies: Racing, Art, Dance
      </Person>
      <Person name={personsState.persons[1].name} age={personsState.persons[1].age}/>
      <Person name={personsState.persons[2].name} age={personsState.persons[2].age}/>
      <Person name={personsState.persons[3].name} age={personsState.persons[3].age}/>
    </div>
    // return React.createElement('div',{className:'App'},React.createElement('h1',null,'Hello I Am React App'));
  );
};

export default app;
*/