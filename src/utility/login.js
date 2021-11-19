const base_url = "https://ntu-vote.ntu.im";

//protected
export const login = async(username, password) => {
    const endpoint = base_url + "/api/login";
    try{

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                "Content-type": "application/json",
                'Authorization': `bearer ${username}:${password}`
            }
        });
        if (response.ok) {
            const jsonResponse = await response.json();
            if (jsonResponse.status === "Success"){
                localStorage.setItem("token", jsonResponse.params.token);
                localStorage.setItem("username", jsonResponse.params.username);
                localStorage.setItem("uid", jsonResponse.params.uid);
                return "success"; //an-array
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
        alert("登入失敗，請確認網路連線");
        return "fail";
    }
}