const base_url = 'https://ntu-vote.ntu.im';

//Unprotected
export const getVoterKey = async() => {
    console.log("get voter keys...");

    try{
        const endpoint = base_url + "/api/ballot/key";
        const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
                'Authorization': `bearer ${localStorage.getItem("username")}:${localStorage.getItem("token")}`
            }
        });
    
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.status === "Success"){
                return jsonResponse.result; //an-object
            }
            else{
                alert(jsonResponse.message);
                return "fail";
            }
        }
        else{
            alert(response.status + " " + response.statusText);
            return "fail";
        }
    }
    catch(e){
        // alert("get voter keys: " + e.message);
        return "fail";
    }
}