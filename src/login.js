import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import fire from './config/fire';
import { connect } from "react-redux";
import { login, } from './redux/Shopping/shopping-actions';
const LoginPage=({login,loggedIn})=>{

	const [user,setUser]=useState('')
    const [email,setEmail]=useState('');
	const [password,setPassword]=useState('');
	const [emailError,setEmailError]=useState('');
	const [passwordError,setPasswordError]=useState('');
	const [hasAccount,setHasAccount]=useState(false);
	let history = useHistory();
	useEffect(()=>{
		authListner()
		console.log(loggedIn)
	},[]);
    const OVERLAY_STYLES = {
		position: 'fixed',
		top: 100,
		left: 400,
		right: 400,
		bottom: 200,
		backgroundColor: 'darkgrey',
		zIndex: 1000,
		padding:20,
	};
	const clearUser=()=>{
		setEmail('');
		setPassword('');
	}
	const clearError=()=>{
		setEmailError('');
		setPasswordError('');
	}
    const handleLogin=(event,email,password)=>{
		event.preventDefault();
		clearError();
		setEmail(email);
		setPassword(password);
		console.log(email);
		handleLoginFire();
		console.log(authListner());
		login();
		//props.loginFunc();	
		history.push('/');
	}
	const handleLoginFire=()=>{
		fire.auth().signInWithEmailAndPassword(email,password).catch(err=>{
			switch(err.code){
				case 'auth/invalid-email':
				case 'auth/user-disabled':
				case 'auth/user-not-found':
					setEmailError(err.message);
				break;
				case 'auth/wrong-password':
					setPasswordError(err.message);
				break;
			}
		})
		 console.log(fire.auth().signInWithEmailAndPassword(email,password));
	 

		//setTimeout(()=>{window.location.replace('/')},2000);
	}
	const handleSignin=(event,email,password)=>{
		event.preventDefault();
		clearError();
		setPassword(password);
		setEmail(email);
		handleFire();
		setHasAccount(true);
	}
	const handleFire=()=>{
		fire.auth().createUserWithEmailAndPassword(email,password).catch(err=>{
			switch(err.code){
				case 'auth/email-already-in-use':
				case 'auth/argument-error':
					setEmailError(err.message);
				break;
				case 'auth/weak-password':
					setPasswordError(err.message);
				break;
			}
		})
	}
	const authListner=()=>{
		fire.auth().onAuthStateChanged((user)=>{
			if(user){
				clearUser();
				setUser(user);
				
			}
			else{
				setUser('')
			}
		})
	}
    return(
        <div>
            <>
            <div style={OVERLAY_STYLES}>
						<p className="login-logo text-center">Shopping Cart</p>
						<p className="login-welcome mt-3">Welcome back</p>
						<input
							className="form-control login-input mt-3"
							placeholder="Email"
							type="text"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<p className="errorMessage">{emailError}</p>
						<input
							className="form-control login-input mt-3"
							placeholder="Password"
							type="password"
							value={password}
							onChange={(e) => {
								setPassword(e.target.value);
							}}
						/>
						<p className="errorMessage">{passwordError}</p>
						<p className="login-small text-left text-light mt-1">
							<input type="checkbox" defaultChecked={true} /> Remember me
						</p>
						<div>{
							hasAccount?(<>
							<button className="btn login-btn text-center mx-auto mt-2" onClick={handleSignin} >
							SignIn
						</button>
						<p onClick={()=>{setHasAccount(!hasAccount)}}>Already have an account?LogIn</p>
							</>):(<>
								<button className="btn login-btn text-center mx-auto mt-2" onClick={handleLogin} >
							Login
						</button>
						<p><span onClick={()=>{setHasAccount(!hasAccount)}}>Dont have an account?SignIn</span></p>
							</>)
							}</div>
                        </div>
					</>
        </div>
    )
}

  
  const mapDispatchToProps = (dispatch) => {
	return {
	  login: () => dispatch(login()),
	};
  };
  
  export default connect(null, mapDispatchToProps)(LoginPage);