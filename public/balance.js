require('dotenv').config();
function Balance(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="info"
      header="Balance"
      status={status}
      body={show ?
        <BalanceForm setShow={setShow} setStatus={setStatus}/> :
        <BalanceMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )

}

function BalanceMsg(props){
  return(<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
        props.setShow(true);
        props.setStatus('');
      }}>
        Check balance again
    </button>
  </>);
}

function BalanceForm(props){
  const [email, setEmail]   = React.useState('');
  const [balance, setBalance] = React.useState('');  

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

    firebase.auth().currentUser.getIdToken()
      .then(idToken => {
        fetch(`/account/findOne/${email}`, 
            {
              method: "GET",
              headers: {
                "Authorization" : idToken
              }
            })
      .then(response => response.json())
      .then(text => {
        try {
            props.setStatus("Your balance is: $" + text.balance);
            props.setShow(false);
            setBalance(text.balance);
            console.log('JSON:', text);
        } catch(err) {
            props.setStatus(text)
            console.log('err:', text);
        }
    });
      })
    }

  return (<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} 
      onChange={e => setEmail(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>
        Check Balance
    </button>

  </>);
}