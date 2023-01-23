
//initialize addParamCount
let addParamCount=0;

//creating an div element to store newly created parameter box
function create(HTML) {
    let div=document.createElement("div");
    div.innerHTML=HTML;
    return div.firstElementChild;
}

//if the user clicks on custom parameter box hide the json request box
let customradio = document.getElementById("Custom")
customradio.addEventListener("click", () => {
    document.getElementById("requestJson").style.display = "none";
    document.getElementById("parameterBox").style.display = "block";
})


//if the user clicks on json box hide the custom parameter  request box
let content_type_json = document.getElementById("JSON")
content_type_json.addEventListener("click", () => {
    document.getElementById("parameterBox").style.display = "none";
    document.getElementById("requestJson").style.display = "block"
    document.getElementById("textbox").style.margin = "auto";
})

//if the use clicks on "+" button add more parameters
let addParam = document.getElementById("addParam");
addParam.addEventListener("click", () => {
    let parameter123 = document.getElementById("parameter123");
    let html = `  <div class="form-row my-1" style="display:flex;flex-direction:row">
    <label for="url" class="col-sm-2 col-form-label">parameter ${addParamCount +2} </label>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterKey${addParamCount +2}" placeholder="Enter parameter ${addParamCount +2}  Key">
    </div>
    <div class="col-md-4">
      <input type="text" class="form-control" id="parameterValue${addParamCount +2}" placeholder="Enter parameter ${addParamCount +2} Value">
    </div>
    <button class="btn btn-primary removeParam">-</button>
  </div>`
  
//let paramElement=create(html);
console.log(parameter123)
//parameter123.appendChild(paramElement);
parameter123.innerHTML+=html;
 addParamCount++;
   
   //adding event listner to remove the parameter on cklicking "-" button
   let remove=document.getElementsByClassName("removeParam");
   for(item of remove){
    item.addEventListener("click",(e)=>{
       if(confirm("do you want to delete parameter")) {
        e.target.parentElement.remove();   // "e.target" is used for targeting particular item from a bunch of item
       }
    })
}
})

//if user clicks on submit button
let submit=document.getElementById("submit")
submit.addEventListener("click",()=>{
    //show please wait in the response box to request patience from user
    document.getElementById("responsePrism").innerHTML="please wait.....fetching api";

    //fetch all the values user has entered
    let url=document.getElementById("URLs").value;
    let requestType=document.querySelector("input[name='requestType']:checked").value;

    //log all the values on console for debugging
    let contentType=document.querySelector("input[name='ContentType']:checked").value;
    console.log(url,requestType,contentType)


    //if user has select params option insted of JSON then collect all this parameters in an object
    if(contentType=="Custom"){
      data={}
      for(let i=0;i<addParamCount+1;i++){
        if(document.getElementById("parameterKey"+(i+1))!=undefined){
        let key1=document.getElementById('parameterKey'+(i+1)).value;
        let value1=document.getElementById('parameterValue'+(i+1)).value;
        data[key1]=value1;
      }
      JSON.stringify(data);
    }

      console.log(data);
    }
    else{
      data=document.getElementById("requstJsonText").value;
    }
    console.log(data);



  //get request
  if(requestType=="GET"){
    fetch(url,{method:"GET"}).then(function(response){
      return response.text();
    }).then(function(texts){
     document.getElementById("responsePrism").innerHTML=texts;
     Prism.highlightAll();
    })
  }

  //post request
    else{
      fetch(url,{method:"POST",body:data,header:{
        'Content-type': 'application/json; charset=UTF-8',
      }}).then(function(response){
        return response.text();
      }).then(function(text){
        document.getElementById("responsePrism").innerHTML=text;
        Prism.highlightAll();
      })
    } 
})
