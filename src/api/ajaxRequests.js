// require('es6-promise').polyfill();
// require('isomorphic-fetch');
import axios from 'axios';
  
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
  return data = Object.assign( {}, commentStructure, data);
} 

const extendMultipliComments = data => {
  if (data) {
    return data = data.map((item, index) => {
      return (
        extendCommentStructure(item)
      )
    })
  } 
}

const ajaxRequest = (
  method,
  url,
  dataObj,
  callback,
  reStructureFunc
) => {
  axios({
    method: method,
    url: defUrl + url,
    data: dataObj
  })
    .then( response => {
      // console.log("RESPONSE ",response);
      if (reStructureFunc) {
        callback( reStructureFunc(response.data) );
      } else {
        callback(); // for delete request
      }
    })
    .catch(function (error) {
      console.log("AXIOS Error :-S", error);
    });
  // fetch(defUrl + url, {
  //   method: method, // *GET, POST, PUT, DELETE, etc.
  //   // mode: "cors", // no-cors, cors, *same-origin
  //   // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
  //   // credentials: "same-origin", // include, same-origin, *omit
  //   headers: {
  //       "Content-Type": "application/json; charset=utf-8",
  //       // "Content-Type": "application/x-www-form-urlencoded",
  //   },
  //   // redirect: "follow", // manual, *follow, error
  //   // referrer: "no-referrer", // no-referrer, *client
  //   body: JSON.stringify(dataObj), // body data type must match "Content-Type" header
  // })
  //   .then(function(response) {
  //     if (response.status >= 400) {
  //       throw new Error("Bad response from server");
  //     }
  //     return response.json();
  //   })
  //   .then(function(stories) {
  //     if (reStructureFunc) {
  //       callback( reStructureFunc(stories.data) );
  //     } else {
  //       callback(); // for delete request
  //     }
  //   });
};

const callFatch = (
  type,
  requestData
) => {
  // console.log('callFatch', type, requestData);
  if (type === 'newComment') {
    ajaxRequest('POST', '', requestData.data, requestData.callback, extendCommentStructure);
  }
  else if (type === 'loadComments') {
    ajaxRequest('GET', requestData.url, requestData.data, requestData.callback, extendMultipliComments);
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
