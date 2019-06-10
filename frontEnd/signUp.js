
//init firestore
var admin = require("firebase-admin");

var serviceAccount = require("./ServiceAccount.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL: "https://yummies-9a5e6.firebaseio.com",
});
window.onload = function ()
{
	//get elements
	const userFirstName = document.getElementById("userFirstName");
	const userMidName = document.getElementById("userMiddleName");
	const userLastName = document.getElementById("userLastName");
	const userBirthDay = document.getElementById("day");
	const userBirthMonth = document.getElementById("month");
	const userBirthYear = document.getElementById("year");
	const userEmail = document.getElementById("userEmail");
	const userPassword = document.getElementById("userPassword");
	const signUpBtn = document.getElementById("signUpButton");

	//Add signup event
	signUpBtn.addEventListener("click", e =>
	{
		//Get email and password
		const email = userEmail.value;
		const pass = userPassword.value;
		const auth = firebase.auth();
		//SignUp
		const promise = auth.createUserWithEmailAndPassword(email, pass);
		promise.catch(e => console.log(e.message));
		//Check for correct email
		sendVerification(auth);
		addUser();
	});

	//Verify email
	function sendVerification(auth)
	{
		var user = auth.currentUser;
		console.log(user);
		user
			.sendEmailVerification()
			.then(function ()
			{
				// Email sent.
				window.location.href = "login.html";
				window.alert("Verification Email Sent!");
			})
			.catch(function (error)
			{
				// An error happened.
				window.alert("Error: " + error.message);
			});
	}
	function addUser()
	{
		var user = firebase.auth().currentUser;
		var db = admin.firestore();

		db.collection("users")
			.add({
				first: userFirstName,
				mid: userMidName,
				last: userLastName,
				// born: userBirthMonth+"/"+userBirthDay+"/"userBirthYear ,
				UID: user.uid,
			})
			.then(function (docRef)
			{
				console.log("Document written with ID: ", docRef.id);
			})
			.catch(function (error)
			{
				console.error("Error adding document: ", error);
			});
	}
};
