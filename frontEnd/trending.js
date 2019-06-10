// var firebaseConfig = {
// 	apiKey: "AIzaSyCIRfdq3fY4ny_Cb2cGaH4Ze3rr9FhbFjI",
// 	authDomain: "yummies-9a5e6.firebaseapp.com",
// 	databaseURL: "https://yummies-9a5e6.firebaseio.com",
// 	projectId: "yummies-9a5e6",
// 	storageBucket: "yummies-9a5e6.appspot.com",
// 	messagingSenderId: "766610613833",
// 	appId: "1:766610613833:web:76e2d130e52c0d66",
// };
// firebase.initializeApp(firebaseConfig);

//variables
states = [
	"AL",
	"AK",
	"AZ",
	"AR",
	"CA",
	"CO",
	"CT",
	"DC",
	"DE",
	"FL",
	"GA",
	"HI",
	"ID",
	"IL",
	"IN",
	"IA",
	"KS",
	"KY",
	"LA",
	"ME",
	"MD",
	"MA",
	"MI",
	"MN",
	"MS",
	"MO",
	"MT",
	"NE",
	"NV",
	"NH",
	"NJ",
	"NM",
	"NY",
	"NC",
	"ND",
	"OH",
	"OK",
	"OR",
	"PA",
	"RI",
	"SC",
	"SD",
	"TN",
	"TX",
	"UT",
	"VT",
	"VA",
	"WA",
	"WV",
	"WI",
	"WY",
];


class voteInfo
{
	constructor(foodDesc, foodName, state, upVote)
	{
		this.foodDesc = foodDesc;
		this.foodName = foodName;
		this.upVote = upVote;
		this.state = state;
	}
}

function getTrending()
{
	// console.log("getTrending called");
	getVotesData().then(foodInfo =>
	{
		foodInfo.sort(function (a, b)
		{
			return a.upVote - b.upVote
		})
		foodInfo.reverse();
		//FIXME: for (i = 0; i < 9; i++)
		// console.log("FOODINFO  LENGTH: ", foodInfo.length)
		for (i = 0; i < foodInfo.length; i++) {
			document.getElementById("nameFood" + (i + 1)).innerHTML = foodInfo[i].foodName;
			document.getElementById("stateFood" + (i + 1)).innerHTML = "State:" + foodInfo[i].state;
			document.getElementById("voteFood" + (i + 1)).innerHTML = "Likes:" + foodInfo[i].upVote;
		}
		// console.log("foodInfo: ", foodInfo)
	})
		.catch(err =>
		{
			console.log(err)
		})
}

function getVotesData()
{
	var foodInfo = [];
	const db = firebase.firestore();
	// console.log(db);

	return new Promise((resolve, reject) =>
	{
		for (i = 0; i < states.length; i++) {
			db.collection("states")
				.doc(states[i])
				.collection("foodList")
				.get()
				.then(snapshot =>
				{

					snapshot.forEach(doc =>
					{

						// console.log(doc.id, "=>", doc.data());
						const newFood = new voteInfo(
							doc.data().foodDesc,
							doc.data().foodName,
							doc.data().state,
							doc.data().upVote,
						);
						foodInfo.push(newFood);
					});
					//FIXME: if (foodInfo.length == states.length)
					if (foodInfo.length == states.length) {
						resolve(foodInfo);
					}

				})
				.catch(err =>
				{
					console.log(err);
					reject("Error getting documents", err);
				});
		}

		// maxVotes = votes.sort().slice(0, 9);
	});
}
