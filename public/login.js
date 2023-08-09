function Login(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');    

  const userName = "Calvin";

  return (
    <Card
      bgcolor="secondary"
      header="Login"
      status={status}
      body={show ? 
        <LoginForm setShow={setShow} setStatus={setStatus}/> :
        <LoginMsg setShow={setShow} setStatus={setStatus}/>}
    />
  ) 
}

function LoginMsg(props){
  const firebaseConfig = {
    apiKey: "AIzaSyBfwMhKc976j8a1zpyx4L4svhaqntxLA24",
    authDomain: "badbank-30585.firebaseapp.com",
    projectId: "badbank-30585",
    storageBucket: "badbank-30585.appspot.com",
    messagingSenderId: "551020157674",
    appId: "1:551020157674:web:c40fb2dc6d0629cac79593",
    measurementId: "G-1GG061JLZ7"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }
  
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        }}>
        Authenticate again
    </button><br/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true)
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          props.setStatus("You are logged out")
        }).catch((error) => {
          // An error happened.
          props.setStatus("Log Out Failed")
        });
        }}>
        Log out
    </button>
  </>);
}

function LoginForm(props){
  const [email, setEmail]       = React.useState('');
  const [password, setPassword] = React.useState('');

  const firebaseConfig = {
    apiKey: "AIzaSyBfwMhKc976j8a1zpyx4L4svhaqntxLA24",
    authDomain: "badbank-30585.firebaseapp.com",
    projectId: "badbank-30585",
    storageBucket: "badbank-30585.appspot.com",
    messagingSenderId: "551020157674",
    appId: "1:551020157674:web:c40fb2dc6d0629cac79593",
    measurementId: "G-1GG061JLZ7"
  };

  if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
  }

  function handle(){
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, password);
    props.setStatus('Log In Successful');
    props.setShow(false);
    promise.catch(err => {
      props.setStatus("Log In Failed")
    })
  }


  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    Password<br/>
    <input type="password" 
      className="form-control" 
      placeholder="Enter password" 
      value={password} 
      onChange={e => setPassword(e.currentTarget.value)}/><br/>

    <button type="submit" className="btn btn-light" onClick={handle}>Login</button><br/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true)
        firebase.auth().signOut().then(() => {
          // Sign-out successful.
          props.setStatus("You are logged out")
        }).catch((error) => {
          // An error happened.
          props.setStatus("Log Out Failed")
        });
        }}>
        Log out
    </button>
   
  </>);
}