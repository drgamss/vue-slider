Vue.component('master-comp', {
  created: function(){
    for (var i = 0; i < this.items.length; i++){
      this.items[i].left = 0;
      this.items[i].originalIndex = i;
    }
    var lastItem = this.items.pop();
    this.items.unshift(lastItem);   
  },
  mounted: function(){
      this.initializeSlides();
      this.setLastItemLeft();
      this.setFirstItemLeft();      
  },
  data: function () {
    return {
        items: [
        {name: 'Bella Enrico', location: '419 Sutherland Point', age: 30, text: 'Story - Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lajsh hhdos ksjdjd.', link: '#', image: 'https://source.unsplash.com/random/200x200', left: 0, lastLeft: 0},
        {name: 'Debor Barr', location: '31 Autumn Leaf Center', age: 23, text: 'Story - Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lajsh hhdos ksjdjd.', link: '#', image: 'http://via.placeholder.com/350x200', left: 0, lastLeft: 0},
        {name: 'Cedric Rummery', location: '1 Amoth Alley', age: 54, text: 'Story - Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lajsh hhdos ksjdjd.', link: '#', image: 'https://source.unsplash.com/user/erondu/200x200', left: 0, lastLeft: 0},
        {name: 'Gates Cawdell', location: '137 Duke Court', age: 26, text: 'Story - Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lajsh hhdos ksjdjd.', link: '#', image: 'http://via.placeholder.com/350x200', left: 0, lastLeft: 0},
        {name: 'Candace Chazelas', location: '4 Namekagon Avenue', age: 46, text: 'Story - Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lajsh hhdos ksjdjd.', link: '#', image: 'https://source.unsplash.com/user/erondu/200x200', left: 0, lastLeft: 0},
        {name: 'Arny Gillyatt', location: '31168 Forest Dale Avenue', age: 39, text: 'Story - Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lajsh hhdos ksjdjd.', link: '#', image: 'http://via.placeholder.com/350x200', left: 0, lastLeft: 0},
        {name: 'Averyl McCunn', location: '270 Linden Place', age: 22, text: 'Story - Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim adminim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat lajsh hhdos ksjdjd.', link: '#', image: 'https://source.unsplash.com/user/erondu/200x200', left: 0, lastLeft: 0}],
        heightOfChildren: 0,
        slideHeight: 0,
        slideWidth: 0,
        horizontalMove: 0,
        leftOfLast: '0px',
        leftOfFirst: '0px',
        isAnimating: false
      }
  },
  methods: {
    initializeSlides: function(){
      var slides = document.getElementsByClassName('single-slide');
      this.slideHeight = slides[0].scrollHeight;
      this.slideWidth = slides[0].scrollWidth;
      var that = this;
      this.heightOfChildren = Math.abs(this.slideHeight) + 'px';   
      for(var i = 0; i < slides.length; i++){
        if(i === 0){
          this.items[i].left = -Math.abs(this.slideWidth) + 'px';   
          this.items[i].lastLeft = this.items[i].left;  
        }
        if (i === 1){
          this.items[i].left = '0px';
          this.items[i].lastLeft = '0px';
        }
        if (i > 1){
          this.items[i].left = (Math.abs(this.slideWidth) * (i -1)) + 'px';   
          this.items[i].lastLeft = this.items[i].left;     
        }
      }
    },
    moveToAnother: function(index){
      var setCurrentlyOn = function(){
        for(var i = 0; i < that.items.length; i++){
          if(that.items[i].left === '0px'){
            currentlyOn = that.items[i].originalIndex;
          }
        }         
      };
      // move to last      
      if(index === this.items.length - 1){
        // move first to last
        for(var i = 0; i < this.items.length; i++){
          if(this.items[i].originalIndex === this.items.length - 1){
            this.items[i].left = (parseInt(this.removePxLetters(this.leftOfLast)) + Math.abs(this.slideWidth)) + 'px';
          }
        }
        // add animation class
        this.isAnimating = true;
        // move all items left (items length * items width)
        for(var i = 0; i < this.items.length; i++){
            this.items[i].left = (((parseInt(this.removePxLetters( this.items[i].left)))) - ((parseInt(this.removePxLetters(this.leftOfLast)) + Math.abs(this.slideWidth)))) + 'px';
            this.items[i].lastLeft = this.items[i].left;
        }        
        var that = this;
        setTimeout(function(){
          // remove animation class          
          that.isAnimating = false;
          // move all besides last
          for(var i = 0; i < that.items.length; i++){
            // console.log(that.items[i].left);
            if(that.items[i].originalIndex !== that.items.length - 1){           
              if(that.items[i].originalIndex === that.items.length - 2){
                that.items[i].left = -Math.abs(that.slideWidth) + 'px';
              } else {
                that.items[i].left = (i * Math.abs(that.slideWidth)) + 'px';        
              }              
            }
          }
          for(var i = 0; i < that.items.length; i++){
            that.items[i].lastLeft = that.items[i].left;
          }
        }, 450)
      } else {
        // move to anyone but last       
        var that = this;
        // figure out which one is currenty on 0px
        var currentlyOn = -1;
        var direction = 'false';
        var howManyPixelsToMove = 0;
        this.isAnimating = true;
        // find index of current active slide
        setCurrentlyOn();
        // figure out if need to move items left or right
        if(currentlyOn > index){
          direction = 'right';                
        }
        if(currentlyOn < index){    
          direction = 'left';           
        }
        // find current left of index passed  
        for(var i = 0; i < that.items.length; i++){
          if(that.items[i].originalIndex === index){
            howManyPixelsToMove = Math.abs((parseInt(this.removePxLetters(that.items[i].left))));             
          }
        } 
        // find current index of active slide 
        setCurrentlyOn();              
        if(direction === 'right'){
          // everything between active index and index wanted need to be moved to the left 
          var needToBeMovedLeft = [];
          var amountBetweenTargetAndActive = currentlyOn - index - 1;                 
          for(var i = 0; i < amountBetweenTargetAndActive + 1; i++){
            needToBeMovedLeft.push(index + i)
          }
          // console.log(needToBeMovedLeft);
          // 1. go over values in needToBeMovedLeft and move all original indexes of that that value to the 
          // left of index (the new one that needs to be moved to)  
          var j = 2;
          for(var i = needToBeMovedLeft.length - 1; i > -1; i--){
            that.items[needToBeMovedLeft[i]].left = -Math.abs(this.slideWidth * j) + 'px';
            j++;
          }
          // 2. add animation class
          that.isAnimating = true;
          // 3. slide all items to the left until your desired index reaches 0
          for(var i = 0; i < that.items.length; i++){
              that.items[i].left = (parseInt(this.removePxLetters(that.items[i].left))) + (Math.abs(that.slideWidth) * needToBeMovedLeft.length) + 'px';
              that.items[i].lastLeft = that.items[i].left;
          } 
          setTimeout(function(){
            that.isAnimating = false;            
          }, 450)                                         
        }                       
    
        if(direction === 'left'){   
            for(var i = 0; i < that.items.length; i++){            
              that.items[i].left = ((parseInt(this.removePxLetters(that.items[i].left))) - howManyPixelsToMove) + 'px';
              that.items[i].lastLeft = that.items[i].left;
            }            
        }         
        // make sure only one is behind first
        setTimeout(function(){
          if(direction === 'left'){
          // do something after the render has completed re-rendering.       
          that.isAnimating = false;
          // find index of current active slide
          setCurrentlyOn();
          var originalIndexes = [];
          // get original indexes that need to be changed
          for(var i = 0; i < that.items.length; i++){
            if(that.items[i].left !== '0px' && that.items[i].left !== that.leftOfFirst){
              originalIndexes.push(that.items[i].originalIndex);
            }         
          }           
          // console.log(originalIndexes);      
          // console.log('currently on index ' + currentlyOn);       
          // need to sort array so that first element value is equal to one after 'currentlyOn'
          // and all the ones after.
          var originalIndexesCopy = originalIndexes.slice();
          for(var i = 0; i < originalIndexesCopy.length; i++){         
            if(originalIndexesCopy[i] === currentlyOn + 1 && currentlyOn !== originalIndexesCopy.length){             
              var firstElement = originalIndexes.pop();
              originalIndexes.unshift(firstElement);
              currentlyOn++;
            }
          }
          for(var i = 0; i < originalIndexes.length; i++){
            if(originalIndexes[i] + 1 === that.items.length){
              originalIndexes[i] = 0;
            } else {
              originalIndexes[i] = originalIndexes[i] + 1;
            }
          }
          // console.log(originalIndexes);    
          // then loop over originalIndexes and change left value at item index that equals value      
            var j = 1;
            for(var i = 0; i < originalIndexes.length; i++){
              that.items[originalIndexes[i]].left = (Math.abs(that.slideWidth) * j) + 'px';   
              that.items[originalIndexes[i]].lastLeft = that.items[originalIndexes[i]].left;
              j++;            
            } 
          }       
        }, 450)
      }
    },    
    removePxLetters: function(str){
        if(str.includes('p')){
            return str.split('p')[0]
        } else {
            return str
        }        
    },    
    setLastItemLeft: function(){
      var that = this;
      var leftOfLast = that.items.
      reduce(function(acc, item){         
        if(parseInt(that.removePxLetters(item.lastLeft)) > parseInt(that.removePxLetters(acc.lastLeft))){
          return item;
        } else {            
          return acc;
        }
      }, {lastLeft: '-1000px'}); 
      that.leftOfLast = leftOfLast.lastLeft;
    },  
    setFirstItemLeft: function(){
      var that = this;      
      var leftOfFirst = this.items.
      reduce(function(acc, item){         
        if(parseInt(that.removePxLetters(item.lastLeft)) < parseInt(that.removePxLetters(acc.lastLeft))){
          return item;
        } else {            
          return acc;
        }
      }, {lastLeft: '1000px'}); 
      that.leftOfFirst = leftOfFirst.lastLeft;
    },         
    moveLastToFirst: function(){ 
      var that = this;
      var highestLeft = this.items.
      reduce(function(acc, item, i){       
        if(parseInt(that.removePxLetters(item.lastLeft)) > parseInt(that.removePxLetters(acc.lastLeft))){  
          return item;
        } else {             
          return acc;
        }
      }, {lastLeft: '1000px'});         

      for(var i = 0; i < this.items.length; i++){
        if(this.items[i].left == highestLeft.lastLeft){
          this.items[i].left = this.leftOfFirst;
          this.items[i].lastLeft = this.items[i].left;   
        }
      }
    },
    moveFirstToLast:function(){
        var that = this;
        var lowestLeft = this.items.
        reduce(function(acc, item, i){       
          if(parseInt(that.removePxLetters(item.lastLeft)) < parseInt(that.removePxLetters(acc.lastLeft))){  
            return item;
          } else {             
            return acc;
          }
        }, {lastLeft: '1000px'});             

        for(var i = 0; i < this.items.length; i++){
          if(this.items[i].left == lowestLeft.lastLeft){
            this.items[i].left = this.leftOfLast; 
            this.items[i].lastLeft = this.items[i].left;            
          }
        }
    },
    moveMouse: function(index, e){
      var that = this;
      e = e || window.event;
      that.currentX = e.clientX;
      var MouseClickedAt = e.clientX;
      document.onmouseup = function closeDragElement(e) {
        that.isAnimating = true;
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null; 
        var MouseReleasedAt = e.clientX; 
        var amountOfPixelsDragged = Math.abs(MouseClickedAt - MouseReleasedAt);
        if(amountOfPixelsDragged > 90){
          if(that.MovingRight){     
            // console.log('move all right');         
            for(var i = 0; i < that.items.length; i++){
                that.items[i].left = (parseInt(that.removePxLetters(that.items[i].lastLeft))) + (Math.abs(that.slideWidth)) + 'px';
                that.items[i].lastLeft = that.items[i].left; 
            }          
            // change the values name and left of not seen items
            setTimeout(function(){
              that.isAnimating = false;
              that.moveLastToFirst();
            }, 450)                                
                          
          } else {
           // move all left
           for(var i = 0; i < that.items.length; i++){
              if(i == (that.items.length - 1)) {
                that.items[i].left = (parseInt(that.removePxLetters(that.items[i].lastLeft))) - (Math.abs(that.slideWidth))  + 'px'; 
                that.items[i].lastLeft = that.items[i].left; 
              } else {
                that.items[i].left = (parseInt(that.removePxLetters(that.items[i].lastLeft))) - (Math.abs(that.slideWidth))  + 'px'; 
                that.items[i].lastLeft = that.items[i].left; 
              }                
            }  
            
            setTimeout(function(){
              that.isAnimating = false;
              that.moveFirstToLast();
            }, 450)                     
          }
        } else {         
          for(var i = 0; i < that.items.length; i++){
            that.items[i].left = that.items[i].lastLeft;                     
          }  
        }
        setTimeout(function(){
          that.isAnimating = false;
        }, 450)              
      };
      // call a function whenever the hoveredDiv cursor moves:
      var that = this;
      document.onmousemove =  function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        that.horizontalMove = that.currentX - e.clientX;     
        that.currentX = e.clientX; // y   
        var mySlides = document.getElementsByClassName('single-slide'); 
        for(var i = 0; i < mySlides.length; i++){
          var myDivStats = mySlides[i].getBoundingClientRect(); 
          that.items[i].left = (mySlides[i].offsetLeft - that.horizontalMove) + "px"; 
        }  
        that.$forceUpdate();                               
      };      
    },
    checkIfActive: function(index){   
      if(index === (this.currentIndexWithZero - 1)){
          return true;
      } else {
          if(this.currentIndexWithZero == 0 && index == (this.items.length - 1)){              
              return true;
          } else {
            return false;
          }
      }
    }
  },
  computed: {
     MovingRight: function(){
       return this.horizontalMove < 0
     },
     currentIndexWithZero: function(){
       var index = -1;
       var obj = this.items.map(function(item, currentIndex){
         if(item.left == '0px'){
          index = currentIndex;           
         }
       });
       return index;
     }
  }
})
  