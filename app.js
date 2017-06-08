//console.log('It worked!')
const app ={
   
    init(selectors){
        
        this.dinos=[]
        //localStorage.setItem('dinoplasty', '');
        this.localArr=window.localStorage.getItem('dinoplasty')
        this.max=0
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
            promoted:0,
        }
        this.dinos.unshift(dino)
        //alert(this.dinos)//-- proved to be worked.
       this.addDino(dino)
        ev.target.reset()
        localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
    },

    addDino(dino){
         const listItem = this.renderListItem(dino)
        this.list.insertBefore(listItem,this.list.firstChild)
        //This will input the listItem into the bottom of the list:this.list.appendChild(listItem)
        // add the dino to the arrays, it is already in the DOM
        ++ this.max
    },

    handlePromote(ev){
    ev.preventDefault()
    const b= ev.target
    },

    renderListItem(dino){
        
        //let item= document.createElement('li')
        let item= this.template.cloneNode(true)
        item.classList.remove('template') //Make them appear again, after taking the template
        if(dino.promoted===1){
        item.style.color="red"
        }
        item.querySelector('.dino-name').textContent = dino.name
        item.querySelector('button.remove').addEventListener('click',this.removeDino.bind(this))
        item.dataset.id=dino.id  //A Neat Way to store data at backend
        const promoteButton = document.createElement("button");
        promoteButton.setAttribute("class",dino.id)
        promoteButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
        promoteButton.innerHTML = "promote";
        promoteButton.style.marginLeft= "1rem"
        promoteButton.style.marginRight= "1px"
        promoteButton.addEventListener('click',function(){
         dino.promoted=1
         localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
        }.bind(this))
        //This is redundant, but it seems to be the only way to render on-the-spot
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class",dino.id)
        deleteButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
        deleteButton.style.marginLeft= "1px"
        deleteButton.style.marginRight= "1px"
        deleteButton.innerHTML = "delete";
        deleteButton.addEventListener('click',function(){
         
         const index= this.dinos.indexOf(dino)
         this.dinos.splice(index, 1);
         //alert(this.dinos)
         item.remove()
         localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
        }.bind(this))

        const moveUpButton = document.createElement("button");
        moveUpButton.setAttribute("class",dino.id)
       moveUpButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
        moveUpButton.style.marginLeft= "1px"
        moveUpButton.style.marginRight= "1px"
        moveUpButton.innerHTML = "Up";
       moveUpButton.addEventListener('click',function(){
         const index= this.dinos.indexOf(dino)
         if(index>0){
             const dinoBefore=this.dinos[index-1];
             const dinoNow=this.dinos[index];
             this.dinos[index]=dinoBefore
             this.dinos[index-1]=dinoNow
            //Debugging: alert(this.dinos)
            while(this.list.firstChild){
            this.list.removeChild(this.list.firstChild);
            }
            for (let index = 0; index < this.dinos.length; index++) {
            this.list.appendChild(this.renderListItem(this.dinos[index]))
            }
        }
        }.bind(this))

        const moveDownButton = document.createElement("button");
        moveDownButton.setAttribute("class",dino.id)
       moveDownButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
        moveDownButton.style.marginLeft= "1px"
        moveDownButton.style.marginRight= "1px"
        moveDownButton.innerHTML = "Down";
       moveDownButton.addEventListener('click',function(){
         const index= this.dinos.indexOf(dino)
         if(index<this.dinos.length-1){
             const dinoNext=this.dinos[index+1];
             const dinoNow=this.dinos[index];
             this.dinos[index]=dinoNext
             this.dinos[index+1]=dinoNow
            //Debugging: alert(this.dinos)
            while(this.list.firstChild){
            this.list.removeChild(this.list.firstChild);
            }
            for (let index = 0; index < this.dinos.length; index++) {
            this.list.appendChild(this.renderListItem(this.dinos[index]))
            }
        }
        }.bind(this))
    
        promoteButton.addEventListener('click',function(){
         item.style.color="red"
        })
        item.appendChild(promoteButton)
        item.appendChild(deleteButton)
        item.appendChild(moveUpButton)
        item.appendChild(moveDownButton)
        localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
        return item    
    },

    save(){
        localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
    },

    load(){
        const dinoJSON=window.localStorage.getItem('dinoplasty')
        const dinoArray= JSON.parse(dinoJSON)
        if(dinoArray){
            dinoArray.revese().map(this.addDino.bind(this))
        }
    },
    removeDino(ev){
        const listItem=ev.target.closest('.dino')
        listItem.remove()
        for(let i=0;i<this.dinos.length;i++){
            const currentId= this.dinos[i].id.toString()
            if(listItem.dataset.id===currentId){
                this.dinos.splice(i,1)
                
                break;
            }
        }
       this.save()
    },
    
}
app.init({formSelector:'#dino-form', listSelector: '#dino-list',templateSelector: '.dino.template'})