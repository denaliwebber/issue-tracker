document.getElementById("issueInputForm").addEventListener("submit", saveIssue);

function saveIssue(e) {
  var issueID = chance.guid(); //produce a unique id for issue
  var issueDescription = document.getElementById("issueDescriptionInput").value;
  var issueSeverity = document.getElementById("issueSeverityInput").value;
  var issueAssignedTo = document.getElementById("issueAssignedInput").value;

  var issueStatus = "Open";

  var issue = {
    id : issueID,
    description : issueDescription,
    severity : issueSeverity,
    assignedTo : issueAssignedTo,
    status : issueStatus
  }

  // if no issues, create issue array and add to local storage
  if(localStorage.getItem("issues") === null) {
    var issues = [];
    issues.add(issue);
    localStorage.set("issues", JSON.stringify(issues));
  } else { // add issue to exsisting issue array
    var issues = JSON.parse(localStorage.getItem("issues"));
    issues.push(issue);
    localStorage.set("issues", JSON.stringify(issues));
  }

  document.getElementById("issueInputForm").reset(); //empty the form

  fetchIssues(); // re-generates list output so new issue will be visible

  e.preventDefault(); // avoids the default submission of form
}

function setStatusClosed(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues[i].status = "Closed";
    }
  }

  //update issues in local storage with closed issue
  localStorage.set("issues", JSON.stringify(issues));

  fetchIssues(); // re-generates list output so edited issue will be visible
}

function deleteIssue(id) {
  var issues = JSON.parse(localStorage.getItem("issues"));

  for (var i = 0; i < issues.length; i++) {
    if (issues[i].id == id) {
      issues.splice(i, 1); //removes issue
    }
  }

  //update issues with the removed issue in local storage
  localStorage.set("issues", JSON.stringify(issues));

  fetchIssues(); // re-generates list output so edited issue list will be visible
}

function fetchIssues() {
  var issues = JSON.parse(localStorage.getItem("issues"));
  var issueList = document.getElementById("issueList");

  issueList.innerHTML = "";

  for (var i = 0; i < issues.length; i++) {
    var id = issues[i].id;
    var description = issues[i].description;
    var severity = issues[i].severity;
    var assignedTo = issues[i].assignedTo;
    var status = issues[i].status;

    issueList.innerHTML += '<div class="well">' + '<h6>Issue ID: ' + id + '</h6>' + '<p><span class="label label-info">' + status + '</span></p>' + '<h3>' + description + '</h3>' + '<p><span class="glyphicon glyphicon-time"></span> ' + severity + '<p><span class="glyphicon glyphicon-user"></span> ' + assignedTo + '</p>' + '<a href="#" class="btn btn-warning" onclick="setStatusClosed(\'' + id +'\')">Close</a> ' + '<a href="#" class="btn btn-danger" onclick="deleteIssue(\'' + id + '\')">Delete</a>' + '</div>';
  }
}
