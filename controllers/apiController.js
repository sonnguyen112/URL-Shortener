const url_db = require("../config/db")
function isURL(str) {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return pattern.test(str);
  }
class ApiController{
    async shorturl(req, res){
        if (req.method === "POST"){
            var url = req.body["url"]
            if (isURL(url)){
                var db_url = await url_db.find({url : url})
                if (db_url.length === 0){
                    var new_url =  await url_db.create([{url : url}])
                    var id = new_url[0]["_id"]
                }
                else var id = db_url[0]["_id"]
                return res.json({
                    original_url : url,
                    short_url : id
                })    
            }
            else{
                return res.json({ error: 'invalid url' })
            }
        }
    }

    async search(req, res){
        var db_url = await url_db.findById(req.params["id"])
        if (db_url){
            return res.redirect(db_url["url"])
        }
        return res.json({ error: 'invalid url' })
    }
}

module.exports = new ApiController