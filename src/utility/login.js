const base_url = '';

//protected
export const login = async(username, password) => {
    const endpoint = base_url + "/login";
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
            localStorage.setItem("token", jsonResponse.token);
            localStorage.setItem("username", jsonResponse.username);
            localStorage.setItem("uid", jsonResponse.user_id);
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