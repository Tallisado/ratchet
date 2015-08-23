var Q = require("q");
var gitlab = require('gitlab')({
  url:   'http://nest.klipfolio.com',
  token: 'AEJsvP37_SzPzUypfaz4'
});




	var projectList = [];
	var branchList = [];
	var branchLookup;
	var i = 0;
  var branchLookupCtr;



var callback = function(project_name, d, branches) {
  console.log('single branch listing ' +project_name + branches);
  branchLookupCtr++;
  var branch_names = [];
  if (branches == null) return
  for (var j = 0; j < branches.length; j++) {
    branch_names.push(branches[j].name);
  }
  branchLookup.push({branch:project_name, names: branch_names});
  if (branchLookupCtr == projectList.length) {d.resolve(); console.log('last one')}
}

function getBranchData() {
  var deferred1 = Q.defer();
  console.log('start branch');
  branchLookup = [];
  branchLookupCtr = 0;
  for (i = 0; i < projectList.length; i++) {
    gitlab.projects.repository.listBranches(projectList[i].id, callback.bind(this, projectList[i].name, deferred1))
  }
  return deferred1.promise;
}

function getProjects() {
  var deferred = Q.defer();
  console.log('start getProjects');

  gitlab.projects.all(function(projects) {
      projectList = projects;
      console.log('getProjects');
      console.log(projects);
      deferred.resolve();

      //console.log(projects);
  });
  return deferred.promise;
};

function showBranches(a) {
  var deferred3 = Q.defer();
  console.log('show branches : ' + a)
  console.log(branchLookup);
  return deferred3.promise;
}

var get_branches = [getProjects, getBranchData, showBranches]
// run the rpc commands
return get_branches.reduce(function (soFar, f) {
    return soFar.then(f);
}, new Q());
