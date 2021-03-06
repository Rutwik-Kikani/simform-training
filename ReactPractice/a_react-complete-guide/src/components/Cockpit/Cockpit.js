import React, { useEffect, useRef, useContext} from 'react';

import classes from './Cockpit.css';
import AuthContext from '../../context/auth-context';
const Cockpit = props => {

  const toogleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);


  console.log(authContext.authenticated);

  useEffect(() => {
    console.log('[Cockpit.js] useEffect');
    // Http request...
    // setTimeout(() => {
    //   alert('Saved data to cloud!');
    // }, 1000);
    toogleBtnRef.current.click();
    return () => {
      console.log('[Cockpit.js] cleanup work in useEffect');
    };
  }, []);

  useEffect(() => {
    console.log('[Cockpit.js] 2nd useEffect');
    return () => {
      console.log('[Cockpit.js] cleanup work in 2nd useEffect');
    };
  });

  // useEffect();

  const assignedClasses = [];
  let btnClass = '';
  if (props.showPersons) {
    btnClass = classes.Red;
  }

  if (props.personsLength <= 2) {
    assignedClasses.push(classes.red); // classes = ['red']
  }
  if (props.personsLength <= 1) {
    assignedClasses.push(classes.bold); // classes = ['red', 'bold']
  }

  return (
    <div className={classes.Cockpit}>
      <h1>{props.title}</h1>
      <p className={assignedClasses.join(' ')}>This is really working!</p>
      <button className={btnClass} onClick={props.clicked} ref={toogleBtnRef}>
        Toggle Persons
      </button>
      {/* <AuthContext.Consumer>
        {
          (context) => <button onClick={context.login} >Login</button>
        }
      </AuthContext.Consumer> */}
      <button onClick={authContext.login} >Login</button>
    </div>
  );
};

export default React.memo(Cockpit);
