//console.log('It worked!')
class App {
   
    constructor(selectors){
        
        this.dinos=[]
        this.searchRequirement={}
        this.searchMode=0;
        this.localArr=window.localStorage.getItem('dinoplasty')
        this.localCounter=window.localStorage.getItem('dinoplastyCounter')
        this.max=0
        //this.clicked=0; // For detect editing efforts
        if(this.localCounter){
            this.max=parseInt(this.localCounter)
        }
        this.carnivoresList = document.querySelector(selectors.carnivoresListSelector)
        this.herbivoresList = document.querySelector(selectors.herbivoresListSelector)
        this.omnivoresList = document.querySelector(selectors.omnivoresListSelector)
        this.undefinedList = document.querySelector(selectors.undefinedListSelector)
        this.carnivoresHeading = document.querySelector(selectors.carnivoresHeading)
        this.herbivoresHeading = document.querySelector(selectors.herbivoresHeading)
        this.omnivoresHeading = document.querySelector(selectors.omnivoresHeading)
        this.undefinedHeading = document.querySelector(selectors.undefinedHeading)
        this.template=document.querySelector(selectors.templateSelector)
        if(this.localArr){
            this.dinos=JSON.parse(this.localArr)
        }
        this.reRender()
        if(this.searchMode){
            this.searchDinoFromForm()
        }
        
        
        document.querySelector('#no-results').style.display="none"
        document.querySelector(selectors.formSelector).addEventListener('submit',this.addDinoFromForm.bind(this))
        document.querySelector(selectors.formSelector).addEventListener('submit',this.reRender.bind(this))
        document.querySelector('#search-form').addEventListener('submit',this.saveSearchRequirement.bind(this))
        document.querySelector('#search-form').addEventListener('submit',this.searchDinoFromForm.bind(this))
        //document.querySelector(selectors.formSelector).dinoName.focus() OLD WAY Support all browser
    }

    reRender(){
         document.querySelector('#no-results').style.display="none"
        this.carnivoresHeading.style.display = "none"; 
        this.herbivoresHeading.style.display = "none"; 
        this.omnivoresHeading.style.display = "none"; 
        this.undefinedHeading.style.display = "none"; 
        while(this.carnivoresList.firstChild){
            this.carnivoresList.removeChild(this.carnivoresList.firstChild);
        }
        while(this.herbivoresList.firstChild){
            this.herbivoresList.removeChild(this.herbivoresList.firstChild);
        }
        while(this.omnivoresList.firstChild){
            this.omnivoresList.removeChild(this.omnivoresList.firstChild);
        }
        while(this.undefinedList.firstChild){
            this.undefinedList.removeChild(this.undefinedList.firstChild);
        }
       for (let index = 0; index < this.dinos.length; index++) {
           if(this.dinos[index].type === 'Carnivores'){
               this.carnivoresHeading.style.display = "initial";
               this.carnivoresList.appendChild(this.renderListItem(this.dinos[index]))
           }else if(this.dinos[index].type === 'Herbivores'){
               this.herbivoresHeading.style.display = "initial";
               this.herbivoresList.appendChild(this.renderListItem(this.dinos[index]))
           }else if(this.dinos[index].type === 'Omnivores'){
               this.omnivoresHeading.style.display = "initial";
               this.omnivoresList.appendChild(this.renderListItem(this.dinos[index]))
           }else{
                this.undefinedHeading.style.display = "initial";
                this.undefinedList.appendChild(this.renderListItem(this.dinos[index]))
           }
        
        }
        if(this.carnivoresList.firstChild){
            this.carnivoresList.firstChild.querySelector('button.up').disabled="true"
        }
        if(this.carnivoresList.lastChild){
            this.carnivoresList.lastChild.querySelector('button.down').disabled="true"
        }
        if(this.herbivoresList.firstChild){
            this.herbivoresList.firstChild.querySelector('button.up').disabled="true"
        }
        if(this.herbivoresList.lastChild){
            this.herbivoresList.lastChild.querySelector('button.down').disabled="true"
        }
        if(this.omnivoresList.firstChild){
            this.omnivoresList.firstChild.querySelector('button.up').disabled="true"
        }
        if(this.omnivoresList.lastChild){
            this.omnivoresList.lastChild.querySelector('button.down').disabled="true"
        }
        if(this.undefinedList.firstChild){
            this.undefinedList.firstChild.querySelector('button.up').disabled="true"
        }
        if(this.undefinedList.lastChild){
            this.undefinedList.lastChild.querySelector('button.down').disabled="true"
        }
        

    }

    saveSearchRequirement(ev){
        this.searchRequirement.name=ev.target.dinoNameSearch.value
        this.searchRequirement.type=ev.target.dinoClassSearch.value
    }

    searchDinoFromForm(ev){
         document.querySelector('#no-results').style.display="none"
        if(ev){
            ev.preventDefault()
        }
        let resultCount=0;
        let resultCarnivores=0;
        let resultHerbivores=0;
        let resultOmnivores=0;
        let resultundefined=0;
        this.searchMode=1;
        const requirements={
            name: this.searchRequirement.name,
            type: this.searchRequirement.type,
        }
        document.querySelector('#search-form').reset()
        const carnivores=this.carnivoresList.childNodes;
        const herbivores=this.herbivoresList.childNodes;
        const omnivores=this.omnivoresList.childNodes;
        const unknowns=this.undefinedList.childNodes;
        this.carnivoresHeading.style.display = "none"; 
        this.herbivoresHeading.style.display = "none"; 
        this.omnivoresHeading.style.display = "none"; 
        this.undefinedHeading.style.display = "none"; 
        for(let a=0; a<carnivores.length; a++){
                carnivores[a].style.display="none";
        }
        for(let b=0; b<herbivores.length; b++){
                herbivores[b].style.display="none";
        }
        for(let c=0; c<omnivores.length; c++){
                omnivores[c].style.display="none";
        }
        for(let d=0; d<unknowns.length; d++){
                unknowns[d].style.display="none";
        }

        if(!requirements.name && requirements.type==="Unknown"){
           for(let a=0; a<carnivores.length; a++){
                this.carnivoresHeading.style.display = "initial"; 
                carnivores[a].style.display="flex";
                resultCount++;
                resultCarnivores++;
                
            }
            for(let b=0; b<herbivores.length; b++){
                this.herbivoresHeading.style.display = "initial"; 
                    herbivores[b].style.display="flex";
                    resultCount++;
                    resultHerbivores++;
            }
            for(let c=0; c<omnivores.length; c++){
                this.omnivoresHeading.style.display = "initial"; 
                    omnivores[c].style.display="flex";
                    resultCount++;
                    resultOmnivores++;
            }
            for(let d=0; d<unknowns.length; d++){
                this.undefinedHeading.style.display = "initial"; 
                    unknowns[d].style.display="flex";
                    resultCount++;
                    resultundefined++;
            }
            this.searchMode=0;
        }else if(requirements.name && requirements.type==="Unknown"){
           
            for(let i=0;i<this.dinos.length;i++){
                if(this.dinos[i].name.includes(requirements.name)){
                    const index=this.dinos[i].id;
                    for(let a=0; a<carnivores.length; a++){
                        if(carnivores[a].dataset.id==index){
                             this.carnivoresHeading.style.display = "initial"; 
                            carnivores[a].style.display="flex";
                            resultCount++;
                            resultCarnivores++;
                        }
                    }
                    for(let b=0; b<herbivores.length; b++){
                        if(herbivores[b].dataset.id==index){
                        this.herbivoresHeading.style.display = "initial"; 
                        herbivores[b].style.display="flex";
                        resultCount++;
                        resultHerbivores++;
                        }
                    }
                    for(let c=0; c<omnivores.length; c++){
                        if(omnivores[c].dataset.id==index){
                            this.omnivoresHeading.style.display = "initial"; 
                        omnivores[c].style.display="flex";
                        resultCount++;
                        resultOmnivores++;
                        }
                    }
                    for(let d=0; d<unknowns.length; d++){
                        if(unknowns[d].dataset.id==index){
                            this.undefinedHeading.style.display = "initial"; 
                             unknowns[d].style.display="flex";
                             resultCount++;
                             resultundefined++;
                        }
                       
                        }
                    }
                }
            }else if(!requirements.name && requirements.type!=="Unknown"){
            for(let i=0;i<this.dinos.length;i++){
                if(this.dinos[i].type===requirements.type){
                    const index=this.dinos[i].id;
                    for(let a=0; a<carnivores.length; a++){
                        if(carnivores[a].dataset.id==index){
                             this.carnivoresHeading.style.display = "initial"; 
                            carnivores[a].style.display="flex";
                            resultCount++;
                            resultCarnivores++;
                        }
                    }
                    for(let b=0; b<herbivores.length; b++){
                        if(herbivores[b].dataset.id==index){
                        this.herbivoresHeading.style.display = "initial"; 
                        herbivores[b].style.display="flex";
                        resultCount++;
                        resultHerbivores++;
                        }
                    }
                    for(let c=0; c<omnivores.length; c++){
                        if(omnivores[c].dataset.id==index){
                            this.omnivoresHeading.style.display = "initial"; 
                        omnivores[c].style.display="flex";
                        resultCount++;
                        resultOmnivores++;
                        }
                    }
                    for(let d=0; d<unknowns.length; d++){
                        if(unknowns[d].dataset.id==index){
                            this.undefinedHeading.style.display = "initial"; 
                             unknowns[d].style.display="flex";
                             resultCount++;
                             resultundefined++;
                        }
                       
                        }
                }
            }
        }else{
            for(let i=0;i<this.dinos.length;i++){
                if(this.dinos[i].type===requirements.type && this.dinos[i].name.includes(requirements.name)){
                    const index=this.dinos[i].id;
                    for(let a=0; a<carnivores.length; a++){
                        if(carnivores[a].dataset.id==index){
                             this.carnivoresHeading.style.display = "initial"; 
                            carnivores[a].style.display="flex";
                            resultCount++;
                            resultCarnivores++;
                        }
                    }
                    for(let b=0; b<herbivores.length; b++){
                        if(herbivores[b].dataset.id==index){
                        this.herbivoresHeading.style.display = "initial"; 
                        herbivores[b].style.display="flex";
                        resultCount++;
                        resultHerbivores++;
                        }
                    }
                    for(let c=0; c<omnivores.length; c++){
                        if(omnivores[c].dataset.id==index){
                        this.omnivoresHeading.style.display = "initial"; 
                        omnivores[c].style.display="flex";
                        resultCount++;
                        resultOmnivores++;
                        }
                    }
                    for(let d=0; d<unknowns.length; d++){
                        if(unknowns[d].dataset.id==index){
                            this.undefinedHeading.style.display = "initial"; 
                             unknowns[d].style.display="flex";
                             resultCount++;
                             resultundefined++;
                        }
                        }
                }
            }
        }
        if(resultCount===0){
            document.querySelector('#no-results').style.display="initial"
        }
        
        if(resultCarnivores==1){
            for(let e=0; e<this.carnivoresList.childNodes.length;e++){
                if(this.carnivoresList.childNodes[e].style.display=="flex"){
                    this.carnivoresList.childNodes[e].querySelector('button.up').disabled="true"
                    this.carnivoresList.childNodes[e].querySelector('button.down').disabled="true"
                }
            }
        }

         if(resultHerbivores==1){
            for(let e=0; e<this.herbivoresList.childNodes.length;e++){
                if(this.herbivoresList.childNodes[e].style.display=="flex"){
                    this.herbivoresList.childNodes[e].querySelector('button.up').disabled="true"
                    this.herbivoresList.childNodes[e].querySelector('button.down').disabled="true"
                }
            }
        }

         if(resultOmnivores==1){
            for(let e=0; e<this.omnivoresList.childNodes.length;e++){
                if(this.omnivoresList.childNodes[e].style.display=="flex"){
                    this.omnivoresList.childNodes[e].querySelector('button.up').disabled="true"
                    this.omnivoresList.childNodes[e].querySelector('button.down').disabled="true"
                }
            }
        }

         if(resultundefined==1){
            for(let e=0; e<this.undefinedList.childNodes.length;e++){
                if(this.undefinedList.childNodes[e].style.display=="flex"){
                    this.undefinedList.childNodes[e].querySelector('button.up').disabled="true"
                    this.undefinedList.childNodes[e].querySelector('button.down').disabled="true"
                }
            }
        }

    }

    addDinoFromForm(ev){
        if(this.searchMode){
                 document.querySelector('#search-form').reset()
        }
        this.searchMode=0;
        ev.preventDefault()
         //alert(this.dinos)
        const dino ={
            id: this.max + 1,
            name: ev.target.dinoName.value,
            type: ev.target.dinoClass.value,
            promoted:0,
        }
        this.dinos.unshift(dino)
        //alert(this.dinos)//-- proved to be worked.
       this.addDino(dino)
        ev.target.reset()
        this.save()
        //localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
    }

    addDino(dino){
         const listItem = this.renderListItem(dino)
         if(dino.type === 'Carnivores'){
               this.carnivoresList.insertBefore(listItem,this.carnivoresList.firstChild)
           }else if(dino.type === 'Herbivores'){
               this.herbivoresList.insertBefore(listItem,this.herbivoresList.firstChild)
           }else if(dino.type === 'Omnivores'){
               this.omnivoresList.insertBefore(listItem,this.omnivoresList.firstChild)
           }else{
                this.undefinedList.insertBefore(listItem,this.undefinedList.firstChild)
           }
        //this.list.insertBefore(listItem,this.list.firstChild)
        //This will input the listItem into the bottom of the list:this.list.appendChild(listItem)
        // add the dino to the arrays, it is already in the DOM
        ++ this.max
    }


    renderListItem(dino){
        
        //let item= document.createElement('li')
        
        let item= this.template.cloneNode(true)
        
        item.classList.remove('template') //Make them appear again, after taking the template
        if(dino.promoted===1){
        item.classList.add('fav')
        }
        item.querySelector('.dino-type').textContent = dino.type
        item.querySelector('.dino-type').setAttribute('title', dino.type)
        item.querySelector('.between-space').textContent = " : "
        item.querySelector('.dino-name').textContent = dino.name
        item.querySelector('.dino-name').setAttribute('title', dino.name)
        // const hiddenButton = document.createElement("button");
        // hiddenButton.innerHTML = "hidden";
        // hiddenButton.classList.add("button-group")
        // item.appendChild(hiddenButton)
        // item.querySelector('.dino-type').addEventListener('click', function(){
        //  if(item.classList.contains("clicked")){
        //      return // We don't do anything if it has been previously clicked
        //  }else{
        //    item.classList.add("clicked");
        //     const listItemSpan = document.createElement('span');
        //     listItemSpan.classList.add("button-group");
        //     listItemSpan.style.float="right"
        //     listItemSpan.style.verticalAlign="middle"
        //     const saveButton = document.createElement("button");
        //     saveButton.setAttribute("class",dino.id)
        //     saveButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
            
        //     saveButton.innerHTML = "Save my change";
        //     saveButton.style.marginLeft= "1rem"
        //     saveButton.style.marginRight= "1rem"
        //     saveButton.style.lineHeight="0"
        //     saveButton.addEventListener('click',function(){
        //        dino.type=item.querySelector('.dino-type').textContent
        //        dino.name=item.querySelector('.dino-name').textContent
        //        this.save()
        //     }.bind(this))
        //     listItemSpan.appendChild(saveButton)
        //     item.appendChild(listItemSpan)
        //  }
         
        //  //alert(this.clicked)
        // }.bind(this))
        // item.querySelector('.dino-name').addEventListener('click', function(){
        //  if(item.classList.contains("clicked")){
        //      return // We don't do anything if it has been previously clicked
        //  }else{
        //     item.classList.add("clicked");
        //     const listItemSpan = document.createElement('span');
        //     listItemSpan.classList.add("button-group");
        //     listItemSpan.style.float="right"
        //     listItemSpan.style.verticalAlign="middle"
        //     const saveButton = document.createElement("button");
        //     saveButton.setAttribute("class",dino.id)
        //     saveButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
            
        //     saveButton.innerHTML = "Save my change";
        //     saveButton.style.marginLeft= "1rem"
        //     saveButton.style.marginRight= "1rem"
        //     saveButton.style.lineHeight="0"
        //     saveButton.addEventListener('click',function(){
        //        dino.type=item.querySelector('.dino-type').textContent
        //        dino.name=item.querySelector('.dino-name').textContent
        //        this.save()
        //     }.bind(this))
        //     listItemSpan.appendChild(saveButton)
        //     item.appendChild(listItemSpan)
        //  }
        // }.bind(this))
        

        
        const index= this.dinos.indexOf(dino)
        //item.querySelector('.dino-name').textContent +=' '+dino.id //For Debugging on ID issue
        item.querySelector('.dino-name').addEventListener('keypress',this.saveOnEnter.bind(this,dino))
        item.querySelector('.dino-type').addEventListener('keypress',this.saveOnEnter.bind(this,dino))
        item.querySelector('button.edit').addEventListener('click',this.editDino.bind(this,dino))
        item.querySelector('button.remove').addEventListener('click',this.removeDino.bind(this))
        item.querySelector('button.fav').addEventListener('click',this.favDino.bind(this))
        item.querySelector('button.up').addEventListener('click',this.moveUP.bind(this,dino))
        item.querySelector('button.down').addEventListener('click',this.moveDown.bind(this,dino))
        
        if(index===0){
            item.querySelector('button.up').disabled="true"
        }
        if(index===this.dinos.length-1){
            item.querySelector('button.down').disabled="true"
        }


        item.dataset.id=dino.id  //A Neat Way to store data at backend

    
    //     const promoteButton = document.createElement("button");
    //     promoteButton.setAttribute("class",dino.id)
    //     promoteButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
    //     promoteButton.innerHTML = "promote";
    //     promoteButton.style.marginLeft= "1rem"
    //     promoteButton.style.marginRight= "1px"
    //     promoteButton.addEventListener('click',function(){
    //      dino.promoted=1
    //      //localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
    //      this.save()
    //     }.bind(this))
    //     //This is redundant, but it seems to be the only way to render on-the-spot
    //     const deleteButton = document.createElement("button");
    //     deleteButton.setAttribute("class",dino.id)
    //     deleteButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
    //     deleteButton.style.marginLeft= "1px"
    //     deleteButton.style.marginRight= "1px"
    //     deleteButton.innerHTML = "delete";
    //     deleteButton.addEventListener('click',function(){
         
    //      const index= this.dinos.indexOf(dino)
    //      this.dinos.splice(index, 1);
    //      //alert(this.dinos)
    //      item.remove()
    //      //localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
    //      this.save()
    //     }.bind(this))

    //     const moveUpButton = document.createElement("button");
    //     moveUpButton.setAttribute("class",dino.id)
    //    moveUpButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
    //     moveUpButton.style.marginLeft= "1px"
    //     moveUpButton.style.marginRight= "1px"
    //     moveUpButton.innerHTML = "Up";
    //    moveUpButton.addEventListener('click',function(){
    //      const index= this.dinos.indexOf(dino)
    //      if(index>0){
    //          const dinoBefore=this.dinos[index-1];
    //          const dinoNow=this.dinos[index];
    //          this.dinos[index]=dinoBefore
    //          this.dinos[index-1]=dinoNow
    //         //Debugging: alert(this.dinos)
    //         while(this.list.firstChild){
    //         this.list.removeChild(this.list.firstChild);
    //         }
    //         for (let index = 0; index < this.dinos.length; index++) {
    //         this.list.appendChild(this.renderListItem(this.dinos[index]))
    //         }
    //     }
    //     }.bind(this))

    //     const moveDownButton = document.createElement("button");
    //     moveDownButton.setAttribute("class",dino.id)
    //    moveDownButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
    //     moveDownButton.style.marginLeft= "1px"
    //     moveDownButton.style.marginRight= "1px"
    //     moveDownButton.innerHTML = "Down";
    //    moveDownButton.addEventListener('click',function(){
    //      const index= this.dinos.indexOf(dino)
    //      if(index<this.dinos.length-1){
    //          const dinoNext=this.dinos[index+1];
    //          const dinoNow=this.dinos[index];
    //          this.dinos[index]=dinoNext
    //          this.dinos[index+1]=dinoNow
    //         //Debugging: alert(this.dinos)
    //         while(this.list.firstChild){
    //         this.list.removeChild(this.list.firstChild);
    //         }
    //         for (let index = 0; index < this.dinos.length; index++) {
    //         this.list.appendChild(this.renderListItem(this.dinos[index]))
    //         }
    //     }
    //     }.bind(this))
    
    //     promoteButton.addEventListener('click',function(){
    //     })
    //     item.appendChild(promoteButton)
    //     item.appendChild(deleteButton)
    //     item.appendChild(moveUpButton)
    //     item.appendChild(moveDownButton)
        //localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
        this.save()
        return item    
    }

    save(){
        localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
        localStorage.setItem('dinoplastyCounter', JSON.stringify(this.max));
    }
    

    saveOnEnter(dino,ev){
        if(ev.key === 'Enter'){
            this.editDino(dino,ev)
        }
    }

    saveEditedChange(){
        const saveButton = document.createElement("button");
        promoteButton.setAttribute("class",dino.id)
        promoteButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
        promoteButton.innerHTML = "promote";
        promoteButton.style.marginLeft= "1rem"
        promoteButton.style.marginRight= "1px"
        promoteButton.addEventListener('click',function(){
         dino.promoted=1
         //localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
         this.save()
        }.bind(this))
        localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
        localStorage.setItem('dinoplastyCounter', JSON.stringify(this.max));
    }

    createSaveButton(){
            //alert(this)
            if(true){
            const saveButton = document.createElement("button");
            saveButton.setAttribute("class",dino.id)
            saveButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
            saveButton.innerHTML = "Save Edit";
            saveButton.style.marginLeft= "1rem"
            saveButton.style.marginRight= "1px"
            }
    }

    load(){
        const dinoJSON=window.localStorage.getItem('dinoplasty')
        const dinoJSONCounter=window.localStorage.getItem('dinoplastyCounter')
        const dinoArray= JSON.parse(dinoJSON)
        const dinoCounter=JSON.parse(dinoJSONCounter)
        if(dinoArray){
            dinoArray.revese().map(this.addDino.bind(this))
        }
        if(dinoCounter){
            this.max=dinoCounter
        }
    }


    moveUP(dino,ev){
        //this.list.insertBefore(listItem,listItem.previousElementSibling)
        const listItem=ev.target.closest('.dino')
        const previousListItem=listItem.previousElementSibling
        const index=this.dinos.findIndex((currentDino,i)=>{
            return currentDino.id===dino.id
        })
        if(previousListItem){
            const previousElementIndex=parseInt(listItem.previousElementSibling.dataset.id)
        }
        const currentElementIndex=parseInt(listItem.dataset.id)
        if(index>0){
                let currentDinoinDinos=currentElementIndex
                let previousDinoinDinos=currentElementIndex-1
                for(let i=0;i<this.dinos.length;i++){
                    const currentId= this.dinos[i].id
                    if(currentElementIndex===currentId){
                        currentDinoinDinos=i
                    }
                    if(listItem.previousElementSibling.dataset.id==currentId){
                        previousDinoinDinos=i
                    }
                }
                const previousDino= this.dinos[previousDinoinDinos]
                this.dinos[previousDinoinDinos]=this.dinos[currentDinoinDinos]
                this.dinos[currentDinoinDinos]=previousDino
                this.save()
           
        }
        this.reRender()
        if(this.searchMode){
            this.searchDinoFromForm()
        }

        // for(let index=0;index<this.dinos.length;index++){
        //     const currentId= this.dinos[index].id.toString()
        //     if(listItem.dataset.id===currentId){
        //         if(index>0){
        //             const dinoBefore=this.dinos[index-1];
        //             const dinoNow=this.dinos[index];
        //             this.dinos[index]=dinoBefore
        //             this.dinos[index-1]=dinoNow
                    //Debugging: alert(this.dinos)
                    // while(this.list.firstChild){
                    // this.list.removeChild(this.list.firstChild);
                    // }
                    // for (let index = 0; index < this.dinos.length; index++) {
                    // this.list.appendChild(this.renderListItem(this.dinos[index]))
                    // }
        //         }
                
        //         break;
        //     }
        // }
       this.save()

    }

    moveDown(dino,ev){
        //this.list.insertBefore(listItem.nextElementSibling,listItem)
        const listItem=ev.target.closest('.dino')
        const nextListItem=listItem.nextElementSibling
        const index=this.dinos.findIndex((currentDino,i)=>{
            return currentDino.id===dino.id
        })
        if(nextListItem){
            const nextElementIndex=parseInt(listItem.nextElementSibling.dataset.id)
        }
        const currentElementIndex=parseInt(listItem.dataset.id)
        if(index<this.dinos.length-1){
            let currentDinoinDinos=currentElementIndex
            let nextDinoinDinos=currentElementIndex+1
            for(let i=0;i<this.dinos.length;i++){
                const currentId= this.dinos[i].id
                if(currentElementIndex===currentId){
                    currentDinoinDinos=i
                }
                if(listItem.nextElementSibling.dataset.id==currentId){
                    nextDinoinDinos=i
                }
            }
            const nextDino= this.dinos[nextDinoinDinos]
            this.dinos[nextDinoinDinos]=this.dinos[currentDinoinDinos]
            this.dinos[currentDinoinDinos]=nextDino
            this.save()
        }

        this.reRender()
        if(this.searchMode){
            this.searchDinoFromForm()
        }

        // for(let index=0;index<this.dinos.length;index++){
        //     const currentId= this.dinos[index].id.toString()
        //     if(listItem.dataset.id===currentId){

        //         if(index<this.dinos.length-1){
        //             const dinoNext=this.dinos[index+1];
        //             const dinoNow=this.dinos[index];
        //             this.dinos[index]=dinoNext
        //             this.dinos[index+1]=dinoNow
        //             //Debugging: alert(this.dinos)
        //             while(this.list.firstChild){
        //             this.list.removeChild(this.list.firstChild);
        //             }
        //             for (let index = 0; index < this.dinos.length; index++) {
        //             this.list.appendChild(this.renderListItem(this.dinos[index]))
        //             }
        //         }
                
        //         break;
        //     }
        // }
       //this.save()

    }

    editDino(dino,ev){
         const listItem=ev.target.closest('.dino')
         const nameField= listItem.querySelector('.dino-name')
         const typeField= listItem.querySelector('.dino-type')

         const btn =listItem.querySelector('.button')
         const icon = btn.querySelector("i.fa")
         if(nameField.isContentEditable){
             nameField.contentEditable=false
            icon.classList.remove('fa-check')
             icon.classList.add('fa-pencil')
             btn.classList.add('success')
             dino.name=nameField.textContent
             this.save()
         }else{
             nameField.contentEditable=true
             nameField.focus()
             icon.classList.remove('fa-pencil')
             icon.classList.add('fa-check')
             btn.classList.remove('success')
         }
          if(typeField.isContentEditable){
             typeField.contentEditable=false
             icon.classList.remove('fa-check')
             icon.classList.add('fa-pencil')
             btn.classList.add('success')
             dino.type=typeField.textContent
             this.save()
             if(this.searchMode){
                 document.querySelector('#search-form').reset()
                 document.querySelector('#search-form').dinoNameSearch.placeholder="Please Retype to Search Again"
             }
             this.reRender()
         }else{
            typeField.contentEditable=true
            typeField.focus()
            icon.classList.remove('fa-pencil')
             icon.classList.add('fa-check')
             btn.classList.remove('success')
        }

    }

    favDino(ev){
        const listItem=ev.target.closest('.dino')
        
        for(let i=0;i<this.dinos.length;i++){
            const currentId= this.dinos[i].id.toString()
            if(listItem.dataset.id===currentId){
                if(this.dinos[i].promoted){
                    listItem.classList.remove('fav')
                    this.dinos[i].promoted=0
                    
                }else{
                    listItem.classList.add('fav')
                    this.dinos[i].promoted=1
                }
//this.dinos[i].promoted=!this.dinos[i].promoted
                
                break;
            }
        }
       this.save()

    }

    removeDino(ev){
        const listItem=ev.target.closest('.dino')
        listItem.remove()
        for(let i=0;i<this.dinos.length;i++){
            const currentId= this.dinos[i].id.toString()
            if(listItem.dataset.id===currentId){
                this.dinos.splice(i,1)
                this.reRender()
                if(this.searchMode){
                this.searchDinoFromForm()
                }
                break;
            }
        }
       this.save()
    }
    
}
const app = new App({formSelector:'#dino-form', carnivoresListSelector: '#dino-list-carnivores',
herbivoresListSelector: '#dino-list-herbivores',omnivoresListSelector: '#dino-list-omnivores',
undefinedListSelector: '#dino-list-undefined',templateSelector: '.dino.template',
carnivoresHeading:'#dino-heading-carnivores',herbivoresHeading:'#dino-heading-herbivores',
omnivoresHeading:'#dino-heading-omnivores',undefinedHeading:'#dino-heading-undefined'})