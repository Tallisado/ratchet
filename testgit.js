var Git = require("nodegit");

var clone = require("nodegit").Clone.clone;

// var getRepository = function(commit) {
//   console.log('get repo');
//   return Git.Repository.open("nodegit")
// };

var getBranches = function(repository) {
  console.log('get branch');
  return repository.getReferenceNames(1);
};




Git.Repository.open("tmp")
  .then(getBranches)
  .then(function(message) {
    console.log(message);
    console.log(message.length);
  });

//
//
//
// clone("https://github.com/nodegit/nodegit", "tmp", null)
// .then(function(repo) {
//     console.log('repo');
//     // Use a known commit sha from this repository.
//     repo.getBranch("").then(function(ref) {
//       console.log('branch info');
//     })
// })
// // Clone a given repository into a specific folder.
// clone("https://github.com/nodegit/nodegit", "tmp", null)
//
// Git.Clone("https://github.com/nodegit/nodegit", "nodegit").then(function(repository) {
//   console.log('repo');
//   repository.getBranch("").then(function(ref) {
//     gitdata = ref;
//     console.log(ref);
//     console.log('asdasdasd');
//   });
// });
