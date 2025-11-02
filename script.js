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

  // validating username

    function validateUsername(userName){
      // check whether username is empty
      if(userName.trim() === ''){
        alert('Username should not be empty');
        return false;
      }

      //regex comparison
      const usernameRegex = /^[a-zA-Z0-9_-]{1,15}$/;
      const isMatching = usernameRegex.test(userName);     
      if(!isMatching){
        alert('Enter Valid Username');
        return false;
      }
      else{
        searchBtn.innerHTML='<button disabled>Searching</button>'
        return true;
      }
    }

// fetching user details using username

async function fetchUserDetails(userName){
  const url = `https://leetcode-stats-api.herokuapp.com/${userName}`;
  
  const response = await fetch(url);
  const data = await response.json();
  console.log(data);
}


//when clicks on search button

  searchBtn.addEventListener('click',function(){
    const userName = input.value;
    validateUsername(userName);
    if(validateUsername(userName)){
      fetchUserDetails(userName);
    }
  })

})
