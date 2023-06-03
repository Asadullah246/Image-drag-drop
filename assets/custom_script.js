let newWidth = 0;
let newHeight = 0;

let Zind = 999999;

let existingAr = [];

function upload_file(e) {
  e.preventDefault();
  ajax_file_upload(e.dataTransfer.files[0]);
}

function file_explorer() {
  document.getElementById("selectfile").click();
}

document.getElementById("selectfile").onchange = function () {
  ajax_file_upload(document.getElementById("selectfile").files[0]);
};

function ajax_file_upload(file_obj) {
  if (file_obj != undefined) {
    var form_data = new FormData();
    form_data.append("file", file_obj);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "upload_image_ajax.php", true);
    xhttp.onload = function (event) {
      oOutput = document.querySelector(".xleft");
      if (xhttp.status == 200 && this.responseText != "error") {
        let new_id = Math.floor(Math.random() * 100);
        let img = document.createElement("img");
        img.setAttribute("src", this.responseText);
        img.setAttribute("data-id", new_id);

        img.setAttribute("width", 200);
        img.setAttribute("height", 200);

        img.setAttribute("id", "img" + new_id);
        img.setAttribute("class", "ximg");
        img.setAttribute("alt", "img" + new_id);
        img.setAttribute("draggable", true);

        oOutput.append(img);

        img.addEventListener("dragstart", dragStart);
        img.addEventListener("dragend", dragEnd);
      } else {
        oOutput.innerHTML = "Error occurred when trying to upload your file.";
      }
    };

    xhttp.send(form_data);
  }
}

const image = document.querySelector("#img1");
const target = document.querySelector("#containerNest");
let draggingObj = null;
let activeTarget = null;
const imgs = document.querySelectorAll(".ximg");

for (let img of imgs) {
  img.addEventListener("dragstart", dragStart);
  img.addEventListener("dragend", dragEnd);
}

// target.addEventListener("mousemove", mouseMove);
target.addEventListener("dragover", dragOver);
target.addEventListener("dragenter", dragEnter);
target.addEventListener("dragleave", dragLeave);
target.addEventListener("drop", drop);
// target.addEventListener("drop", function(event) {
// 	drop(event,this);
//   });

let topOfIt = "";
let leftOfIt = "";
function dragStart(e) {
  draggingObj = this;

  draggingObj.classList.add("currentItem");
  if (draggingObj.classList.contains("container")) {
    topOfIt =
      e.clientY -
      (draggingObj.offsetTop +
        draggingObj.parentElement.offsetTop +
        draggingObj.parentElement.parentElement.offsetTop);
    leftOfIt =
      e.clientX -
      (draggingObj.offsetLeft +
        draggingObj.parentElement.offsetLeft +
        draggingObj.parentElement.parentElement.offsetLeft);
  } else {
    topOfIt = e.clientY - draggingObj.offsetTop;
    leftOfIt = e.clientX - draggingObj.offsetLeft;
    // console.log("---", topOfIt, leftOfIt);
  }

  setTimeout(() => {
    this.classList.add("img_hide");
    if (this.parentElement.classList.contains("catchable")) {
      this.classList.add("img_hide_catchable");
    }
  }, 0);

  //   console.log("dragging ---------", draggingObj);
}

function dragEnd(e) {
  this.classList.remove("img_hide");
  this.classList.remove("img_hide_catchable");
  // console.log("this end", e, this);
  draggingObj = null;
  activeTarget = null;

  // const imageSect=document.getElementById("imageSect")
  // const allImg=imageSect.getElementsByClassName("replacingClass")
  // // console.log("sll", allImg);

  // var index = Array.prototype.indexOf.call(allImg, this);
  // console.log("new got ",index,  this);

  // imageSect.insertBefore(this, imageSect.children[5]);
}
let currentDrag = null;

function mouseMove(e) {
  // console.log("mouse move ", e, this);
}

function dragOver(e) {
  e.preventDefault();
  currentDrag = e.target;
  // console.log("Over", currentDrag);
}

function dragEnter(e) {
  e.preventDefault();
  activeTarget = this;
  // console.log("Enter");
}

function dragLeave(e) {
  e.preventDefault();
  // console.log("Leave");

  activeTarget = null;
}

function drop(elm) {
  console.log("droping", this);

  if (draggingObj == null) {
    // console.log("entering first function");
    return false;
  }

  const imageSect = document.getElementById("imageSect");
  const newImage = new Image();

  // newImage.id = this.id;
  newImage.setAttribute("data-id", "7");
  newImage.setAttribute("data-parent", "8");
  newImage.classList.add("ximg", "childItem", "replacingClass");
  newImage.src = "../uploads/1683383099_651-200x201.jpg";
  // newImage.alt = this.alt;
  // newImage.draggable = this.draggable;
  // newImage.resizable = this.resizable;
  newImage.setAttribute("draggable", "");
  newImage.setAttribute("resizable", "");
  console.log("newI", newImage);

  // imageSect.insertBefore(newImage, imageSect.children[5]);

  if (
    draggingObj != null &&
    draggingObj.classList.contains("container") &&
    draggingObj.classList.contains("main") &&
    draggingObj.classList.contains("resizable")
  ) {
    // console.log("entering middle function");
    draggingObj = draggingObj.querySelector(".image_container");
  }

  //   console.log("entering nothing ");

  let parent_container_left =
    document.getElementById("containerNest").offsetLeft;
  let parent_container_top = document.getElementById("containerNest").offsetTop;
  let touched_items = document.querySelectorAll(".active_touched_item");
  for (let touched_item of touched_items) {
    touched_item.classList.remove("active_touched_item");
  }
  let currentDragItem = document.querySelector(".currentItem");
  //   console.log("current drag item", currentDragItem);

  if (this.classList.contains("catchable")) {
    if (draggingObj.classList.contains("container")) {
      draggingObj = draggingObj.querySelector("img");
    }
    const index = Array.from(draggingObj.parentElement.children).indexOf(
      draggingObj
    );

    const parentElm = document.createElement("div"),
      handler = document.createElement("div"),
      closer = document.createElement("div");

    parentElm.style.backgroundColor = "transparent";
    parentElm.style.border = "none";
    parentElm.style.top = "100px";
    // h = parentElm.offsetHeight;
    // w = parentElm.offsetWidth;
    // console.log("h", h, w );
    //console.log(currentDrag.style.width);

    // new sectionjjjj

    if (draggingObj.classList.contains("image_on_canvas")) {
      //   console.log("--obj--", parseFloat(this.style.left));

      var mpool =
        elm.clientX -
        (parent_container_left +
          this.offsetLeft +
          parseFloat(this.style.left) +
          leftOfIt);
      var mpoot =
        elm.clientY -
        (parent_container_top + parseFloat(this.style.top) + topOfIt);
    } else {
      var mpool =
        elm.clientX - (parent_container_left + this.offsetLeft + leftOfIt);
      var mpoot =
        elm.clientY - (parent_container_top + this.offsetTop + topOfIt);
    }

    // console.log(elm.clientY);
    // console.log(topOfIt);
    parentElm.style.top = mpoot + "px";
    parentElm.style.left = mpool + "px";
    draggingObj.classList.remove("ximg");
    draggingObj.classList.add("image_container");

    draggingObj.style.width = "100%";
    draggingObj.style.height = "100%";

    parentElm.classList.add(
      "container",
      "main",
      "resizable",
      "active_touched_item",
      "existingStatus"
    ),
      handler.classList.add("container", "handle"),
      closer.classList.add("container", "close"),
      parentElm.appendChild(handler),
      parentElm.appendChild(closer);
    parentElm.appendChild(draggingObj);
    //   console.log("this main for insider", this);
    // console.log("parent Elm", parentElm);

    if (newWidth > 0 && newHeight > 0) {
      parentElm.offsetWidth = newWidth;
      parentElm.offsetHeight = newHeight;
      parentElm.style.width = newWidth + "px";
      parentElm.style.height = newHeight + "px";

      // Log the new width and height values
      // console.log('New Width:', newWidth);
      // console.log('New Height:', newHeight);
    } else {
      parentElm.style.width = "202px";
      parentElm.style.height = "204px";
      console.log("using existing height width");
    }

    this.append(parentElm);

    console.log("this", this);
    console.log("parent", parentElm);

    // const mainDivRect = this.getBoundingClientRect();
    // const elementRect = parentElm.getBoundingClientRect();

    const elementRect2 = parentElm.getBoundingClientRect();
    const containerRect2 = this.getBoundingClientRect();

    // Calculate the scroll positions
    const scrollLeft =
      elementRect2.left - containerRect2.left + this.scrollLeft;
    const scrollTop = elementRect2.top - containerRect2.top + this.scrollTop;

    // Scroll to the element position
    this.scrollTo({
      left: scrollLeft,
      top: scrollTop,
      behavior: "smooth", // Use 'auto' for instant scrolling without animation
    });

    parentElm.addEventListener("click", function (x) {
      //   console.log("xclientx", x.clientX);
    });
    handler.addEventListener("click", function () {
      //this.parentElement.setAttribute("draggable","false");
      if (document.querySelector(".bring-to-front") != null) {
        document
          .querySelector(".bring-to-front")
          .classList.remove("bring-to-front");
      }
      this.parentElement.classList.add("bring-to-front");
    });

    parentElm.setAttribute("draggable", "true");
    parentElm.addEventListener("dragstart", dragStart);
    parentElm.addEventListener("mousedown", function () {
      newWidth = parentElm.offsetWidth;
      newHeight = parentElm.offsetHeight;
      if (document.querySelector(".active_touched_item")) {
        let touched_items = document.querySelectorAll(".active_touched_item");
        for (let touched_item of touched_items) {
          touched_item.classList.remove("active_touched_item");
        }
      }
      this.classList.add("active_touched_item");
    });

    draggingObj.setAttribute("draggable", false);
    draggingObj.setAttribute("data-index", index);
    st(draggingObj.parentElement.querySelector(".handle"));

    draggingObj.parentElement
      .querySelector(".close")
      .addEventListener("click", function () {
        let image = this.parentElement.querySelector("img");
        let index = image.getAttribute("data-index");
        image.setAttribute("draggable", true);
        image.classList.add("ximg");
        image.removeAttribute("data-index");
        image.removeAttribute("style");
        document.querySelector(".xboard.xleft").append(image);
        document
          .querySelector(".xboard.xleft")
          .insertBefore(
            image,
            document.querySelector(".xboard.xleft").children[index]
          );
        this.parentElement.remove();
      });
    draggingObj = null;

    currentDragItem.classList.remove("currentItem");

    let img_catchable_hides = document.querySelectorAll(".img_hide_catchable");
    for (let img_ch of img_catchable_hides) {
      img_ch.remove();
      console.log("img child");
      console.log("img child", img_ch);
    }
  } else {
    const index = Array.from(draggingObj.parentElement.children).indexOf(
      draggingObj
    );

    const parentElm = document.createElement("div"),
      handler = document.createElement("div"),
      closer = document.createElement("div");

    parentElm.style.backgroundColor = "transparent";
    parentElm.style.border = "none";

    draggingObj.classList.remove("ximg");
    draggingObj.classList.add("image_container");
    draggingObj.classList.add("image_on_canvas");

    draggingObj.style.width = "100%";
    draggingObj.style.height = "100%";

    // console.log("ele", elm.clientX , "pare", parent_container_left, "offsetLeft","leftof it", leftOfIt, this,  this.offsetLeft);
    const draggingSrc = draggingObj.getAttribute("src");
    let existSrc = existingAr.find((sr) => sr == draggingSrc);
    console.log("src", existSrc);

    let mpoot = elm.clientY - (parent_container_top + topOfIt);
    let mpool = elm.clientX - (parent_container_left + leftOfIt);

    if (existSrc) {
      mpool =
        elm.clientX - (parent_container_left + this.offsetLeft + leftOfIt);
      // var mpoot = elm.clientY - (parent_container_top + this.offsetTop + topOfIt);
    } else {
      mpool = elm.clientX - (parent_container_left + leftOfIt);
      // var mpoot = elm.clientY - (parent_container_top + topOfIt);
    }
    // console.log("mpool", mpool);

    // var mpool =elm.clientX -  (parent_container_left + this.offsetLeft + leftOfIt);
    // var mpoot = elm.clientY - (parent_container_top + this.offsetTop + topOfIt);

    // 	var mpool = elm.clientX - (parent_container_left + leftOfIt);
    // var mpoot = elm.clientY - (parent_container_top + topOfIt);
    // // var mpool = elm.clientX - (((parent_container_left) ) + leftOfIt);
    // // var mpoot = elm.clientY - ((((parent_container_top) ) + topOfIt));
    // // console.log(elm.clientY,elm.clientX);
    // // console.log(topOfIt,leftOfIt);
    parentElm.style.top = mpoot + "px";
    parentElm.style.left = mpool + "px";

    parentElm.classList.add(
      "container",
      "main",
      "resizable",
      "active_touched_item",
      "existingStatus"
    ),
      handler.classList.add("container", "handle"),
      closer.classList.add("container", "close"),
      parentElm.appendChild(handler),
      parentElm.appendChild(closer);
    parentElm.appendChild(draggingObj);

    if (existSrc && newWidth > 0 && newHeight > 0) {
      // parentElm.offsetWidth=newWidth;
      // parentElm.offsetHeight =newHeight;
      parentElm.style.width = newWidth + "px";
      parentElm.style.height = newHeight + "px";

      // Log the new width and height values
      console.log("New Width:", newWidth);
      console.log("New Height:", newHeight);
    } else {
      parentElm.style.width = "202px";
      parentElm.style.height = "204px";
      console.log("using existing height width");
    }

    let existSrcTest = existingAr.find((sr) => sr == draggingSrc);
    if (existSrcTest) {
      console.log("exist src ", existSrcTest);
    } else {
      const srcValue = draggingObj.getAttribute("src");
      existingAr.push(srcValue);
    }

    this.append(parentElm);
    //  console.log("this main", this);
    // console.log("this position", parentElm);
    const elmRect = parentElm.getBoundingClientRect();
    // console.log("elmRect", elmRect);
    const ex = document.querySelector(".active_touched_item");
    // console.log("clid", ex);
    // 	var mpool =
    // 	elm.clientX - (parent_container_left + this.offsetLeft + leftOfIt) ;
    //   var mpoot = elm.clientY - (parent_container_top + this.offsetTop + topOfIt) ;
    // var mpool = elm.clientX - (((parent_container_left) ) + leftOfIt);
    // var mpoot = elm.clientY - ((((parent_container_top) ) + topOfIt));
    // console.log(elm.clientY,elm.clientX);
    // console.log(topOfIt,leftOfIt);
    //   parentElm.style.top = mpoot + "px";
    //   parentElm.style.left = mpool + "px";

    // h = parentElm.offsetHeight;
    // w = parentElm.offsetWidth;
    // console.log("h", h, w );

    const emptyPosition = findNearestEmptyPosition(
      elm.clientX,
      elm.clientY,
      elmRect
    );
    console.log("status", emptyPosition);
    if (emptyPosition == "noSpace") {
        console.log("no space");
      // ex.remove();
      // return;
      // positionImage(parentElm, emptyPosition.left, emptyPosition.top);

      parentElm.setAttribute("draggable", "true");
      parentElm.addEventListener("dragstart", dragStart);

      parentElm.addEventListener("mousedown", function (e) {
        // parentElm.addEventListener('mouseup', (e) => {
        // console.log(e.clientX, e.clientY);
        // if (e.target.classList.contains('resizable')) {
        // Get the new width and height values
        // newWidth = parentElm.offsetWidth;
        // newHeight = parentElm.offsetHeight;

        // Log the new width and height values
        // console.log('New Width:', newWidth);
        // console.log('New Height:', newHeight);
        // }
        // });
        if (document.querySelector(".active_touched_item")) {
          let touched_items = document.querySelectorAll(".active_touched_item");
          for (let touched_item of touched_items) {
            touched_item.classList.remove("active_touched_item");
          }
        }
        this.classList.add("active_touched_item");
      });

      draggingObj.setAttribute("draggable", false);
      draggingObj.setAttribute("data-index", index);


      st(draggingObj.parentElement.querySelector(".handle"));


      const image3 = new Image();

      let imagePrev = this.parentElement.querySelector("img");

      let index6 = imagePrev.getAttribute("data-index");
      image3.setAttribute("draggable", true);
      image3.setAttribute("resizable", "");
      newImage.id = imagePrev.id;
      newImage.src = imagePrev.src;
      newImage.dataset.id = imagePrev.dataset.id;
      newImage.dataset.parent = imagePrev.dataset.parent;
      image3.classList.add("ximg","childItem", "replacingClass");
      document.querySelector(".xboard.xleft").append(image3);

      console.log("nwddd " , image3);
      document
        .querySelector(".xboard.xleft")
        .insertBefore(
          image3,
          document.querySelector(".xboard.xleft").children[index6]
        );



      draggingObj.parentElement
        .querySelector(".close")
        .addEventListener("click", function () {
          let image = this.parentElement.querySelector("img");
          let index = image.getAttribute("data-index");
          image.setAttribute("draggable", true);
          image.classList.add("ximg");
          image.removeAttribute("data-index");
          image.removeAttribute("style");
          document.querySelector(".xboard.xleft").append(image);
          console.log("gt indexdd", index);
          document
            .querySelector(".xboard.xleft")
            .insertBefore(
              image,
              document.querySelector(".xboard.xleft").children[index]
            );
          this.parentElement.remove();
          console.log("neww", image);
        });

        draggingObj.parentElement.querySelector(".close").click() ;


      draggingObj = null;
      currentDragItem.classList.remove("currentItem");













    } else {
      //   console.log("not detected", emptyPosition);
      //   this.append(parentElm);

      //   positionImage(parentElm,  elmRect.left, elmRect.top);
      // parentElm.style.top = elmRect;
      // parentElm.style.left = mpool + "px";
      // var computedStyle = window.getComputedStyle(parentElm);
      // var previousTop = computedStyle.getPropertyValue('top');
      // var previousLeft = computedStyle.getPropertyValue('left');
      // var previousValueTop = parseFloat(previousTop);
      // var previousValueLeft = parseFloat(previousLeft);

      // parentElm.style.left = (previousValueLeft + elmRect.width + elmRect.width *20/100)+"px";
      // parentElm.style.left = mpool + "px";

      parentElm.setAttribute("draggable", "true");
      parentElm.addEventListener("dragstart", dragStart);

      parentElm.addEventListener("mousedown", function (e) {
        // parentElm.addEventListener('mouseup', (e) => {
        // console.log(e.clientX, e.clientY);
        // if (e.target.classList.contains('resizable')) {
        // Get the new width and height values
        newWidth = parentElm.offsetWidth;
        newHeight = parentElm.offsetHeight;

        // Log the new width and height values
        // console.log('New Width:', newWidth);
        // console.log('New Height:', newHeight);
        // }
        // });
        if (document.querySelector(".active_touched_item")) {
          let touched_items = document.querySelectorAll(".active_touched_item");
          for (let touched_item of touched_items) {
            touched_item.classList.remove("active_touched_item");
          }
        }
        this.classList.add("active_touched_item");
      });

      draggingObj.setAttribute("draggable", false);
      draggingObj.setAttribute("data-index", index);


      const image3 = new Image();

      let imagePrev = this.parentElement.querySelector("img");

      let index6 = imagePrev.getAttribute("data-index");
      image3.setAttribute("draggable", true);
      image3.setAttribute("resizable", "");
      newImage.id = imagePrev.id;
      newImage.src = imagePrev.src;
      newImage.dataset.id = imagePrev.dataset.id;
      newImage.dataset.parent = imagePrev.dataset.parent;
      image3.classList.add("ximg","childItem", "replacingClass");
      // document.querySelector(".xboard.xleft").append(image3);
      // document
      //   .querySelector(".xboard.xleft")
      //   .insertBefore(
      //     image3,
      //     document.querySelector(".xboard.xleft").children[index6]
      //   );



      st(draggingObj.parentElement.querySelector(".handle"));
      draggingObj.parentElement
        .querySelector(".close")
        .addEventListener("click", function () {
          let image = this.parentElement.querySelector("img");
          let index5 = image.getAttribute("data-index");
          image.setAttribute("draggable", true);
          image.classList.add("ximg");
          image.removeAttribute("data-index");
          image.removeAttribute("style");
          document.querySelector(".xboard.xleft").append(image);
          console.log("gt indexdd", index5);
          document
            .querySelector(".xboard.xleft")
            .insertBefore(
              image,
              document.querySelector(".xboard.xleft").children[index5]
            );
          this.parentElement.remove();
        });

// console.log("imag", this.parentElement.querySelector("img"));





      draggingObj = null;
      currentDragItem.classList.remove("currentItem");
      // return ;
    } 

    // console.log("not finded");

    // console.log("else parent element", parentElm);

    // this.append(parentElm);

    // parentElm.setAttribute("draggable","true");
    // parentElm.addEventListener('dragstart',dragStart);

    // parentElm.addEventListener('mousedown',function(){
    // 	if(document.querySelector('.active_touched_item')){
    // 		let touched_items=document.querySelectorAll('.active_touched_item');
    // 		for(let touched_item of touched_items){
    // 			touched_item.classList.remove('active_touched_item');
    // 		}
    // 	}
    // 	this.classList.add('active_touched_item');
    // });

    // draggingObj.setAttribute("draggable",false);
    // draggingObj.setAttribute('data-index',index);
    // st(draggingObj.parentElement.querySelector(".handle"));
    // draggingObj.parentElement.querySelector(".close").addEventListener("click",function(){
    // 	let image=this.parentElement.querySelector('img');
    // 	let index=image.getAttribute('data-index');
    // 	image.setAttribute('draggable',true);
    // 	image.classList.add("ximg");
    // 	image.removeAttribute('data-index');
    // 	image.removeAttribute('style');
    // 	document.querySelector(".xboard.xleft").append(image);
    // 	document.querySelector(".xboard.xleft").insertBefore(image, document.querySelector(".xboard.xleft").children[index]);
    // 	this.parentElement.remove();
    // });

    // draggingObj=null;
    // currentDragItem.classList.remove("currentItem");
  }
}

function findNearestEmptyPosition(x, y, elmRect) {
  // console.log("ele x y" , x, y);
  const images = Array.from(
    document.getElementsByClassName("created_container")
  );
  //   console.log("images", images);
  //   const h=205 ;
  //   const w=203 ;

  // Calculate the distances between the drop coordinates and the positions of existing images
  if (images.length > 0) {
    const distances = images.map((image) => {
      const rect = image.getBoundingClientRect();
      //   console.log("react is", rect);
      if (
        ((rect.left <= elmRect.left && rect.right >= elmRect.left) ||
          (rect.right >= elmRect.right && rect.left <= elmRect.right)) &&
        ((rect.top <= elmRect.top && rect.bottom >= elmRect.top) ||
          (rect.bottom >= elmRect.bottom && rect.top <= elmRect.bottom))
      ) {
        // console.log("objext found");
        return "noSpace";
      } else {
        return "space found";
      }
      // if((rect.left <= elmRect.left <=rect.right) || rect.right  )

      // console.log('rect', rect );
      // const centerX = rect.left + rect.width / 2;
      // const centerY = rect.top + rect.height / 2;
      // return Math.sqrt((centerX - x) ** 2 + (centerY - y) ** 2);
    });
    return distances;
  } else {
    return "space found";
  }

  console.log("dis", distances);

  // Sort the distances array in ascending order
  const sortedDistances = distances.slice().sort((a, b) => a - b);

  //   console.log("sorted", sortedDistances);
  // Find the index of the nearest empty position
  const nearestIndex = distances.findIndex(
    (distance) => sortedDistances[0] === distance
  );
  console.log("sorted 1st", sortedDistances[0]);
  // If the nearest empty position is within a threshold distance, return its coordinates
  const threshold = 200; // Adjust this value as needed
  if (sortedDistances[0] <= threshold) {
    console.log("catched in 100");
    const nearestImage = images[nearestIndex];
    console.log("nearest image", nearestImage);
    const rect = nearestImage.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    return { left: centerX + rect.width / 2, top: centerY };
  }
  console.log("not catched");

  return null; // If no valid empty position is found
}

function positionImage(image, left, top) {
  image.style.left = left + "px";
  image.style.top = top + "px";
}

const left_open_close_btn = document.querySelector(".control_panel_open_close");
const app_container = document.querySelector("#app");

left_open_close_btn.addEventListener("click", function () {
  if (app_container.classList.contains("panel_closed_left")) {
    app_container.classList.add("panel_opened_left");
    app_container.classList.remove("panel_closed_left");

    left_open_close_btn.classList.add("opened_panel");
    left_open_close_btn.classList.remove("closed_panel");
  } else {
    app_container.classList.add("panel_closed_left");
    app_container.classList.remove("panel_opened_left");

    left_open_close_btn.classList.add("closed_panel");
    left_open_close_btn.classList.remove("opened_panel");
  }
});

let formAdd = document.querySelector("#addForm");
formAdd.onclick = function () {
  alertify.prompt(
    "iframe code for form <small id='popup_form_create' style='float: right;'><a href='http://ekram.pro/ericdev2023/form/index.php/admin' target='_blank'>Create Form</a></small>",
    "",
    function (evt, value) {
      if (value) {
        //                 const parser = new DOMParser();
        // const htmlDoc = parser.parseFromString(value, 'text/html');
        // console.log(value,htmlDoc.innerHTML);

        var t = document.createElement("template");
        t.innerHTML = value;
        var form_content = t.content;
        // console.log(t.content);
        // document.querySelector('#containerNest').append(t.content)

        const body_canvas = document.querySelector("#containerNest");
        const parentElm = document.createElement("div"),
          handler = document.createElement("div"),
          closer = document.createElement("div");

        parentElm.style.backgroundColor = "transparent";
        parentElm.style.border = "none";

        // console.log(form_content.querySelector('iframe'))

        form_content.querySelector("iframe").style.height = "100%";
        form_content.querySelector("iframe").removeAttribute("scrolling");

        parentElm.classList.add(
          "container",
          "main",
          "resizable",
          "active_touched_item"
        ),
          handler.classList.add("container", "handle"),
          closer.classList.add("container", "close"),
          parentElm.appendChild(handler),
          parentElm.appendChild(closer);
        parentElm.appendChild(form_content), body_canvas.append(parentElm);

        parentElm.addEventListener("mousedown", function () {
          if (document.querySelector(".active_touched_item")) {
            let touched_items = document.querySelectorAll(
              ".active_touched_item"
            );
            for (let touched_item of touched_items) {
              touched_item.classList.remove("active_touched_item");
            }
          }
          this.classList.add("active_touched_item");
        });

        st(parentElm.querySelector(".handle"));

        parentElm
          .querySelector(".close")
          .addEventListener("click", function () {
            parentElm.remove();
          });
      }
    },
    function () {
      alertify.error("Cancel");
    }
  );
};

function handleClick(event) {
  // Get the clicked element
  const clickedElement = event.target;

  // Perform actions based on the clicked element
  if (clickedElement.classList.contains("existingStatus")) {
    // Do something specific for elements with the class "myClass"
    console.log("Element with class 'myClass' clicked!");
    clickedElement.style.zIndex = Zind + 1;
  }
}

// Add event listeners to multiple elements with the same class
const elements = document.getElementsByClassName("existingStatus");
for (let i = 0; i < elements.length; i++) {
  elements[i].addEventListener("click", handleClick);
}
