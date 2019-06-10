window.onload = function ()
{
	//get elements
	const userEmail = document.getElementById("userEmail");
	const userPassword = document.getElementById("userPassword");
	const loginBtn = document.getElementById("loginButton1");
	// const signUpBtn = document.getElementById("signUpButton");
	const logoutBtn = document.getElementById("logoutButton");

	//Add login event
	loginBtn.addEventListener("click", e =>
	{
		e.preventDefault();
		//Get email and password
		const email = userEmail.value;
		const pass = userPassword.value;
		const auth = firebase.auth();

		//sign in
		const promise = auth.signInWithEmailAndPassword(email, pass);
		promise
			.then(function (user)
			{
				curUser = auth.currentUser;
				var verified = curUser.emailVerified;
				if (verified == true) {
					location.href = "index.html";
				} else {
					window.alert("Email not Verified");
					auth.signOut();
				}
			})
			.catch(e => window.alert(e.message));
	});
	//Add logout event
	// logoutBtn.addEventListener("click", e => {
	// 	firebase.auth().signOut();
	// });
	//Add a realtime listener
	// firebase.auth().onAuthStateChanged(firebaseUser => {
	// 	if (firebaseUser) {
	// 		console.log(firebaseUser);
	// 		// document.getElementById("logoutDiv").classList.remove("hide");
	// 		// document.getElementById("loginDiv").classList.add("hide");
	// 	} else {
	// 		console.log("not logged in");
	// 		// document.getElementById("logoutDiv").classList.add("hide");
	// 		// document.getElementById("loginDiv").classList.remove("hide");
	// 	}
	// });
};
