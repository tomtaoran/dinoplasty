//console.log('It worked!')
const app ={
   
    init(selectors){
        
        this.dinos=[]
        this.localArr=window.localStorage.getItem('dinoplasty')
        this.localCounter=window.localStorage.getItem('dinoplastyCounter')
        this.max=0
        this.clicked=0; // For detect editing efforts
        if(this.localCounter){
            this.max=parseInt(this.localCounter)
        }
        this.list = document.querySelector(selectors.listSelector)
        this.template=document.querySelector(selectors.templateSelector)
        if(this.localArr){
            this.dinos=JSON.parse(this.localArr)
            while(this.list.firstChild){
            this.list.removeChild(this.list.firstChild);
            }
            for (let index = 0; index < this.dinos.length; index++) {
            this.list.appendChild(this.renderListItem(this.dinos[index]))
            }
        }
        
        
        
        document.querySelector(selectors.formSelector).addEventListener('submit',this.addDinoFromForm.bind(this))
        document.querySelector(selectors.formSelector).addEventListener('submit',this.reRender.bind(this))
        //document.querySelector(selectors.formSelector).dinoName.focus() OLD WAY Support all browser
    },

    reRender(){
        while(this.list.firstChild){
        this.list.removeChild(this.list.firstChild);
        }
       for (let index = 0; index < this.dinos.length; index++) {
        this.list.appendChild(this.renderListItem(this.dinos[index]))
        }
    },
    

    addDinoFromForm(ev){
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
    },

    addDino(dino){
         const listItem = this.renderListItem(dino)
        this.list.insertBefore(listItem,this.list.firstChild)
        //This will input the listItem into the bottom of the list:this.list.appendChild(listItem)
        // add the dino to the arrays, it is already in the DOM
        ++ this.max
    },


    renderListItem(dino){
        
        //let item= document.createElement('li')
        
        let item= this.template.cloneNode(true)
        
        item.classList.remove('template') //Make them appear again, after taking the template
        if(dino.promoted===1){
        item.classList.add('fav')
        }
        item.querySelector('.dino-type').textContent = dino.type
        item.querySelector('.between-space').textContent = " : "
        item.querySelector('.dino-name').textContent = dino.name
        const hiddenButton = document.createElement("button");
        hiddenButton.innerHTML = "hidden";
        hiddenButton.classList.add("button-group")
        item.appendChild(hiddenButton)
        item.querySelector('.dino-type').addEventListener('click', function(){
         if(item.classList.contains("clicked")){
             return // We don't do anything if it has been previously clicked
         }else{
           item.classList.add("clicked");
            const listItemSpan = document.createElement('span');
            listItemSpan.classList.add("button-group");
            listItemSpan.style.float="right"
            listItemSpan.style.verticalAlign="middle"
            const saveButton = document.createElement("button");
            saveButton.setAttribute("class",dino.id)
            saveButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
            
            saveButton.innerHTML = "Save my change";
            saveButton.style.marginLeft= "1rem"
            saveButton.style.marginRight= "1rem"
            saveButton.style.lineHeight="0"
            saveButton.addEventListener('click',function(){
               dino.type=item.querySelector('.dino-type').textContent
               dino.name=item.querySelector('.dino-name').textContent
               this.save()
            }.bind(this))
            listItemSpan.appendChild(saveButton)
            item.appendChild(listItemSpan)
         }
         
         //alert(this.clicked)
        }.bind(this))
        item.querySelector('.dino-name').addEventListener('click', function(){
         if(item.classList.contains("clicked")){
             return // We don't do anything if it has been previously clicked
         }else{
            item.classList.add("clicked");
            const listItemSpan = document.createElement('span');
            listItemSpan.classList.add("button-group");
            listItemSpan.style.float="right"
            listItemSpan.style.verticalAlign="middle"
            const saveButton = document.createElement("button");
            saveButton.setAttribute("class",dino.id)
            saveButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
            
            saveButton.innerHTML = "Save my change";
            saveButton.style.marginLeft= "1rem"
            saveButton.style.marginRight= "1rem"
            saveButton.style.lineHeight="0"
            saveButton.addEventListener('click',function(){
               dino.type=item.querySelector('.dino-type').textContent
               dino.name=item.querySelector('.dino-name').textContent
               this.save()
            }.bind(this))
            listItemSpan.appendChild(saveButton)
            item.appendChild(listItemSpan)
         }
        }.bind(this))
        

        
        const index= this.dinos.indexOf(dino)
        //item.querySelector('.dino-name').textContent +=' '+dino.id //For Debugging on ID issue
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
    },

    save(){
        localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
        localStorage.setItem('dinoplastyCounter', JSON.stringify(this.max));
    },
    
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
    },

    createSaveButton(){
            //alert(this)
            if(true){
            alert(this)
            const saveButton = document.createElement("button");
            saveButton.setAttribute("class",dino.id)
            saveButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
            saveButton.innerHTML = "Save Edit";
            saveButton.style.marginLeft= "1rem"
            saveButton.style.marginRight= "1px"
            }
    },

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
    },


    moveUP(dino,ev){
        const listItem=ev.target.closest('.dino')
        
        const index=this.dinos.findIndex((currentDino,i)=>{
            return currentDino.id===dino.id
        })
        if(index>0){
            this.list.insertBefore(listItem,listItem.previousElementSibling)
            const previousDino= this.dinos[index-1]
            this.dinos[index-1]=dino
            this.dinos[index]=previousDino
            this.save()
        }
        while(this.list.firstChild){
           this.list.removeChild(this.list.firstChild);
        }
        for (let index = 0; index < this.dinos.length; index++) {
            this.list.appendChild(this.renderListItem(this.dinos[index]))
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

    },

    moveDown(dino,ev){
        const listItem=ev.target.closest('.dino')
        
        const index=this.dinos.findIndex((currentDino,i)=>{
            return currentDino.id===dino.id
        })
        if(index<this.dinos.length-1){
            this.list.insertBefore(listItem.nextElementSibling,listItem)
            const nextDino= this.dinos[index+1]
            this.dinos[index+1]=dino
            this.dinos[index]=nextDino
            this.save()
        }

        while(this.list.firstChild){
           this.list.removeChild(this.list.firstChild);
        }
        for (let index = 0; index < this.dinos.length; index++) {
            this.list.appendChild(this.renderListItem(this.dinos[index]))
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
       this.save()

    },

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

    },

    removeDino(ev){
        const listItem=ev.target.closest('.dino')
        listItem.remove()
        for(let i=0;i<this.dinos.length;i++){
            const currentId= this.dinos[i].id.toString()
            if(listItem.dataset.id===currentId){
                this.dinos.splice(i,1)
                while(this.list.firstChild){
                    this.list.removeChild(this.list.firstChild);
                    }
                    for (let index = 0; index < this.dinos.length; index++) {
                    this.list.appendChild(this.renderListItem(this.dinos[index]))
                    }
                break;
            }
        }
       this.save()
    },
    
}
app.init({formSelector:'#dino-form', listSelector: '#dino-list',templateSelector: '.dino.template'})