import React, { Component } from "react";
import classes from "./App.css";
import Person from "../components/Persons/Person/Person";
import ErrorBoundary from "../components/ErrorBoundary/ErrorBoundary";

// App Component as class base Component
class App extends Component {
  state = {
    persons: [
      { id:'a', name: "Rutwik", age: 21 },
      { id:'b', name: "Zansi", age: 16 },
      { id:'c', name: "Sanket", age: 22 },
      { id:'d', name: "Bansi", age: 18 }
    ],
    otherKey: "Some Other Value",
    showPerson: false
  };

  nameChangeHandler = (event, id) => {
    const personIndex = this.state.persons.findIndex( p => {
      return p.id === id;
    })
    console.log(personIndex);
    // change the name of found person in state
    const person = {...this.state.persons[personIndex]};
    //const person = Object.assign({},this.state.persons[personIndex])
    person.name = event.target.value;

    //change in array
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({
      persons: persons
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

    let persons =null;

    let btnClass = '';

    if(this.state.showPerson){

      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return(<ErrorBoundary>
              <Person 
              name={person.name} 
              age={person.age}
              key={person.id}
              click={() => this.deletePersonHandler(index)}
              changed={(event) => this.nameChangeHandler(event, person.id)}/>
              </ErrorBoundary>
            );
          })}
        </div>
      );

      btnClass=classes.Red;
    }

    const assignedclasses = []; //"red bold"

    if(this.state.persons.length <= 2)  {
      assignedclasses.push(classes.red); //classes = [red]
    }
    if(this.state.persons.length <= 1) {
      assignedclasses.push(classes.bold); //classes = [red bold]
    }


    return (
      
      <div className={classes.App}>
        <h1>Hi I'm React App</h1>
        <p className={assignedclasses.join(' ')}>This is working</p>
        <button className={btnClass}
          onClick={this.togglePersonsHandler}>
            Toggle 
        </button>
        {persons}
      </div>
      
    );
  }
}

export default App;


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