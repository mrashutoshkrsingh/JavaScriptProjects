document.getElementById("issueInputForm").addEventListener("submit", saveIssue);
function saveIssue(e) {
  e.preventDefault();
  var issueDesc = document.getElementById("issueDescInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedToInput").value;
  var issueId = chance.guid();
  var issueStatus = "Open";
  var issue = {
    issueDesc,
    issueId,
    issueSeverity,
    issueAssignedTo,
    issueStatus
  };

  if (!localStorage.getItem("issues")) {
    var issues = [];
    issues.push(issue);
    localStorage.setItem("issues", JSON.stringify(issues));
  } else {
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues = [...issues, issue];
    localStorage.setItem("issues", JSON.stringify(issues));
  }
  document.getElementById("issueInputForm").reset();
  fetchIssues();
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem("issues"));
  if (!issues) return;
  //console.log(issues)
  document.getElementById("issuesList").innerHTML = "";
  for (var i = 0; i < issues.length; i++) {
    var {
      issueDesc,
      issueId,
      issueSeverity,
      issueAssignedTo,
      issueStatus
    } = issues[i];
    document.getElementById("issuesList").innerHTML += `
		<div class="well">
				<h6>Issue ID ${issueId}</h6>
				<p><span class="label label-info">${issueStatus}</span></p>
				<h3>${issueDesc}</h3>
				<p><span class="glyphicon glyphicon-time"></span>${issueSeverity}</p>
				<p><span class="glyphicon glyphicon-user"></span>${issueAssignedTo}</p>
				<a href="javascript:void(0);" onclick="setStatusClosed(\'${issueId}\')" class="btn btn-warning">Close</a>
				<a href="javascript:void(0);" onclick="deleteIssue(\'${issueId}\')" class="btn btn-danger">Delete</a>
			</div>
		`;
  }
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));
  for (var i = 0; i < issues.length; i++) {
    if (issues[i].issueId === id) {
      issues[i].issueStatus = "Closed";
      console.log(1);
    }
  }
  //console.log(issues);
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}
function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));
  issues = issues.filter(issue => {
    return issue.issueId != id;
  });
  //console.log(issues);
  localStorage.setItem("issues", JSON.stringify(issues));
  fetchIssues();
}
