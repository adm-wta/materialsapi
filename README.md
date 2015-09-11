# materialsapi

A RESTful web service allowing for HTTP based CRUD operations on a collection of PBV materials housed on MongoDB. The materials api has the following routes:

<table>
<thead>
<tr>
<td>
HTTP Verb
</td>
<td>
URL
</td>
</tr>
</thead>
<tbody>
<tr>
<td>
POST
</td>
<td>
 http://pbv-webapps02:3030/api/materials
 </td>
 </tr>
 <tr>
 <td>
 GET
 </td>
 <td>
 http://pbv-webapps02:3030/api/materials
 </td>
</tr>
<tr>
<td>
GET
</td>
<td>
 http://pbv-webapps02:3030/api/materials/:materialnumber
</td>
</tr>
<tr>
<td>
PUT
</td>
<td>
 http://pbv-webapps02:3030/api/materials/:materialnumber
</td>
</tr>
<tr>
<td>
DELETE
</td>
<td>
 http://pbv-webapps02:3030/api/materials/:materialnumber
</td>
</tr>
</tbody>
</table>

<ol>
<li>
  <b>POST  http://pbv-webapps02:3030/api/materials</b>
  <p>A new PBV material can be created by sending a POST request to the materials collection.  The POST request must contain    two keys: <b>materialnumber</b> and <b>materialdescription</b>.  These key parameters may be sent as either form-urlencoded   parameters or as a JSON object such as:</p>
  <p>
    {
      "materialnumber":123,
      "materialdescription": "A Can of Stuff"
    }
    </p>
    <p>
    When sent as a JSON object the client should set the HTTP Content-Type header to application/json.  
    </p>
    <p>
    A succsefull POST will return a JSON object that contains a status code of 200 and the material that was created in           MongoDB along with the MongoDB document ID and document version number
  </p>
  <p>
  {
    "status": 200,
    "material": {
        "__v": 0,
        "materialdescription": "A Thing",
        "materialnumber": 456,
        "_id": "55f1f06c43b1907a45000001"
    }
}
  
  </p>
  <p>
  A succesfull response will also have its HTTP-Status header set to 200
  </p>
  <p>
  A POST that is missing one of the required parameters will return an object with a status of 400 such as:
  </p>
  <p>
  {
    "status": 400,
    "message": "Required parameter missing, you must provide both a materialnumber and materialdescription parameter"
}
</p>
<p>
The HTTP-Status header will also be set to 400 in the response
</p>
<p>
In the event of a server side error during MongoDB operations an object with a status of 500 will be returned.  This object will contain a key called "error" that contains the technical MongoDB error message.  For example:
</p>
<p>
{
"status":500,
"error": "'Validator "Invalid type" failed for path materialnumber'
}
</p>
<p>
The HTTP-Status header will also be set to 500 in the response
</p>
</li>
<li>
<b>GET  http://pbv-webapps02:3030/api/materials</b>
<p>
A succsesfull GET request to the materials collection will return a JSON object with a status of 200 and a "materials" key containing an array of material objects, as follows:
</p>
<p>
{
    "status": 200,
    "materials": [
        {
            "_id": "55f1d32f1f46bb53b016ff64",
            "materialnumber": 101851,
            "materialdescription": "AL 16OZ 24/1 MTDEW"
        },
        {
            "_id": "55f1d32f1f46bb53b016ff65",
            "materialnumber": 101545,
            "materialdescription": "AL 16OZ 24/1 MTDEW GAME FUEL"
        },
        {
            "_id": "55f1d32f1f46bb53b016ff66",
            "materialnumber": 101990,
            "materialdescription": "AL 16OZ 24/1 PEPSI"
        },
        
        .....
        
      }
</p>
<p>
A server side error during the GET request will return a JSON object with a Status of 500 and an "error" key that contains the technical MongoDB error message.  This object will be identical to the object described above for the POST route to the materials collection.  Again, the HTTP-Status header will be set to a status of 500
</p>

</li>
<li>
<b>GET  http://pbv-webapps02:3030/api/materials/:materialnumber</b>
<p>
A succsesfull GET request that contains a specific material number as a URL parameter will return a JSON object containing a status key with a code of 200 and a material key containing the material oibject representation of the specific MongoDB document for the provided material number parameter.  For example:
</p>

<p>
http://pbv-webapps02:3030/api/materials/101851 will return:
</p>
<p>
{
    "status": 200,
    "material": {
        "_id": "55f1d32f1f46bb53b016ff64",
        "materialnumber": 101851,
        "materialdescription": "AL 16OZ 24/1 MTDEW"
    }
}
</p>
<p>
If a material document was not found in MongoDB for the provided material number parameter, a JSON object with a status of 404 will be returned as follows:
</p>
<p>
{
    "status": 404,
    "message": "No material found for that material number"
}
</p>
<p>
The HTTP-Status header will also be set to 404
</p>

<p>
As with routes described above, any internal server error will return a JSON object with a status key of 500 and an error key with the specific MongoDB error message.  HTTP-Status header will be 500.
</p>
</li>
<li>
<b>PUT http://pbv-webapps02:3030/api/materials/:materialnumber</b>
<p>
A PUT request must contain the following:
</p>
<p>
  A URL parameter that is the specific material number for which an update operation is desiered
</p>
<p>
  A JSON object as data that contains <b>BOTH</b> a materialnumber key <b>AND</b> a materialdescription key.  BOTH keys can contain updated   data OR just one key but in either case, both keys must be included.  For example, a PUT request to:
</p>
<p>
http://pbv-webapps02:3030/api/materials/123 with a JSON data object in the form of:
</p>
<p>
{
  "materialnumber":123.
  "materialdescription":"A Can of Stuff"
}
</p>
<p>
  will update the description of the material with materialnumber 123 to read "A Can of Stuff"
</p>
<p>
  The client request <b>MUST</b> set the HTTP Content-Type header to be application/json.
</p>

<p>
  A succsesfull PUT request will return a JSON object with a stautus key set to 200 and a material key that contains the updated matieral document.  For example: a PUT request for materialnumber 123 with an existing materialdescription of "A Can of Stuff" with the following JSON data object:
</p>
<p>
{
  "materialnumber":123,
  "materialdescription":"A Jug of Stuff"
</p>
<p>
  will return:
</p>
<p>
{
    "status": 200,
    "material": {
        "_id": "55f2c8bbb0f9b77b51000001",
        "materialdescription": "A Jug of Stuff",
        "materialnumber": 123,
        "__v": 0
    }
}
</p>
<p>
If the client provided JSON data object is missing one of the requiered keys a JSON object with a status of 400 will be returned.  For example, a PUT request with the following JSON data object:
</p>
<p>
{
"materialnumber":123
}
</p>
<p>
will return:
</p>
<p>
{
    "status": 400,
    "message": "You must provide a valid parameter for materialnumber and materialdescription.  Changes can be made to one or     both parameters"
}
</p>
<p>
The HTTP-Status header will also be set to 400.
</p>
<p>
  If a material document could not be found for the provided URL parameter an object with a stauts of 404 will be retunred as follows: 
</p>
<p>
{
    "status": 404,
    "message": "No material found for that material number"
}
</p>
<p>
HTTP-Status header will be set to 404.
<p>
  Consistent with other routes descibed above, internal server errors will return a JSON object with a status key set to 500    and an error key with the technical MongoDB error.  HTTP-Status header will be set to 500.
</p>
</li>
<li>
<b>DELETE http://pbv-webapps02:3030/api/materials:materialnumber</b>
</li>
<p>
  A succsefull DELETE request for a specific material number provided as a URL parameter will return a JSON object with a stauts key of 200 and a message key.  For example a DELETE request to http://pbv-webapps02:3030/api/materials/123 will return:
</p>
<p>
{
    "status": 200,
    "message": "123 was deleted"
}
</p>
<p>
  If a material document could not be found for the provided URL parameter an object with a stauts of 404 will be retunred as follows: 
</p>
<p>
{
    "status": 404,
    "message": "No material found for that material number"
}
</p>
<p>
HTTP-Status header will be set to 404.
</p>
<p>
  Internal server errors will return a JSON object with a status key set to 500 and an error key setto the technical MongoDB error message.  HTTP-Status header will be set to 500
</p>


</ol>
