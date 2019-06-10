window.onload = function ()
{
	//Add logout event
	logoutBtn = document.getElementById("logoutButton");
	logoutBtn.addEventListener("click", e =>
	{
		firebase.auth().signOut();

	})

	// firebase.auth().onAuthStateChanged(firebaseUser =>
	// {
	// 	console.log(firebaseUser)
	// 	if (!firebaseUser) {
	// 		location.href = "login.html";
	// 	}
	// })

};
