firebase.auth().onAuthStateChanged(firebaseUser =>
{
  if (firebaseUser) {
    console.log(firebaseUser);
    document.getElementById("logoutDiv").classList.remove("hide");
    document.getElementById("loginDiv").classList.add("hide");
  }
  else {
    // console.log("not logged in");
    document.getElementById("logoutDiv").classList.add("hide");
    document.getElementById("loginDiv").classList.remove("hide");
    // if (!firebaseUser) {
    //   location.href = "login.html";
    // }
  }
});