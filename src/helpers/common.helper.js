const { createHash } = require('crypto');

const jwt = require('jsonwebtoken');

function hash(string) {
  return createHash('sha256').update(string).digest('hex');
}
function sendError(res, status,error) {
  res.status(status).send({ status:"error", error: error.message });
}

function sendSuccess(res, status,data) {
  res.status(status).send({ status:"success", data: data });
}

function generateAuthToken(email,id){
    //generate jwt token
    
    const token = jwt.sign(
      { userId: id, email: email },
      'your_secret_key',
      { expiresIn: '5h' }
    );
    return token;


}

function validateToken(token) {
  try {
    const decoded = jwt.verify(token, 'your_secret_key');
    return decoded;
  } catch (err) {
    console.log(err);
    return err;
  }
}

function buildErrorFromSequelize(err) {
  let returnErr = {};
  if (err.errors) {
    err.errors.forEach((error) => {
        returnErr[error.path] = error.message;
    });
  }
  return returnErr;
}


var helper = {
  hash,
  sendError,
  sendSuccess,
  generateAuthToken,
  validateToken,
  buildErrorFromSequelize
}

module.exports = helper;