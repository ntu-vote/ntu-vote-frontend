const base_url = 'https://ntu-vote.ntu.im';

//Protected
export const getCampaignList = async() => {
    const endpoint = base_url + "/api/campaign";

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
                return jsonResponse.result.campaigns; //an-array
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
        alert("yyy已達登入時間上限，為確保隱私安全，麻煩您在登入一次喔")
        return "fail";
    }
}