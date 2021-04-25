//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });
  blog
    .save()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});

app.get('/single-blog', (req, res) => {
  Blog.findById('60852b69de367d20e9a984b9')
    .then((result) => {
      res.send(result);
    })
    .catch((err) => console.log(err));
});
