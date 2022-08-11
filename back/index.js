const fs = require('fs').promises ;
const express = require('express') ;
const path = require('path');

const PORT = 8000;

const app = express();

const dir = process.cwd();


app.get('/users', async (req,res) => {
    const result = await main();
    res.status(200).json(JSON.stringify(result));
})
app.get('/cities', async (req, res) => {
    const result = await fs.readFile("./back/cities.json", "utf-8");
    res.status(200).json(result);
})


async function main(){
    let base = await fs.readFile("./back/citizens.json", "utf-8");
    base = JSON.parse(base);
    const result = {};
    try {
        for(let groups of base){
            let link ;
            for(let i = 0; i<groups.groups.length; i ++){
                names = groups.groups[i];
                if(i != groups.groups.length - 1){
                    if(!link){
                        !result[names.name] ? result[names.name] = {} : undefined ;
                        link = result[names.name];
                    }else{
                        link[names.name] ? link = link[names.name] : link = link[names.name] = {} ;
                    }
                }else{
                    link[names.name] ? link = link[names.name] : link = link[names.name] = [] ;
                    link.push(groups.name) ;
                    break ;
                }
            }
        }
    } catch (e) {
        console.log(e)
    }
    return result ;
}

app.listen(PORT, async () => console.log('Server is up'));
app.use(express.static(path.join(dir,"publick")));
app.use("*", (req, res) => {
    res.sendFile(path.join(dir,"publick", "index.html"))
})