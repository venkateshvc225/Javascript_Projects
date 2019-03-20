class Github{
    constructor(){
        this.client_id = 'ded5e02d494ed8a14201';
        this.secret_key = 'b9bd9ca721482b29f90136ee26c50adb838e8e80s';
    }

    //get users from github API
    async getGithubUsers(username){
        const profileResponse = await fetch(`https://api.github.com/users/${username}?client_id=${this.client_id}&client_secret = ${this.secret_key}`);
        const profileData = await profileResponse.json();

        return{
            profileData
        }


    }

}