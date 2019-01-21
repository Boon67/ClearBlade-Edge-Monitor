/**
 * @typedef {object} edgeCommands
 * @property {string} item_id
 * @property {string} name
 * @property {string} command
 * @property {string} style
 * @property {number} seq
*/

/**
 * @typedef {object} deleteEdgeCommandsParams
 * @property {string} item_id
 * @property {string[]} item_ids
 * @property {string} cbQuery
*/

/**
 * Deletes items from the "edgeCommands" collection
 * @param {{ params: deleteEdgeCommandsParams }} req
 * @param {deleteEdgeCommandsParams} req.params
 * @param {CbServer.Resp} resp
 */
function deleteEdgeCommands(req, resp) {
  log(req)    
  if (!req.params.item_id && !req.params.item_ids && !req.params.cbQuery) {
    resp.error('invalid request, expected structure `{ item_id: "00000000-0000-0000-0000-000000000000" }` or `{ item_ids: ["00000000-0000-0000-0000-000000000000"] }`')
  }
  ClearBlade.init({ request: req });  

  var query = ClearBlade.Query();
  if (req.params.cbQuery) {
    // query delete
    query.query = req.params.cbQuery

  } else if (req.params.item_id) {
    // single delete    
    query.equalTo('item_id', req.params.item_id);

  } else if (req.params.item_ids) {
    // batch delete
    req.params.item_ids.forEach(function (item_id) {
      q = ClearBlade.Query().equalTo('item_id', item_id);
      query = query.or(q);
    });

  }
  
  var col = ClearBlade.Collection({ collectionName: 'edgeCommands' });
  col.remove(query, function(err, data) {
    log(data);
    if (err) {
      resp.error(data);
    } else {
      // note: it will return success even if element does not exist
      resp.success(data);
    }
  });
}
