//console.log('It worked!')
const app ={
   
    init(selectors){
        
        this.dinos=[]
        //localStorage.setItem('dinoplasty', '');
        this.localArr=window.localStorage.getItem('dinoplasty')
        this.max=0
        this.list = document.querySelector(selectors.listSelector)
        if(this.localArr){
            this.dinos=JSON.parse(this.localArr)
            while(this.list.firstChild){
            this.list.removeChild(this.list.firstChild);
            }
            for (let index = 0; index < this.dinos.length; index++) {
            this.list.appendChild(this.renderListItem(this.dinos[index]))
            }
        }
        
        
        document.querySelector(selectors.formSelector).addEventListener('submit',this.addDino.bind(this))
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
    

    addDino(ev){
        ev.preventDefault()
         //alert(this.dinos)
        const dino ={
            id: this.max + 1,
            name: ev.target.dinoName.value,
            promoted:0,
        }
        this.dinos.push(dino)
        //alert(this.dinos)//-- proved to be worked.
        const listItem = this.renderListItem(dino)
        this.list.appendChild(listItem)
        // add the dino to the arrays, it is already in the DOM
        ++ this.max
        ev.target.reset()
        localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
    },

    handlePromote(ev){
    ev.preventDefault()
    const b= ev.target
    },

    renderListItem(dino){
        
        let item= document.createElement('li')
        if(dino.promoted===1){
        item.style.color="red"
        }
        item.textContent = dino.name
        const promoteButton = document.createElement("button");
        promoteButton.setAttribute("class",dino.id)
        promoteButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
        promoteButton.innerHTML = "promote";
        promoteButton.style.marginLeft= "1rem"
        promoteButton.style.marginRight= "1rem"
        promoteButton.addEventListener('click',function(){
         dino.promoted=1
         localStorage.setItem('dinoplasty', JSON.stringify(this.dinos));
        }.bind(this))
        //This is redundant, but it seems to be the only way to render on-the-spot
        const deleteButton = document.createElement("button");
        deleteButton.setAttribute("class",dino.id)
        deleteButton.className += " button success"; //Let's set it button success for now, we can make it better, won't we?
        deleteButton.style.marginLeft= "1rem"
        deleteButton.style.marginRight= "1rem"
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
        moveUpButton.style.marginLeft= "1rem"
        moveUpButton.style.marginRight= "1rem"
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
        moveDownButton.style.marginLeft= "1rem"
        moveDownButton.style.marginRight= "1rem"
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
    
    
}
app.init({formSelector:'#dino-form', listSelector: '#dino-list'})