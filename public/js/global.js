const details = document.getElementById("postDetails");
let jobCount;
let editor;

async function getJobCount() {
	try {
		const res = await firebase.firestore().collection("jobPosts").get();
		jobCount = res.size;
		console.log("jobCount", jobCount);
	} catch (error) {
		console.log(error);
	}
}
getJobCount();
async function createPostCollection() {
	try {
		const res = await firebase
			.firestore()
			.collection("jobPosts")
			.add({
				job_id: jobCount + 1,
				job_title: details["job_title"].value,
				company_name: details["company_name"].value,
				role: details["role"].value,
				job_nature: details["job_nature"].value,
				batch: details["batch"].value,
				eligibility: details["eligibility"].value,
				company_desc: details["company_desc"].value,
				job_desc: editor.getData(),
				apply_link: details["apply_link"].value,
				last_date: details["last_date"].value,
			});
		jobCount++;
		alert("Job Post Created");
	} catch (error) {
		console.log(error);
	}
}

// CkEditor

ClassicEditor.create(document.querySelector("#editor"), {
	toolbar: [
		"heading",
		"|",
		"bold",
		"italic",
		"link",
		"bulletedList",
		"numberedList",
		"blockQuote",
		"undo",
		"redo",
	],
	heading: {
		options: [
			{ model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
			{ model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
			{ model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
		],
	},
})
	.then((newEditor) => {
		editor = newEditor;
	})
	.catch((error) => {
		console.error(error);
	});

// Assuming there is a <button id="submit">Submit</button> in your application.
// document.querySelector("#submit").addEventListener("click", () => {});

const handleSubmit = (e) => {
	console.log(e);
	e.preventDefault();
	const editorData = editor.getData();
	console.log(editorData);
	createPostCollection();
};
