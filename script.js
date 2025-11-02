document.addEventListener("DOMContentLoaded",function(){
  let input = document.querySelector('.text-field');
  let searchBtn = document.querySelector('.search-btn');
  let statsContainer= document.querySelector('.stats-container');
  let easyCircle= document.querySelector('.easy-circle');
  let mediumCircle= document.querySelector('.medium-circle');
  let hardCircle= document.querySelector('.hard-circle');
  let easyLabel= document.querySelector('.easy-label');
  let mediumLabel= document.querySelector('.medium-label');
  let hardLabel= document.querySelector('.hard-label');
  let statCards= document.querySelector('.stats-cards');

  


  searchBtn.addEventListener('click',function(){
    const userName = input.value;
    console.log(userName);
  })
})
