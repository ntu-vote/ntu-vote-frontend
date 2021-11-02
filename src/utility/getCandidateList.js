const base_url = '';

//Protected
export const getCandidateList = async(cpnId) => {
    const endpoint = base_url + "/api/campaign/" + cpnId;
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