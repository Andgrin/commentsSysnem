// require('es6-promise').polyfill();
// require('isomorphic-fetch');
import axios from 'axios';

// get comments
// add comment(reply)
// edit comment
  
const email = 'andgrin.mb@gmail.com';
const defUrl = `http://frontend-test.pingbull.com/pages/${email}/comments`;

let commentStructure = {
  "id": 0,
  "content": "",
  "created_at": "",
  "updated_at": "",
  "author": {
      "id": 0,
      "name": "",
      "avatar": "",
      "created_at": "",
      "updated_at": ""
  },
  "children": []
}

const extendCommentStructure = data => {
  data = Object.assign( {}, commentStructure, data);
  console.log("ExComStr ST", data);
  return data;
} 

const extendMultipliComments = data => {
  console.log("ExtMulCom ST", data);
  data = data.map((item, index) => {
    return (
      extendCommentStructure(item)
    )
  })
  console.log("ExtMulCom FN", data);
  return data;
}

const ajaxRequest = (
  method,
  url,
  dataObj,
  callback,
  reStructureFunc
) => {
  console.log("ajaxRequest   :",dataObj);
  axios({
    method: method,
    url: defUrl + url,
    data: dataObj
  })
    .then( response => {
      console.log("RESPONSE ",response);
      if (reStructureFunc) {
        callback( reStructureFunc(response.data) );
      } else {
        callback(); // for delete request
      }
    })
    .catch(function (error) {
      console.log("AXIOS Error :-S", error);
    });
};

const callFatch = (
  type,
  requestData
) => {
  console.log('callFatch', type, requestData);
  if (type === 'newComment') {
    ajaxRequest('POST', '', requestData.data, requestData.callback, extendCommentStructure);
  }
  else if (type === 'loadComments') {
    ajaxRequest('GET', '', requestData.data, requestData.callback, extendMultipliComments);
  }
  else if (type === 'editComment') {
    ajaxRequest('PUT', requestData.url, requestData.data, requestData.callback, extendCommentStructure);
  }
  else if (type === 'deleteComments') {
    ajaxRequest('DELETE', requestData.url, requestData.data, requestData.callback);
  } 
  else {
    return console.log("Bad request data")
  }
}

export default callFatch;
