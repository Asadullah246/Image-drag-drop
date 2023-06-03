
// alertify.alert('Ready!');

const contextMenuArr=[
    {
        name:'option1',
        label:'Option 1',
        // target:'#containerNest',
        action: function(evt){
            console.log('test action called')
        }
    },
    {
        name:'option2',
        label:'Option 2',
        target:'!img',
        action:function(evt){
            console.log('test another action called');
        }
    },
    {
        name:'add_url',
        label:'Add URL',
        target:'img',
        action:function(evt){
            if(document.querySelector('.updating_attribute'))document.querySelector('.updating_attribute').classList.remove('updating_attribute');
            // console.log(document.querySelector('.clicked_item_target'),'target for img element');
            document.querySelector('.clicked_item_target').classList.add('updating_attribute')
            alertify.prompt("Set url for image ?", "",
            function(evt, value ){
                //console.log(document.querySelector('.clicked_item_target'));
                // alertify.success('URL added to imag: ' + value);                
                document.querySelector('.updating_attribute').setAttribute('data-url',value);                
                document.querySelector('.updating_attribute').style.cursor="pointer";
                document.querySelector('.updating_attribute').onclick=function(){
                  window.open(this.getAttribute('data-url'), '_blank');
                }
                document.querySelector('.updating_attribute').classList.remove('updating_attribute');
                alertify.success('URL added to image!!! ' );
            },
            function(){
                alertify.error('Cancel');
            })
            ;
        }
    },
    {
        name:'remove_url',
        label:'Remove URL',
        target:'img[data-url]',
        attribute:{
          'data-url':'!null'
        },
        action:function(evt){
          document.querySelector('.clicked_item_target').removeAttribute('data-url');
          document.querySelector('.clicked_item_target').style.cursor="initial";
        }
    },
    {
        name:'container',
        label:'Container',
        target:'.created_container',
        action:function(evt){
            console.log('clicked on created container');
        }
    },
    {
        name:'duplicate',
        label:'Duplicate',
        target:'img',
        action:function(evt){            
            let current_item=document.querySelector('.clicked_item_target');
            
          if(current_item.parentElement.classList.contains('container')){

            const cloneedItem = current_item.cloneNode(true);
            // console.log(cloneedItem);
            let new_id=Math.floor(Math.random() * 100);
            cloneedItem.setAttribute('id',new_id);
            cloneedItem.addEventListener('dragstart',dragStart);
            cloneedItem.addEventListener('dragend',dragEnd);

            // current_item.parentElement.parentNode.append(cloneedItem);

            const index = 0
            
            const parentElm = document.createElement("div"),
            handler = document.createElement("div"),
            closer = document.createElement("div");
        
            parentElm.style.backgroundColor="transparent";
            parentElm.style.border="none";
            parentElm.style.top="100px";
            //console.log(currentDrag.style.width);
            var mpool = current_item.parentElement.style.left;
            var mpoot = current_item.parentElement.style.top;

            parentElm.style.top= mpoot +"px";
            parentElm.style.left= mpool +"px";
            cloneedItem.classList.remove("ximg");
            cloneedItem.classList.add("image_container")
        
            cloneedItem.style.width="100%";
            cloneedItem.style.height="100%";
            
        
        
            parentElm.classList.add("container", "main", "resizable","active_touched_item"),
            handler.classList.add("container", "handle"),
            closer.classList.add("container", "close"),
            parentElm.appendChild(handler),
            parentElm.appendChild(closer);
            parentElm.appendChild(cloneedItem),
            current_item.parentElement.parentNode.append(parentElm);
            
            parentElm.addEventListener('click',function(x){
              console.log(x.clientX);
            });
            handler.addEventListener('click',function(){
              //this.parentElement.setAttribute("draggable","false");
              if(document.querySelector(".bring-to-front") != null){
                document.querySelector(".bring-to-front").classList.remove("bring-to-front");
              }
              this.parentElement.classList.add("bring-to-front");
            });
            parentElm.setAttribute("draggable","true");
            parentElm.addEventListener('dragstart',dragStart);
            parentElm.addEventListener('mousedown',function(){
              if(document.querySelector('.active_touched_item')){
                let touched_items=document.querySelectorAll('.active_touched_item');
                for(let touched_item of touched_items){
                  touched_item.classList.remove('active_touched_item');
                }                    
              }
              this.classList.add('active_touched_item');
            });
        
        
            cloneedItem.setAttribute("draggable",false);
            cloneedItem.setAttribute('data-index',index);


            st(cloneedItem.parentElement.querySelector(".handle"));

            cloneedItem.parentElement.querySelector(".close").addEventListener("click",function(){
              let image=this.parentElement.querySelector('img');
              let index=image.getAttribute('data-index');
              image.setAttribute('draggable',true);        
              image.classList.add("ximg");
              image.removeAttribute('data-index');
              image.removeAttribute('style');
              document.querySelector(".xboard.xleft").append(image);
              document.querySelector(".xboard.xleft").insertBefore(image, document.querySelector(".xboard.xleft").children[index]);
              this.parentElement.remove();
            });

  
          }else{
            const cloneedItem = current_item.cloneNode(true);
            let new_id=Math.floor(Math.random() * 100);
            cloneedItem.setAttribute('id',new_id);
            cloneedItem.addEventListener('dragstart',dragStart);
            cloneedItem.addEventListener('dragend',dragEnd);
            current_item.parentNode.insertBefore(cloneedItem, current_item.nextSibling);   
          }



         
        }
    }
];


var contextMenu = null;//document.getElementById("context-menu");
const scope = document.querySelector("body");

function validate_menu_item(obj,target){

  
    
    if(obj.target.substring(0, 1) === '.' || obj.target.substring(0, 1) === '#'){
        return target==document.querySelector(obj.target);
    }else if(obj.target.substring(0, 1) === '!'){
      
      let obj_target= obj.target.substring(1);

      if(obj_target.substring(0, 1) === '.' || obj_target.substring(0, 1) === '#'){
        return target!=document.querySelector(obj_target);
      }else{
        return target.tagName.toLowerCase()!==obj_target;
      }      
    }else{      
      if(typeof obj.attribute!='undefined'){
        let errCheck=0;
        for (let i in obj.attribute) {
          let attr_val=obj.attribute[i];
          if(attr_val=='!null' && (target.getAttribute(i)==null || target.getAttribute(i)=='')){
            errCheck++;
          }else if( attr_val!='!null' && target.getAttribute(i) != attr_val){
            errCheck++;
          }          
       }
       if(errCheck==0)return true;
      }else{
        return target.tagName.toLowerCase()==obj.target;
      }        
    }
    return false;
}

function clear_selection(){
    if(document.querySelector('.clicked_item_target'))document.querySelector('.clicked_item_target').classList.remove('clicked_item_target');
}

function create_context_menu(event){
    if(contextMenu!=null)contextMenu.remove();
    clear_selection();
    //  console.log(event,event.target);

    event.target.classList.add('clicked_item_target');

    let parentMnElm=document.createElement('DIV');
    parentMnElm.setAttribute("id","context-menu");
    parentMnElm.style.zIndex='999999999999999999999999';
    contextMenuArr.forEach(function(obj ){
      console.log()
        let show_item=typeof obj.target !='undefined'?validate_menu_item(obj,event.target):true;

        if(show_item){
            let menuItem=document.createElement('DIV');
            menuItem.classList.add('item');
            let menuLink=document.createElement('a');
            menuLink.innerHTML=obj.label;
            menuLink.onclick=function(){
              obj.action();
              if(contextMenu){
                contextMenu.classList.remove("visible");
                contextMenu.remove();
              }
              clear_selection();
            }
            menuLink.classList.add(obj.name);
            menuItem.append(menuLink);            
            parentMnElm.append(menuItem);
        }


    });
    contextMenu=parentMnElm;
    document.querySelector('body').append(parentMnElm);
}

const normalizePozition = (mouseX, mouseY) => {
  // ? compute what is the mouse position relative to the container element (scope)
  let {
    left: scopeOffsetX,
    top: scopeOffsetY,
  } = scope.getBoundingClientRect();
  
  scopeOffsetX = scopeOffsetX < 0 ? 0 : scopeOffsetX;
  scopeOffsetY = scopeOffsetY < 0 ? 0 : scopeOffsetY;
 
  const scopeX = mouseX - scopeOffsetX;
  const scopeY = mouseY - scopeOffsetY;

  // ? check if the element will go out of bounds
  const outOfBoundsOnX =
    scopeX + contextMenu.clientWidth > scope.clientWidth;

  const outOfBoundsOnY =
    scopeY + contextMenu.clientHeight > scope.clientHeight;

  let normalizedX = mouseX;
  let normalizedY = mouseY;

  // ? normalize on X
  if (outOfBoundsOnX) {
    normalizedX =
      scopeOffsetX + scope.clientWidth - contextMenu.clientWidth;
  }

  // ? normalize on Y
  if (outOfBoundsOnY) {
    normalizedY =
      scopeOffsetY + scope.clientHeight - contextMenu.clientHeight;
  }

  return { normalizedX, normalizedY };
};

scope.addEventListener("contextmenu", (event) => {

  event.preventDefault();

  create_context_menu(event);

  const { clientX: mouseX, clientY: mouseY } = event;

  const { normalizedX, normalizedY } = normalizePozition(mouseX, mouseY);

  contextMenu.classList.remove("visible");

  contextMenu.style.top = `${normalizedY}px`;
  contextMenu.style.left = `${normalizedX}px`;

  setTimeout(() => {
    contextMenu.classList.add("visible");
  });
});

scope.addEventListener("click", (e) => {
  // ? close the menu if the user clicks outside of it
  if (e.target.offsetParent != contextMenu) {
    if(contextMenu){
      contextMenu.classList.remove("visible");
      contextMenu.remove();
    }
    clear_selection();
  }
});