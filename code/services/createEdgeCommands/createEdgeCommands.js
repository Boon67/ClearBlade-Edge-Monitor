/**
 * @typedef {object} edgeCommands
 * @property {string} name
 * @property {string} command
 * @property {string} style
 * @property {number} seq
*/

/**
 * @typedef {object} createEdgeCommandsParams
 * @property {edgeCommands} item
 * @property {edgeCommands[]} items
*/

/**
 * Creates items in the "edgeCommands" collection
 * @param {{ params: createEdgeCommandsParams }} req
 * @param {createEdgeCommandsParams} req.params
 * @param {CbServer.Resp} resp
*/
function createEdgeCommands(req, resp) {
  log(req) 
  if (!req.params.item && !req.params.items) {
    resp.error('invalid request, expected structure `{ item: { myProp: "", myProp2: "" } }`}')  
  }
  ClearBlade.init({ request: req }); 

  if (req.params.item) {
    req.params.items = [req.params.item];
  }
  var col = ClearBlade.Collection({ collectionName: 'edgeCommands' });
  col.create(req.params.items, function(err, data) {
    log(data) 
    if (err) {
      resp.error(data);
    } else {
      resp.success(data);
    }
  });
}
