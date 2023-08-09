function Deposit(){
  const [show, setShow]     = React.useState(true);
  const [status, setStatus] = React.useState('');  

  return (
    <Card
      bgcolor="warning"
      header="Deposit"
      status={status}
      body={show ? 
        <DepositForm setShow={setShow} setStatus={setStatus}/> :
        <DepositMsg setShow={setShow} setStatus={setStatus}/>}
    />
  )
}

function DepositMsg(props){
  return (<>
    <h5>Success</h5>
    <button type="submit" 
      className="btn btn-light" 
      onClick={() => {
          props.setShow(true);
          props.setStatus('');
      }}>
        Deposit again
    </button>
  </>);
} 

function DepositForm(props){
  const [email, setEmail]   = React.useState('');
  const [amount, setAmount] = React.useState('');

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
      fetch(`/account/update/${email}/${amount}`,
        {
          method: "GET",
          headers: {
            "Authorization" : idToken
        }
      })
      .then(response => response.text()) 
      .then(text => {
        try {
            const data = JSON.parse(text);
            props.setStatus("Success! Your new balance is: $" + JSON.stringify(data.value.balance));//JSON.stringify(data.value)
            props.setShow(false);
            console.log('JSON:', data);
        } catch(err) {
            props.setStatus('Deposit failed')
            console.log('err:', text);
          }
        }); 
      });
  }

  return(<>

    Email<br/>
    <input type="input" 
      className="form-control" 
      placeholder="Enter email" 
      value={email} onChange={e => setEmail(e.currentTarget.value)}/><br/>
      
    Amount<br/>
    <input type="number" 
      className="form-control" 
      placeholder="Enter amount" 
      value={amount} onChange={e => setAmount(e.currentTarget.value)}/><br/>

    <button type="submit" 
      className="btn btn-light" 
      onClick={handle}>Deposit</button>

  </>);
}