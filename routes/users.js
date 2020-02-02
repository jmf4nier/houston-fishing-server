const router = require("express").Router();
const User = require("../models/user.model");

router.route("/signup").post((req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    user.save()
        .then(() => res.json("Account Created"))
        .catch(err => {
            if(err._message){
              res.status(400).json('email error')
            }
            if (err.errmsg !== undefined && err.errmsg.includes("email_1")) {
                res.status(400).json("Email Already in Use");
            }
            if (err.errmsg !== undefined && err.errmsg.includes("username_1")) {
                res.status(400).json("Username Already Taken");
            }
            
        });
});

router.route("/login").post(async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findByCredentials(email, password);
        console.log('successful login')
        const token = await user.generateAuthToken();
        const username = user.username;
        
        res.send({ username, token });
    } catch (error) {
        res.status(400).json({
            error: "Incorrect Login Credentials. Please Try Again"
        });
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

            user.save()
                .then(() => res.json("User password updated!"))
                .catch(err => res.status(400).json("Error: " + err));
        })
        .catch(err => res.status(400).json("Error "));
});

module.exports = router;
