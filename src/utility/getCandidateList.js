const base_url = 'https://ntu-vote.ntu.im';

//Protected
export const getCandidateList = async(cpnId) => {
    const endpoint = base_url + "/api/campaign/" + cpnId;
    console.log(endpoint);
    try{
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
        alert("xxx已達登入時間上限，為確保隱私安全，麻煩您在登入一次喔")
        return "fail";
    }
}