
let colorEle = document.querySelector(".paletteTab");
let generatedColors = [[],[],[],[]] ;
var colors = [] ;
var colorIndex = 0 ;


//generate and insert color palette into html
function createColorPalatteEle(color){
        const element = document.createElement("div");
        element.classList.add("colorPalette");
        element.id = colorIndex++ ;
        let likeIcon = document.createElement('p');
        likeIcon.setAttribute("title","save Color Palette")
        likeIcon.innerHTML = `<svg
         xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="rgb(255, 53, 53)" class="bi bi-heart-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
</svg>`
        likeIcon.addEventListener('click',()=>{
            let favCArrtoStr = colors[likeIcon.parentElement.id].toString() ;
            if((localStorage.getItem("fav")) == null){
                localStorage.setItem("fav",favCArrtoStr+',');
            }
            else{
                // console.log((localStorage.fav).includes(favCArrtoStr));
                if (!(localStorage.fav).includes(favCArrtoStr)){
                localStorage.fav +=favCArrtoStr+',';
                }
            }
 
        })

        let generatedColor=[] ;
        let count = 1 ;
        color.forEach((i)=>{ 
            let tempColor = i[0] == '#' ? i : hslToHex(i[0],i[1],i[2]) ;
            
            const colorEle = document.createElement("div")
            const hexText = document.createElement("p")
            hexText.classList.add(`hexText`);

            colorEle.classList.add(`color${count++}`, `cp`);
            colorEle.style.backgroundColor = tempColor ;  
            colorEle.setAttribute("data-bgColor",tempColor)
            colorEle.addEventListener("mouseover",function(){
                hexText.classList.add("dsFlx");
            })
            colorEle.addEventListener("mouseout",function(){
                hexText.classList.remove("dsFlx");
            })
            hexText.addEventListener("click",function(){
            navigator.clipboard.writeText(this.innerText);
            this.innerText = "Copied...!";
            setTimeout(()=>{
                this.innerText = this.parentElement.dataset.bgcolor;
            },400)
            
            })
            generatedColor.push(tempColor);
            hexText.innerText = tempColor ;

            colorEle.append(hexText);
            element.append(colorEle);
        })
        element.append(likeIcon)
        colors.push(generatedColor);
        colorEle.append(element)
}
function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
      const k = (n + h / 30) % 12;
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
      return Math.round(255 * color).toString(16).padStart(2, '0');
    };
    return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}
function randomNumberGen(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min) ;
}
function complementaryGen(){
    generatedColors[0][0] = randomNumberGen(0,360);
    generatedColors[0][1] = randomNumberGen(50,80) ;
    generatedColors[0][2] = randomNumberGen(30,80) ;

    generatedColors[1][0] = (generatedColors[0][0] + 180)%360 ;
    generatedColors[1][1] = generatedColors[0][1] ;
    generatedColors[1][2] = generatedColors[0][2] ;

    generatedColors[2][0] = randomNumberGen(0,360);
    generatedColors[2][1] = generatedColors[0][1];
    generatedColors[2][2] = generatedColors[0][2] + 10 ;

    generatedColors[3][0] = randomNumberGen(0,360);
    generatedColors[3][1] = generatedColors[0][1] ;
    generatedColors[3][2] = generatedColors[0][2] + 20 ;

    createColorPalatteEle(generatedColors)
    

}
function monoGen(){
    
    let generatedColors = [[],[],[],[]];
        generatedColors[0][0] = randomNumberGen(0,360);
        generatedColors[0][1] = randomNumberGen(0,100) ;
        generatedColors[0][2] = randomNumberGen(20,40) ;

        generatedColors[1][0] = generatedColors[0][0]  ;
        generatedColors[1][1] = generatedColors[0][1] ;
        generatedColors[1][2] = generatedColors[0][2] + 20;

        generatedColors[2][0] = generatedColors[0][0] ;
        generatedColors[2][1] = generatedColors[0][1];
        generatedColors[2][2] = generatedColors[0][2] + 40 ;

        generatedColors[3][0] = generatedColors[0][0] ;
        generatedColors[3][1] = generatedColors[0][1] ;
        generatedColors[3][2] = generatedColors[0][2] + 60 ;
        createColorPalatteEle(generatedColors);

}
function analogusGen(){
    let generatedColors = [[],[],[],[]];
        generatedColors[0][0] = randomNumberGen(0,360);
        generatedColors[0][1] = randomNumberGen(40,100) ;
        generatedColors[0][2] = randomNumberGen(30,75) ;

        generatedColors[1][0] = (generatedColors[0][0] +40)%360  ;
        generatedColors[1][1] = generatedColors[0][1] ;
        generatedColors[1][2] = generatedColors[0][2];

        generatedColors[2][0] =  (generatedColors[0][0] +80)%360 ;
        generatedColors[2][1] = generatedColors[0][1];
        generatedColors[2][2] = generatedColors[0][2] ;

        generatedColors[3][0] =  (generatedColors[0][0] +120)%360 ;
        generatedColors[3][1] = generatedColors[0][1] ;
        generatedColors[3][2] = generatedColors[0][2] ;
        createColorPalatteEle(generatedColors);
}
function favGen(){
    let c = localStorage.getItem("fav").split(',');
      let temp = [];
      for (let i of c){
        temp.push(i);
        if (temp.length == 4){
            createColorPalatteEle(temp);
            temp = []
        }
      }
}
let temp ;
// Generate when scrolling reaches end  
let lastContainer = colorEle.lastChild;
colorEle.addEventListener('scroll', () => {
    const scrolled = colorEle.scrollTop+1000;
    const elementPosition = colorEle.lastChild.offsetTop // lastContainer.offsetTop;
    if(scrolled >= elementPosition){
        if (temp != 3){
            makePalette(temp);
        }
        lastContainer = colorEle.lastChild ;
    }
})



// Palette maker
function makePalette(x){
    temp = x ;

    if (x == 3){
        favGen() ;
    }
    else{
        
        for(let i = 0 ; i < 100 ; i++){
            if (x==0) complementaryGen();
            else if (x == 1) monoGen();
            else if (x == 2) analogusGen();
        }
    }
    
}
function resetElements(v){
    colorEle.innerText = "";
    makePalette(v)
}
let selectionElements = document.getElementsByClassName("opt");

for (let i of selectionElements){
    i.addEventListener("click",()=>{
        te(i);
    })
}

function te(v = {'dataset' : {'val' : 1}}){
    v = v.dataset.val ;
    for (let i = 0 ; i<selectionElements.length ; i++){
       
        if (i != v){
            selectionElements[i].classList.remove("opt-selected");
        }
        else{
            selectionElements[i].classList.add("opt-selected");
            resetElements(v)
        }
    }
}
te();









