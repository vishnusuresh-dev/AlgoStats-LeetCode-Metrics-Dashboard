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
        return true;
      }
    }

// fetching user details using username

    async function fetchUserDetails(userName){
      try{
        searchBtn.innerHTML='<button disabled>Searching</button>';
        //API fetch setup(method 1)

        // const url = `https://leetcode-stats-api.herokuapp.com/${userName}`;

        //Graphql setup(method 2)

        const proxyUrl = 'https://cors-anywhere.herokuapp.com/' // proxy server(to rectify CORS error)
        const url = 'https://leetcode.com/graphql/';
            
        const myHeaders = new Headers();
        myHeaders.append("content-type", "application/json");

        const graphql = JSON.stringify({
        query: "\n    query userSessionProgress($username: String!) {\n  allQuestionsCount {\n    difficulty\n    count\n  }\n  matchedUser(username: $username) {\n    submitStats {\n      acSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n      totalSubmissionNum {\n        difficulty\n        count\n        submissions\n      }\n    }\n  }\n}\n    ",
        variables: { "username": `${userName}` }})



        const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: graphql,
        };


        const response = await fetch(proxyUrl + url, requestOptions);//proxy url should come first when conacatinating
        if(response.ok){
        const parsedData = await response.json();
        console.log(parsedData);
        dataFromParsedData(parsedData);
        }
        else{
          throw new Error("Something Went Wrong")
        }
      }


      catch(Error){
        statCards.innerHTML=`<p style="text-align:center">${Error.message}</p>`;
      }


      finally{
        searchBtn.innerHTML='<button>Search</button>';
      }
    }

//update progress data on UI 

  function updateProgress(solved,total,label,progressBar){
  const degree=(solved/total)*100;
  progressBar.style.setProperty("--progress-degree", `${degree}%`);
  label.textContent = `${solved}/${total}`;
  }


// getting data from parsedData

    function dataFromParsedData(parsedData){
      const totalQuestionsCount = parsedData.data.allQuestionsCount[0].count;
      const totalEasyQuestionsCount = parsedData.data.allQuestionsCount[1].count;
      const totalMediumQuestionsCount = parsedData.data.allQuestionsCount[2].count;
      const totalHardQuestionsCount = parsedData.data.allQuestionsCount[3].count;      

      const solvedTotalQuestion = parsedData.data.matchedUser.submitStats.acSubmissionNum[0].count;     
      const solvedEasyQuestion = parsedData.data.matchedUser.submitStats.acSubmissionNum[1].count;
      const solvedMediumQuestion = parsedData.data.matchedUser.submitStats.acSubmissionNum[2].count;
      const solvedHardQuestion = parsedData.data.matchedUser.submitStats.acSubmissionNum[3].count;

      updateProgress(solvedEasyQuestion,totalEasyQuestionsCount,easyLabel,easyCircle);
      updateProgress(solvedMediumQuestion,totalMediumQuestionsCount,mediumLabel,mediumCircle);
      updateProgress(solvedHardQuestion,totalHardQuestionsCount,hardLabel,hardCircle);

      displayCrads(parsedData,statCards);
    }

//display card section dynamically  

function displayCrads(parsedData,statCards){
  const cardsData = [
    {label:"Overall Submissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[0].submissions},
    {label:"Overall Easy Submissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[1].submissions},
    {label:"Overall Medium Submissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[2].submissions},
    {label:"Overall Hard Submissions",value:parsedData.data.matchedUser.submitStats.totalSubmissionNum[3].submissions}    
  ];
  statCards.innerHTML = cardsData.map(
    data=>{
      return `<div class="cards"> 
               <h4>${data.label}</h4>
               <p class=>${data.value}</p>
               </div>`
    }
  ).join("");
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
