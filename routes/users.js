const router = require("express").Router();
let User = require("../models/user.model");

// router.route('/').get((req, res) => {
//   Exercise.find()
//     .then(exercises => res.json(exercises))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route("/signup").post((req, res) => {
  // const username = req.body.username;
  // const password = req.body.password;

  const user = new User(req.body);
  user
    .save()
    .then(() => res.json("Account Created"))
    .catch(err =>
      res.status(400).json({ error: "Email Already in Use. Try Another" })
    );
});

router.route("/login").post(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    const username = user.username;
    res.send({ username, token });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Incorrect Login Credentials. Please Try Again" });
  }
});
// router.route('/:id').delete((req, res) => {
//   User.findByIdAndDelete(req.params.id)
//     .then((res) => res.json('User deleted.'))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route("/update/:id").post((req, res) => {
  User.findById(req.params.id)
    .then(user => {
      user.password = req.body.password;

      user
        .save()
        .then(() => res.json("User password updated!"))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error "));
});

module.exports = router;
