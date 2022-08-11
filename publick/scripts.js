main() ;
let result = [];
let city 
let max = 0
async function main(){
    let users = await fetch('http://localhost:8000/users');
    
    users = await users.json(); 
    try {
        users = JSON.parse(users);
    } catch (e) {
        console.log(e);
    }
    await collector(users, 1);
    let sort = result.slice();
    sort = sort.sort((a,b) => {return b.nesting - a.nesting});
    max = sort[0].nesting
    console.log(max)
    for(let el of result){
        await painter(el)
    }
}

async function collector(arg1, arg2){
    if(!Array.isArray(arg1)){
        for(let key in arg1){
                result.push({name: key, nesting: arg2})
            await collector(arg1[key], arg2 + 1) ;
        }
    }else{
        for(let el of arg1){
            result.push({name: el, nesting: arg2})
        }
    }
}

async function painter(arg){
    let cities = await fetch('http://localhost:8000/cities');
    cities = JSON.parse(await cities.json());
    for(let obj of cities){
        if(arg.name.includes(`${obj.name} `)){
            city = obj
        }
    }
    console.log(city)
    const indent = "  " ;
    const div = document.createElement("h1");
    const html = div.innerHTML = `${arg.name}`;
    div.classList.add(`${arg.nesting}`);
    if(arg.nesting == max){
        div.title = `город ${city.name}, ${city.data} жителей`
    }
    div.style.marginLeft = `${70*arg.nesting}px`;
    div.style.fontSize = `${(1-(arg.nesting/10))*30}px`;
    document.body.appendChild(div);
}
