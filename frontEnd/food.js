// var admin = require("firebase-admin");

// var serviceAccount = require("./ServiceAccount.json");

// admin.initializeApp({
// 	credential: admin.credential.cert(serviceAccount),
// 	databaseURL: "https://yummies-9a5e6.firebaseio.com",
// });

var firebaseConfig = {
	apiKey: "AIzaSyCIRfdq3fY4ny_Cb2cGaH4Ze3rr9FhbFjI",
	authDomain: "yummies-9a5e6.firebaseapp.com",
	databaseURL: "https://yummies-9a5e6.firebaseio.com",
	projectId: "yummies-9a5e6",
	storageBucket: "yummies-9a5e6.appspot.com",
	messagingSenderId: "766610613833",
	appId: "1:766610613833:web:76e2d130e52c0d66",
};

firebase.initializeApp(firebaseConfig);
//variables
var allFood = [];

class food
{
	constructor(foodDesc, foodImage, foodName, upVote)
	{
		this.foodDesc = foodDesc;
		this.foodImage = foodImage;
		this.foodName = foodName;
		this.upVote = upVote;
	}
}
const likeBtn = document.getElementById("like");
const dislikeBtn = document.getElementById("dislike");
function getUrlParam(name)
{
	var results = new RegExp("[?&]" + name + "=([^&#]*)").exec(
		window.location.search,
	);

	return results !== null ? results[1] || 0 : false;
}

//increase Votes
function upVote()
{
	console.log("Before: ", allFood);
	db = firebase.firestore();
	X = 0;
	stateId = getUrlParam("stateId");

	foodRef = db
		.collection("states")
		.doc(stateId)
		.collection("foodList");
	return new Promise((resolve, reject) =>
	{
		console.log(`Updating Votes for: ${stateId}`);
		foodRef
			.get()
			.then(snapshot =>
			{
				snapshot.forEach(doc =>
				{
					// console.log(doc.id, "=>", doc.data());
					x = doc.data().upVote;
					food = doc.data().foodName;
				});
				foodRef.doc(food).update({
					upVote: x + 1,
				});
				document.getElementById("likesDisplay").innerHTML = `Likes: ${x + 1}`;
				resolve(x);
				// getFood().Promise;
				// updateFoodInfo(allFood);
			})
			.catch(err =>
			{
				console.log(err);
				reject("Error getting documents", err);
			});
		// console.log("After: ", allFood);
	});
}

//decrease votes
function downVote()
{
	console.log("Before: ", allFood);
	db = firebase.firestore();
	X = 0;
	stateId = getUrlParam("stateId");

	foodRef = db
		.collection("states")
		.doc(stateId)
		.collection("foodList");
	return new Promise((resolve, reject) =>
	{
		console.log(`Updating Votes for: ${stateId}`);
		foodRef
			.get()
			.then(snapshot =>
			{
				snapshot.forEach(doc =>
				{
					// console.log(doc.id, "=>", doc.data());
					x = doc.data().upVote;
					food = doc.data().foodName;
				});
				foodRef.doc(food).update({
					upVote: x - 1,
				});
				document.getElementById("likesDisplay").innerHTML = `Likes: ${x - 1}`;
				resolve(x);
				// getFood().Promise;
				// updateFoodInfo(allFood);
			})
			.catch(err =>
			{
				console.log(err);
				reject("Error getting documents", err);
			});
		// console.log("After: ", allFood);
	});
}

//gets food data and adds to food list of that state
function getFood()
{
	const stateID = getUrlParam("stateId");
	const db = firebase.firestore();
	allFood = [];
	return new Promise((resolve, reject) =>
	{
		console.log(`Getting food for: ${stateID}`);
		db.collection("states")
			.doc(stateID)
			.collection("foodList")
			.get()
			.then(snapshot =>
			{
				snapshot.forEach(doc =>
				{
					// console.log(doc.id, "=>", doc.data());
					const newFood = new food(
						doc.data().foodDesc,
						doc.data().foodImage,
						doc.data().foodName,
						doc.data().upVote,
					);
					allFood.push(newFood);
				});
				console.log(allFood);
				updateFoodInfo(allFood);

				resolve(allFood);
			})
			.catch(err =>
			{
				console.log(err);
				reject("Error getting documents", err);
			});
	});
}

// updates food info
function updateFoodInfo(allFood)
{
	var i = 0;
	for (i = 0; i < allFood.length; i++) {
		// document.getElementById("foodImage",i).src = allFood[i].foodImage;
		//use child.append to dynamically add div
		document.getElementById("foodImage").src = allFood[i].foodImage;
		document.getElementById("foodName").innerHTML = allFood[i].foodName;
		document.getElementById("foodCaption").innerHTML = allFood[i].foodDesc;
		document.getElementById("likesDisplay").innerHTML =
			"Likes: " + allFood[i].upVote;
	}
	console.log("updateFoodInfo called.");
	// location.reload();
}
