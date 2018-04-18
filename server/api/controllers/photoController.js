exports.upload = (req, res) => {
    console.log('UPLOAD HERE');
    console.log(req.file);
  if(!req.file) {
      return res.status(400).send();
  }
  return res.status(200).send({filename: req.file.filename, path: req.file.path})
};