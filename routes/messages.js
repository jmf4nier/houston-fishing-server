const router = require("express").Router();
const Message = require( "../models/message.model");

router.get("/", (req, res) => {
  id = req.query.lake_id; //finds id buried in get url params

  find({ lake_id: id })
    .then(data => res.json(data))
    .catch(err => res.status(400).json({ error: "something happened!" }));
});

router.route("/add").post((req, res) => {
  const content = req.body.content;
  const lake_id = req.body.lake_id;
  const replies = req.body.replies;
  const author = req.body.author;
  const date = req.body.date;

  const newMessage = new Message({
    lake_id,
    replies,
    author,
    content,
    content,
    date
  });

  newMessage
    .save()
    .then(data => res.json(data))
    .catch(err => res.status(400).json("Error: " + err));
});

// router.route('/:id').get((req, res) => {
//   message.findById(req.params.id)
//     .then(message => res.json(message))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

router.route("/:id").delete((req, res) => {
  findByIdAndDelete(req.params.id)
    .then(() => res.json("Message deleted."))
    .catch(err => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  findById(req.params.id)
    .then(message => {
      message.replies.push(req.body.reply);

      message
        .save()
        .then(data => res.json(data))
        .catch(err => res.status(400).json("Error: " + err));
    })
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = router
