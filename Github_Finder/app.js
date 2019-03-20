//search users
const searchUser = document.getElementById('searchUser');
//init github object
const github = new Github;
//init ui.js object
const ui = new UI;
searchUser.addEventListener('keyup',(e) =>{
    //get input text
    const inputText = e.target.value;
    if(inputText  !== ''){
        //Make Http call
        github.getGithubUsers(inputText)
        .then(data =>{
            if(data.profileData.message === 'Not found'){
                //UI alert 
            }else{
                //display profile
                ui.displayProfile(data.profileData)

            }
            
        })
    }else{
        //clear prfileData
        ui.clearProfile();
    }
})