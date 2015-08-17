var Q = require("q");
var gitlab = require('gitlab')({
  url:   'http://nest.klipfolio.com',
  token: 'PLtNzzk8NTrozqxCFyGy'
});



var projectList = [];
var branchList = [];
var branchLookup = [];
var i = 0;

function getBranchData() {
  var deferred1 = Q.defer();
  console.log('start branch');
  for (i = 0; i < projectList.length; i++) {
    gitlab.projects.repository.listBranches(projectList[i].id, function(branches) {
      var branch_names = [];
      for (var j = 0; j < branches.length; j++) {
        branch_names.push(branches[j].name);
      }
      branchLookup.push({branch:arguments[1], names: branch_names});
      if (branchLookup.length == projectList.length) {deferred1.resolve(); console.log('last one')}
    })
  }
  return deferred1.promise;
}

function addBranchData(data, aa){
  console.
}


function getProjects() {
  var deferred = Q.defer();
  console.log('start getProjects');

  gitlab.projects.all(function(projects) {
      projectList = projects;
      console.log('getProjects');
      deferred.resolve();

      //console.log(projects);
  });
  return deferred.promise;
};

function showBranches() {
  var deferred3 = Q.defer();

  for (var i = 0; i < projectList.length; i++) {
    branchLookup[i].branch = projectList[i].name
  }

  console.log('show branches')
  console.log(branchLookup);
  return deferred3.promise;
}

var get_branches = [getProjects, getBranchData, showBranches]
// run the rpc commands
return get_branches.reduce(function (soFar, f) {
    return soFar.then(f);
}, Q());


//
// var getProjects = function() {
//     gitlab.projects.all(function(projects) {
//         projectList = projects;
//     });
// };
//
// var getBranchData = function(projects) {
//   for (var i = 0; i < projects.length; i++) {
//     gitlab.projects.repository.listBranches(projects[i].id, function(branches) {
//       var branch_names = [];
//       for (var j = 0; j < branches.length; j++) {
//         console.log(branches[j].name);
//         branch_names.add(branches[j].name);
//       }
//       branchLookup.add({branch:'asd', names: branch_names});
//     });
//   }
//   console.log(branches[j].name);
//   return branchLookup;
// }
//
//
// Q(
//   gitlab.projects.all(function(projects) {
//     return projects;
//   })
// )
// .then(function (projects) {
//   projects.repository.listBranches(16, function() {
//       console.log('asdas');
//   })
//   return Q(getBranchData(n));
// })
//
// .then(function (result) {
//   // ...
// })



// getProjects = new function() {
//     gitlab.projects.all(function(projects) {
//         return projects;
//     });
// };
//
// var getBranchData = function(projects) {
//   for (var i = 0; i < projects.length; i++) {
//     gitlab.projects.repository.listBranches(projects[i].id, function(branches) {
//       var branch_names = [];
//       for (var j = 0; j < branches.length; j++) {
//         //console.log(branches[j].name);
//         branch_names.add(branches[j].name);
//       }
//       branchLookup.add({branch:'asd', names: branch_names});
//     });
//   }
//   return branchLookup;
// }
//
// return getProjects()
// .then(function (projects) {
//   getBranchData(projects)
// }, function (reason) {
//   console.log('fail')
// });












//
// gitlab.projects.all(function(projects) {
//   for (var i = 0; i < projects.length; i++) {
//     console.log('#'+projects[i].name)
//     gitlab.projects.repository.listBranches(16, function(branches) {
//       for (var j = 0; j < branches.length; j++) {
//         console.log(branches[j].name);
//       }
//     });
//   }
// });

// var projectList = [];
// var branchList = [];
// var branchLookup = [];
//
// var getProjects = function(resolve) {
//     gitlab.projects.all(function(projects) {
//         resolve(projects);
//     });
// };
//
// var getBranchData = function(resolve) {
//   for (var i = 0; i < projectList.length; i++) {
//     gitlab.projects.repository.listBranches(projectList[i].id, function(branches) {
//       var branch_names = [];
//       for (var j = 0; j < branches.length; j++) {
//         //console.log(branches[j].name);
//         branch_names.add(branches[j].name);
//       }
//       branchLookup.add({branch:'asd', names: branch_names});
//     });
//   }
//   resolve(branchLookup);
// }
//
// var promiseProjects = function () {
//     var deferred = Q.defer();
//     getProjects(deferred.resolve);
//     return deferred.promise;
// };
//
// var promiseBranches = function () {
//     var deferred = Q.defer();
//     getBranchData(deferred.resolve);
//     return deferred.promise;
// };
//
// promiseProjects().then(function() {
//   //console.log(arguments);
//   projectList = arguments;
// }).then(function() {
//   for (var i = 0; i < projectList.length; i++) {
//     gitlab.projects.repository.listBranches(projectList[i].id, function(branches) {
//       var branch_names = [];
//       for (var j = 0; j < branches.length; j++) {
//         //console.log(branches[j].name);
//         branch_names.add(branches[j].name);
//       }
//       branchLookup.add({branch:'asd', names: branch_names});
//       console.console.log('kkk');
//     });
//
//   }
// }).then(function() {console.log('LAST')});







// var promise = gitlab.projects.all().then(function(projects){
//   gitlab.projects.repository.listBranches(16, function(branches) {
//     for (var j = 0; j < branches.length; j++) {
//       console.log(branches[j].name);
//     }
//   });
// });








// // Listing users
// gitlab.users.all(function(users) {
//   for (var i = 0; i < users.length; i++) {
//     console.log("#" + users[i].id + ": " + users[i].email + ", " + users[i].name + ", " + users[i].created_at);
//   }
// });
//
// gitlab.projects.all(function(projects) {
//   for (var i = 0; i < projects.length; i++) {
//     console.log("#" + projects[i].id + ": " + projects[i]);
//   }
// });
//
// // Listing projects
// var projects = gitlab.projects;
// var repository = projects.repository;
//
// repository.listBranches(16, function(branches) {
//     console.log(branches);
// });
//
// for (var i = 0; i < projects.length; i++) {
//   console.log(projects[i]);
//   console.log(repository.listBranches(0) )
// }






// getProjects = function(){
//     return gitlab.projects.all()
// }
//
// getBranches = function(projects){
//     console.log(projects)
// }
//
// getProjects().then
// getBranches();
