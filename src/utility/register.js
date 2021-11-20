import { generateKey } from "./generateKey";

//unprotected
export const register = async(username, password, display_name, real_name, student_id) => {
    const aEmail = student_id + "@ntu.edu.tw";
    const newKeyPair = await generateKey(password, username, aEmail);
    const endpoint = process.env.REACT_APP_PUBLIC_URL + "/api/register";
    const data = JSON.stringify({
        "username": username,                       // string, username
        "password": password,                       // string, password
        "display_name": display_name,               // string, display name
        "real_name": real_name,                     // string, real_name
        "student_id": student_id,                   // string, student id
        "public_key": newKeyPair.publicKeyArmored, // string, public key
        "private_key": newKeyPair.privateKeyArmored  // string, password-signed private key
    });
    const response = await fetch(endpoint, {
        method: "POST",
        body: data,
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
        }
    });
    if (response.ok) {
        const jsonResponse = await response.json();
        if (jsonResponse.status === "Success"){
            return "success";
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

