const respond = (request, response, status, content, contentTypes) => {
  let finalResponse;
  let defineType;

  if (contentTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${content.message}</message>`;
    responseXML = `${responseXML} </response>`;
    finalResponse = responseXML;
    defineType = 'text/xml';
  } else {
    finalResponse = JSON.stringify(content);
    defineType = 'application/json';
  }

  response.writeHead(status, { 'Content-Type': defineType });
  response.write(finalResponse);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'This is a successful response',
  };

  respond(request, response, 200, responseJSON, acceptedTypes);
};

const badRequest = (request, response, params, acceptedTypes) => {

  const responseJSON = {
    message: 'This request has the required parameters',
  };


  if (!params.valid || params.valid !== 'true') {

    responseJSON.message = 'Missing valid query parameter set to true';

    responseJSON.id = 'badRequest';

    return respond(request, response, 400, responseJSON, acceptedTypes);
  }


  return respond(request, response, 200, responseJSON, acceptedTypes);
};

const unauthorized = (request, response, params, acceptedTypes) => {

    const responseJSON = {
      message: 'You have successfully viewed the content',
    };
  

    if (!params.loggedIn || params.loggedIn !== 'yes') {

      responseJSON.message = 'Missing loggedIn query parameter set to yes';
    
      responseJSON.id = 'unauthorized';
   
      return respond(request, response, 401, responseJSON, acceptedTypes);
    }
  

    return respond(request, response, 200, responseJSON, acceptedTypes);
  };

const forbidden = (request, response, acceptedTypes) => {

  const responseJSON = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };


  respond(request, response, 403, responseJSON, acceptedTypes);
};

const internal = (request, response, acceptedTypes) => {

    const responseJSON = {
      message: 'Internal Server Error. Something went wrong.',
      id: 'internalError',
    };
  
  
    respond(request, response, 500, responseJSON, acceptedTypes);
  };

const notImplemented = (request, response, acceptedTypes) => {

  const responseJSON = {
    message: 'A get request for this page has not been implemented yet. Check again later for updated content.',
    id: 'notImplemented',
  };


  respond(request, response, 501, responseJSON, acceptedTypes);
};

const notFound = (request, response, acceptedTypes) => {

  const responseJSON = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };


  respond(request, response, 404, responseJSON, acceptedTypes);
};


module.exports = {
  success,
  badRequest,
  notFound,
  unauthorized,
  forbidden,
  internal,
  notImplemented
};

